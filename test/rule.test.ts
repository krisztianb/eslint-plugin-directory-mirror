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
    mirrors: [{ forEach: { dir: "test", ext: ".test.ts", recursive: true }, require: { dir: "src", ext: ".ts" } }],
};

tester.run("directory-mirror", rule, {
    valid: [
        {
            name: "Test file in root folder has source file",
            options: [testMirrorsSrc],
            filename: "test/options.test.ts",
            code: "",
        },
    ],
    invalid: [
        {
            name: "Test file in root folder has no source file",
            options: [testMirrorsSrc],
            filename: "test/missing-src.test.ts",
            code: "",
            errors: [
                {
                    message: "required 'src" + path.sep + "missing-src.ts' mirrored file does not exists",
                },
            ],
        },
    ],
});
