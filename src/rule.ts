import { Rule } from "eslint";
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
            Program: () => checkMirrors(context, options),
        };
    },
};

/**
 * Checks if the current file matches any mirrors and if so whether the mirror is satisfied or not.
 * @param context The context of the rule.
 * @param options The rule options.
 */
function checkMirrors(context: Rule.RuleContext, options: Options): void {
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

/**
 * Gets the mirror that the given filename matches.
 * @param filename The filename for which to find the mirror.
 * @param mirrors All the mirrors passed to the rule.
 * @returns The mirror that the filename matches or undefined if no mirror matches the filename.
 */
function getMatchingMirror(filename: string, mirrors: DirectoryMirror[]): DirectoryMirror | undefined {
    return mirrors.filter(
        (m) =>
            filename.endsWith(m.forEach.ext) &&
            (m.forEach.recursive
                ? path.dirname(filename).startsWith(m.forEach.dir)
                : path.dirname(filename) === m.forEach.dir),
    )[0];
}

/**
 * Gets the required file path for the given filename using the given mirror.
 * @param filename The filename for which to get the required file path.
 * @param mirror The mirror that is used to compute the required file path.
 * @returns The file path for the given filename using the given mirror.
 */
function getRequiredFilePath(filename: string, mirror: DirectoryMirror): string {
    const subPath = path.dirname(filename).substring(mirror.forEach.dir.length);
    const filenameWithoutExt = path.basename(filename).slice(0, -mirror.forEach.ext.length);

    return (
        mirror.require.dir + path.sep + (subPath ? subPath + path.sep : "") + filenameWithoutExt + mirror.require.ext
    );
}
