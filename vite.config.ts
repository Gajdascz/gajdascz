import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

const ROOT = import.meta.dirname;
const BUILD = path.resolve(ROOT, 'build');
const SRC = path.resolve(ROOT, 'src');
const CACHE = path.resolve(ROOT, '.dev/.cache/vite');
export default defineConfig({
  root: SRC,
  appType: 'spa',
  plugins: [react(), tsConfigPaths(), svgr()],
  build: { outDir: BUILD, emptyOutDir: true },
  base: '/Gajdascz/',
  cacheDir: CACHE,
  envDir: ROOT,

  resolve: { alias: { shared: path.resolve(SRC, '_shared') } },
  test: {
    typecheck: { enabled: true, tsconfig: `${ROOT}/tsconfig.test.json` },
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text'],
      ignoreEmptyLines: true,
      reportsDirectory: `${ROOT}/.dev/.cache/vitest/.coverage`,

      exclude: [
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/docs/**',
        '**/dev/**',
        '**/node_modules/**',
        '**/__tests__/**',
        '**/[.]**',
        '**/*.d.ts',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
        '**/{vitest,build,eslint,prettier}.config.*',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        '**/.cache/**',
        '**/coverage/**',
        '**/.github/**',
        '**/index.*',
        '**/README.*',
        '**/LICENSE*',
        '**/CHANGELOG*',
        '**/CONTRIBUTING*',
        '**/templates/**',
        '**/bin/**',
        '**/examples/**',
        '**/types.ts',
        '**/types/**'
      ]
    }
  }
});
