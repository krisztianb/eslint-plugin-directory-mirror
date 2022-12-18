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

    /** Object describing there the required mirrored file should be located. */
    require: DirectoryAndExtension;
};

/**
 * The rule's options.
 */
export class Options {
    public mirrors: DirectoryMirror[];

    public constructor(input: InputOptions) {
        this.mirrors = input.mirrors ?? [];
    }
}
