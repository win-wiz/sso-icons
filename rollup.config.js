import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    })
  ],
  external: ['react', 'react-dom', 'simple-icons', 'react/jsx-runtime']
}; 