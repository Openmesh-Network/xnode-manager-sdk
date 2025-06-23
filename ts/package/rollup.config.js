import dts from "rollup-plugin-dts";

export default [
  {
    input: "build/index.js",
    output: {
      file: "dist/index.js",
    },
    external: ["axios"],
  },
  {
    input: "build/index.d.ts",
    output: {
      file: "dist/index.d.ts",
    },
    external: ["axios"],
    plugins: [dts()],
  },
  {
    input: "build/index.js",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    external: ["axios"],
  },
];
