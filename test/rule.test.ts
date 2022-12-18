import { RuleTester } from "eslint";
import { InputOptions } from "../src/options";
import { rule } from "../src/rule";

const tester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
});

const testMirrorsSrc: InputOptions = {
    mirrors: [{ forEach: "test/**/*.test.ts", require: { dir: "src", ext: ".ts" } }],
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
            errors: [{ message: "required 'src/missing-src.test.ts' mirrored file does not exists" }],
        },
    ],
});
