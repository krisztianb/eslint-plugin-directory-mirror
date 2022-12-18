import { Rule } from "eslint";
import { Program } from "estree";
import * as fs from "fs";
import * as path from "path";
import { DirectoryMirror, Options } from "./options";

/**
 * Gets the schema defining the rule's input options.
 * @returns The schema defining the rule's input options.
 */
function getSchema(): object {
    const schema = require("../input.json");
    delete schema["$schema"];
    return schema;
}

/**
 * The "directory-mirror" rule.
 */
export const rule: Rule.RuleModule = {
    meta: {
        type: "layout",
        schema: getSchema(),
    },

    create(context) {
        const options = new Options(context.options[0] ?? {});

        return {
            Program: (node) => checkMirrors(context, node, options),
        };
    },
};

function checkMirrors(context: Rule.RuleContext, program: Program, options: Options): void {
    const filename = context.getFilename();
    const mirror = getMatchingMirror(filename, options.mirrors);

    if (mirror) {
        const requiredFile = getRequiredFilePath(filename, mirror);

        if (!fs.existsSync(context.getCwd() + path.sep + requiredFile)) {
            context.report({
                loc: { line: 1, column: 1 },
                message: "required '" + requiredFile + "' mirrored file does not exists",
            });
        }
    }
}

function getMatchingMirror(filename: string, mirrors: DirectoryMirror[]): DirectoryMirror | undefined {
    return mirrors.filter(
        (m) =>
            filename.endsWith(m.forEach.ext) &&
            (m.forEach.recursive
                ? path.dirname(filename).startsWith(m.forEach.dir)
                : path.dirname(filename) === m.forEach.dir),
    )[0];
}

function getRequiredFilePath(filename: string, mirror: DirectoryMirror): string {
    const subPath = path.dirname(filename).substring(mirror.forEach.dir.length);
    const filenameWithoutExt = path.basename(filename).slice(0, -mirror.forEach.ext.length);

    return (
        mirror.require.dir + path.sep + (subPath ? subPath + path.sep : "") + filenameWithoutExt + mirror.require.ext
    );
}
