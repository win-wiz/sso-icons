import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default [
  // 主包构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist'
      })
    ],
    external: ['react', 'react-dom', 'simple-icons']
  },
  // React组件构建
  {
    input: 'src/react/SSOIcon.tsx',
    output: [
      {
        file: 'dist/react/SSOIcon.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/react/SSOIcon.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist/react'
      })
    ],
    external: ['react', 'react-dom', 'simple-icons']
  },
  // 类型声明文件
  {
    input: 'dist/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm'
    },
    plugins: [dts()]
  },
  {
    input: 'dist/react/SSOIcon.d.ts',
    output: {
      file: 'dist/react/SSOIcon.d.ts',
      format: 'esm'
    },
    plugins: [dts()]
  }
]; 