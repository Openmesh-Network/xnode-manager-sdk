import dts from "rollup-plugin-dts";

export default [
  {
    input: "build/index.js",
    output: {
      file: "dist/index.js",
    },
    external: ["@openmesh-network/xnode-manager-sdk", "@tanstack/react-query", "react"]
  },
  {
    input: "build/index.d.ts",
    output: {
      file: "dist/index.d.ts",
    },
    external: ["@openmesh-network/xnode-manager-sdk", "@tanstack/react-query", "react"],
    plugins: [dts()],
  },
  {
    input: "build/index.js",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    external: ["@openmesh-network/xnode-manager-sdk", "@tanstack/react-query", "react"],
  },
];
