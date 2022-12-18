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
            require: { dir: "test" + path.sep + "src", ext: ".ts" },
        },
        {
            forEach: { dir: "asdf" + path.sep + "sub", ext: ".txt", recursive: false },
            require: { dir: "test" + path.sep + "src" + path.sep + "sub", ext: ".ts" },
        },
    ],
};

tester.run("directory-mirror > multiple-mirrors", rule, {
    valid: [
        {
            name: "File in root folder has corresponding source file",
            options: [testMirrorsSrc],
            filename: "asdf" + path.sep + "file.txt",
            code: "",
        },
        {
            name: "File in sub folder has corresponding source file",
            options: [testMirrorsSrc],
            filename: "asdf" + path.sep + "sub" + path.sep + "file_sub.txt",
            code: "",
        },
    ],
    invalid: [
        {
            name: "File in root folder has no corresponding source file",
            options: [testMirrorsSrc],
            filename: "asdf" + path.sep + "missing.txt",
            code: "",
            errors: [
                {
                    message:
                        "required 'test" + path.sep + "src" + path.sep + "missing.ts' mirrored file does not exists",
                },
            ],
        },
    ],
});
