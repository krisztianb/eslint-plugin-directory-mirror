import { rule } from "./rule";

module.exports = {
    rules: { "directory-mirror": rule },
    configs: {
        recommended: {
            plugins: ["directory-mirror"],
        },
    },
};
