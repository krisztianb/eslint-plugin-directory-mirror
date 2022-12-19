import * as path from "path";

//================================================
// Input
//================================================

/**
 * Type for the rule options.
 */
export type InputOptions = {
    mirrors?: DirectoryMirror[];
};

/**
 * The definition for the rule options array.
 */
export type InputOptionsArray = [] | [InputOptions];

//================================================
// Options
//================================================

/**
 * Type for a directory and a file extension for it.
 */
export type DirectoryAndExtension = {
    /** The directory. */
    dir: string;

    /** The file extension, ie: ".ts". */
    ext: string;
};

/**
 * Type describing a directory mirroring.
 */
export type DirectoryMirror = {
    /** Pattern for files that are checked. */
    forEach: DirectoryAndExtension & { recursive: boolean };

    /** Object describing where the required mirrored file should be located. */
    require: DirectoryAndExtension;
};

/**
 * The rule's options.
 */
export class Options {
    public mirrors: DirectoryMirror[];

    public constructor(input: InputOptions) {
        this.mirrors = input.mirrors ? deepCopy(input.mirrors) : [];

        this.mirrors.forEach((m) => {
            m.forEach.dir = trimPathSep(toOsPath(m.forEach.dir));
            m.require.dir = trimPathSep(toOsPath(m.require.dir));
        });
    }
}

/**
 * Makes sure that the given path string uses the OS specific path separator.
 * @param str The string that should be altered.
 * @returns The new string with only OS specific path separators.
 */
function toOsPath(str: string): string {
    return str.replace(/\\/g, path.sep).replace(/\//g, path.sep);
}

/**
 * Removes the OS specific path separator from the end of the given string.
 * @param str The string that should be altered.
 * @returns The new string without a trailing OS specific path separator.
 */
function trimPathSep(str: string): string {
    return str.endsWith(path.sep) ? str.slice(0, -path.sep.length) : str;
}

/**
 * Creates a deep copy of the given object.
 * @param obj The object that should be copied.
 * @returns The deep copy of the object.
 */
function deepCopy<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
