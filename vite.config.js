import {resolve} from "path"
import {defineConfig} from "vite"
import legacy from "@rollup/plugin-legacy"
import dts from "vite-plugin-dts"

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "linux-browser-shell",
            fileName: "linux-browser-shell",
        },
        assetsInlineLimit: 0,
    },
    plugins: [
        legacy({
            "./v86/libv86.js": "V86Starter",
        }),
        dts({
            insertTypesEntry: true,
        }),
    ],
})
