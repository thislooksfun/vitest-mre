# vitest-mre

This is an MRE (minimal reproducible example) of [a bug in vitest](https://github.com/vitest-dev/vitest/issues/1588)'s handling of vite's [`resolve.conditions`](https://vitejs.dev/config/#resolve-conditions).

### The bug

When `vitest` is recursing through the dependencies in `node_modules` it loses track of the `resolve.conditions` setting, meaning that nested imports resolve the wrong file. This can be seen in the tests. The package `some-random-3rd-party-library` is set up with two exports, one for `"browser"` and one for `"node"`. `some-other-library` simple re-exports from `some-random-3rd-party-library`.

The file `imports.test.js` has two imports: `some-random-3rd-party-library` (which has conditional exports) and `some-other-library`, which simply re-exports directly from `some-random-3rd-party-library`. The import from `some-random-3rd-party-library`, the "shallow" export, is resolved correctly to the browser file. However importing from `some-other-library`, the "deep" export, is _not_, and instead resolves to the _node_ file.

I believe this bug is caused by the function `_shouldExternalize()` not checking the package's external exports against the `resolve.conditions` setting, and instead just treating everything in `node_modules` as fine to import via Node's default `import`.
