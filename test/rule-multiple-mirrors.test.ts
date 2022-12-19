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
            forEach: { dir: "asdf", ext: ".txt", recursive: false },
            require: { dir: path.join("test", "src"), ext: ".ts" },
        },
        {
            forEach: { dir: path.join("asdf", "sub"), ext: ".txt", recursive: false },
            require: { dir: path.join("test", "src", "sub"), ext: ".ts" },
        },
    ],
};

tester.run("directory-mirror > multiple-mirrors", rule, {
    valid: [
        {
            name: "File in root folder has corresponding source file",
            options: [testMirrorsSrc],
            filename: path.join("asdf", "file.txt"),
            code: "",
        },
        {
            name: "File in sub folder has corresponding source file",
            options: [testMirrorsSrc],
            filename: path.join("asdf", "sub", "file_sub.txt"),
            code: "",
        },
    ],
    invalid: [
        {
            name: "File in root folder has no corresponding source file",
            options: [testMirrorsSrc],
            filename: path.join("asdf", "missing.txt"),
            code: "",
            errors: [
                {
                    message: `required '${path.join("test", "src", "missing.ts")}' mirrored file does not exists`,
                },
            ],
        },
    ],
});
