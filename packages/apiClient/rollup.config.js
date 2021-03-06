import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';

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
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            resolve(),
            commonjs(),
            json(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
        ],
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
    },
];
