/**
 * Module dependencies
 */
import * as fs from 'fs';
import * as path from 'path';
import { bundleRequire, Options } from './bundle-require';

export interface IConfigLoaderOptions {
  cwd: string;
  stopDir?: string;
  configKey: string;
  configFile?: string | string[];
  configSuffix?: string;
  esbuildOptions?: Options['esbuildOptions'];
  preserveTemporaryFile?: boolean;
}

export interface IConfigLoaderResult<T> {
  path?: string;
  data: T;
}

export async function loadConfig<T = Record<string, unknown>>(
  opts: IConfigLoaderOptions
): Promise<IConfigLoaderResult<T>> {
  const {
    cwd = process.cwd(),
    configKey,
    configFile,
    configSuffix = 'config',
    esbuildOptions = {},
  } = opts;

  const files = Array.isArray(configFile)
    ? configFile
    : typeof configFile === 'string'
    ? [configFile]
    : [
        `${configKey}.${configSuffix}.ts`,
        `${configKey}.${configSuffix}.js`,
        `.${configKey}rc.ts`,
        `.${configKey}rc.js`,
      ];

  for (const file of files) {
    const filepath = path.resolve(cwd, file);
    if (fs.existsSync(filepath)) {
      const m = await bundleRequire({
        filepath,
        preserveTemporaryFile: opts.preserveTemporaryFile,
        esbuildOptions: {
          bundle: false,
          ...esbuildOptions,
          target: 'node12',
        },
      });
      const data = m.default || m;
      return {
        path: filepath,
        data,
      };
    }
  }

  return {
    path: undefined,
    data: {} as T,
  };
}
