import { RuleTester } from "eslint";
import * as path from "path";
import { InputOptions } from "../src/options";
import { rule } from "../src/rule";

const tester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
});

const testMirrorsSrc: InputOptions = {
    mirrors: [
        {
            forEach: { dir: "test/with/slashes/", ext: ".txt", recursive: true },
            require: { dir: "required/", ext: ".txt" },
        },
        {
            forEach: { dir: "test/with/slashes-no-trailing", ext: ".txt", recursive: true },
            require: { dir: "required", ext: ".txt" },
        },
        {
            forEach: { dir: "test\\with\\backslashes\\", ext: ".txt", recursive: true },
            require: { dir: "required\\", ext: ".txt" },
        },
        {
            forEach: { dir: "test\\with\\backslashes-no-trailing", ext: ".txt", recursive: true },
            require: { dir: "required", ext: ".txt" },
        },
    ],
};

tester.run("directory-mirror > path separator", rule, {
    valid: [
        {
            name: "File in folder whose name starts with a mirrored folder but does not match it",
            options: [testMirrorsSrc],
            filename: path.join("test", "with", "slashes-not-matched", "file.txt"),
            code: "",
        },
    ],
    invalid: [
        {
            name: "Test slashes in option's directory property with trailing slash",
            options: [testMirrorsSrc],
            filename: path.join("test", "with", "slashes", "test.txt"),
            code: "",
            errors: [
                {
                    message: `required '${path.join("required", "test.txt")}' mirrored file does not exists`,
                },
            ],
        },
        {
            name: "Test slashes in option's directory property without trailing slash",
            options: [testMirrorsSrc],
            filename: path.join("test", "with", "slashes-no-trailing", "test.txt"),
            code: "",
            errors: [
                {
                    message: `required '${path.join("required", "test.txt")}' mirrored file does not exists`,
                },
            ],
        },
        {
            name: "Test backslashes in option's directory property with trailing backslash",
            options: [testMirrorsSrc],
            filename: path.join("test", "with", "backslashes", "test.txt"),
            code: "",
            errors: [
                {
                    message: `required '${path.join("required", "test.txt")}' mirrored file does not exists`,
                },
            ],
        },
        {
            name: "Test backslashes in option's directory property without trailing backslash",
            options: [testMirrorsSrc],
            filename: path.join("test", "with", "backslashes-no-trailing", "test.txt"),
            code: "",
            errors: [
                {
                    message: `required '${path.join("required", "test.txt")}' mirrored file does not exists`,
                },
            ],
        },
    ],
});
