import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
    input: 'src/index.ts',
    output: [
      { file: "dist/bundle.cjs.js", format: "cjs", sourcemap: true },
      { file: "dist/bundle.esm.js", format: "esm", sourcemap: true }
    ],
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs({
            sourceMap: true,
        }),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist',
            exclude: ['**/*.test.ts', '**/*.test.tsx'],
        }),
    ],
    external: [],
    onwarn(warning, warn) {
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        if (warning.code === 'EVAL') return;
        warn(warning);
    },
});
