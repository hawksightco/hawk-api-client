# Hawksight SDK

Still under development. Early release.

## How to publish package to NPM

For `hawk-api`, simply cd to `hawk-api` folder and run

```
yarn publish --access public
```

Sample output:

```
gabriel@Gabriels-Macbook ~/f/p/g/h/hawk-api (main)> yarn publish --access public
yarn publish v1.22.19
[1/4] Bumping version...
info Current version: 1.1.11
question New version:
[2/4] Logging in...
[3/4] Publishing...
$ npm run build

> @hawksightco/hawk-sdk@1.1.11 build
> tsc --outDir dist/

info Two factor authentication enabled.
question npm one-time password: 049533
success Published.
[4/4] Revoking token...
info Not revoking login token, specified via config file.
✨  Done in 20.13s.
Everything up-to-date
gabriel@Gabriels-Macbook ~/f/p/g/h/hawk-api (main)>
```
