<h1 align="center">load-config-ts</h1>

<p align="center">
    An out-of-box config loader with TypeScript support.
</p>

<p align="center">
    <a href="https://npmjs.com/package/load-config-ts"><img src="https://img.shields.io/npm/v/load-config-ts.svg?style=flat" alt="NPM version"></a> 
    <a href="https://npmjs.com/package/load-config-ts"><img src="https://img.shields.io/npm/dm/load-config-ts.svg?style=flat" alt="NPM downloads"></a> 
    <a href="https://circleci.com/gh/saojs/load-config-ts"><img src="https://img.shields.io/circleci/project/saojs/load-config-ts/master.svg?style=flat" alt="Build Status"></a> 
</p>

## Install

```bash
npm i load-config-ts -S
```

## Usage

```js
import { loadConfig } from 'load-config-ts';
// This load try to load at process.cwd():
//   - speedy.config.js
//   - speedy.config.ts
//   - speedyrc.js
//   - speedyrc.ts
const config = loadConfig({
  configKey: 'speedy',
});
```

Custom config path:

```js
// This will load `speedy.config.test.js` directly:
const config = loadConfig({
  cwd: useScene('config-suffix'),
  configKey: 'speedy',
  configFile: 'speedy.config.test.js',
});
```

## Credits

`load-config-ts` wouldn't exist without the inspirations from following projects:

- [esbuild](https://github.com/evanw/esbuild)
- [bundle-require](https://github.com/egoist/bundle-require)

## License

MIT &copy; [ULIVZ](https://github.com/sponsors/ulivz)