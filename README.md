# eslint-plugin-directory-mirror

[![NPM Version](https://badge.fury.io/js/eslint-plugin-directory-mirror.svg)](https://badge.fury.io/js/eslint-plugin-directory-mirror)

An ESLint rule for mirroring directory structures.

Use cases:

-   Ensure that every unit test file has a corresponding source file
-   Ensure that every source file has a corresponding unit test file
-   etc.

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

This rule has one configuration option which you can use to specify the directories that should be mirrored.
Let's use an example to understand the option:

```js
{
  rules: {
    "directory-mirror/directory-mirror": [
      "error",
      {
        "mirrors": [
          { forEach: { dir: "test", ext: ".test.ts", recursive: true }, require: { dir: "src", ext: ".ts" } },
          { forEach: { dir: "src", ext: ".ts", recursive: true }, require: { dir: "test", ext: ".test.ts" } },
        ],
      },
    ],
  },
}
```

The option has a `mirrors` array with objects describing the mirrored directories.

Read the object like this: `forEach` of these files require in the directory `dir` a file with the extension `ext`
and the same name (without extension and including sub directory).

For the example above this means:

-   For every test file with the extension `.test.ts` in the `test` folder there has to be a corresponding
    source file with the extension `.ts` in the `src` folder.
-   And for every source file with the extension `.ts` in the `src` folder there has to be a corresponding
    test file with the extension `.test.ts` in the `test` folder.
