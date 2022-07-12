import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            }
        ],
        plugins: [
            peerDepsExternal(),
            del({ targets: 'dist/*' }),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss({ modules: true }),
            terser(),
        ]
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'esm',
        },
        plugins: [
            dts(),
        ],
        external: [/\.css$/],
    },
    {
        input: 'src/index.css',
        output: {
            file: 'dist/styles/main.min.css',
            format: 'esm',
        },
        plugins: [
            postcss({ extract: true, plugins: [postcssImport()], minimize: true }),
        ]
    }
];