# eslint-plugin-directory-mirror

[![NPM Version](https://badge.fury.io/js/eslint-plugin-directory-mirror.svg)](https://badge.fury.io/js/eslint-plugin-directory-mirror)

An ESLint rule for mirroring directory structures.

## Installation

Execute the following command within your project's root directory:

```sh
npm i --save-dev eslint-plugin-directory-mirror
```

## ESLint Configuration

Add `directory-mirror` to the `plugins` section of your `.eslintrc` file:

```js
{
  plugins: ["directory-mirror"],
}
```

## Plugin Configuration

There is only one rule within this plugin also named `directory-mirror`.

This rule has one configuration option which you can use to specify that directories that should be mirrored.
It's the easiest to explain the option by looking an example:

```js
{
  rules: {
    "directory-mirror/directory-mirror": [
      "error",
      {
        "mirrors": [
          { forEach: "test/**/*.test.ts", require: { dir: "src", ext: ".ts" } },
          { forEach: "src/**/*.ts", require: { dir: "test", ext: ".test.ts" } },
        ],
      },
    ],
  },
}
```

The option has a `mirrors` array with objects describing the mirrored directories.
Read the object like this: `forEach` of these files require in the directory `dir` a file with the extension `ext`
and the same name.

For the example above this means:

-   For every test file in the `test` folder there has to be a corresponding source file in the `src` folder.
-   And for every source file in the `src` folder there has to be a corresponding test file in the `test` folder.
