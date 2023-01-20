
import fs from 'fs';
import path from 'path';
import { loadConfig, IConfigLoaderResult } from '../src';

const useScene = (scene: string) => path.join(__dirname, 'fixtures', scene)

const expectResultToMatchSnapshot = (result: IConfigLoaderResult<unknown>) => {
  if (result.path) {
    expect(path.isAbsolute(result.path)).toBe(true);
    const relativePath = path.relative(__dirname, result.path);
    result.path = path.join('/<AbsTestRoot>', relativePath);
  }
  expect(result).toMatchSnapshot();
}

describe('loadConfig', () => {
  it('js', async () => {
    const config = await loadConfig({
      cwd: useScene('js'),
      configKey: 'foo',
    })
    expectResultToMatchSnapshot(config)
  })

  it('ts', async () => {
    const config = await loadConfig({
      cwd: useScene('ts'),
      configKey: 'foo',
    })
    expectResultToMatchSnapshot(config)
  })

  it('custom config', async () => {
    const config = await loadConfig({
      cwd: useScene('custom'),
      configKey: 'foo',
      configFile: 'foo.config.custom.ts',
    })
    expectResultToMatchSnapshot(config)
  })

  it('custom config with array', async () => {
    const config = await loadConfig({
      cwd: useScene('custom'),
      configKey: 'foo',
      configFile: [
        'bar.config.js',
        'bar.config.ts',
        'foo.config.custom.js',
        'foo.config.custom.ts'
      ],
    })
    expectResultToMatchSnapshot(config)
  })

  it('config suffix', async () => {
    const config = await loadConfig({
      cwd: useScene('config-suffix'),
      configKey: 'foo',
      configSuffix: 'generator',
    })
    expectResultToMatchSnapshot(config)
  })

  it('not-existed', async () => {
    const config = await loadConfig({
      cwd: useScene('not-existed'),
      configKey: 'foo',
      configSuffix: 'generator',
    })
    expectResultToMatchSnapshot(config)
  })

  it('absolute path', async () => {
    const configFileWithAbsPath =  path.join(useScene('speedy'), 'speedy.config.ts')
    const config = await loadConfig({
      cwd: useScene('speedy'),
      configKey: 'speedy',
      configFile: configFileWithAbsPath,
    })
    expectResultToMatchSnapshot(config)
  })

  it('preserveTemporaryFile', async () => {
    const tempFile = path.join(useScene('speedy'), 'speedy.config.bundled.cjs')
    const config = await loadConfig({
      cwd: useScene('speedy'),
      configKey: 'speedy',
      preserveTemporaryFile: true,
    })
    expect(fs.existsSync(tempFile)).toBe(true);
  })

  it('tsconfig target environment was set to `es5`', async () => {
    const config = await loadConfig({
      cwd: useScene('target-es5'),
      configKey: 'foo',
    })
    expectResultToMatchSnapshot(config)
  })  
  
  it('import file', async () => {
    const config = await loadConfig({
      cwd: useScene('import-file'),
      configKey: 'foo',
      preserveTemporaryFile: true
    })
    expectResultToMatchSnapshot(config)
  })
})
