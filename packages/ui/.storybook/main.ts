import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {
            strictMode: true,
        },
    },
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-themes",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y"
    ],
    staticDirs: [getAbsolutePath('@orbitkit/assets')],
    docs: {
        autodocs: "tag",
    },
};
export default config;
// import reactConfig from '@orbitkit/storybook/configs/react-vite';

// export default reactConfig;
