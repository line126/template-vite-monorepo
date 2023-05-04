import { createHash } from 'crypto';
import { winPath } from './fork-umi';
import { ROUTE_IMPORT_NAME } from './constants';

export function generated_components(routes: Record<string, any>) {
  const imports: Record<string, any> = {};

  Object.keys(routes).forEach((key) => {
    // const useSuspense = opts.api.appData.framework === 'react' ? true : false; // opts.api.appData.react.version.startsWith('18.');
    const route = routes[key];
    if (!route.file) {
      // return useSuspense ? `'${key}': React.lazy(() => import( './EmptyRoute')),` : `'${key}': () => import( './EmptyRoute'),`;
      return '';
    }

    const prefix = '/src/pages/';

    const path = route.file?.includes('src/layouts') || route.file.startsWith('@/') ? route.file : `${prefix}${route.file}`;

    // return useSuspense
    //   ? `'${key}': React.lazy(() => import(/* webpackChunkName: "${webpackChunkName}" */'${winPath(path)}')),`
    //   : `'${key}': () => import(/* webpackChunkName: "${webpackChunkName}" */'${winPath(path)}'),`;

    const id_md5 = get_md5(key);
    const importName = ROUTE_IMPORT_NAME.replace('{md5}', id_md5);

    imports[key] = {
      importName,
      path: syncImport(winPath(path), importName),
    };
  });

  return imports;
}

const syncImport = (path: string, importName: string) => `import ${importName} from "${path}"`;

const asyncImport = (path: string, importName: string, dynamicImport?: (path: string) => string) => {
  return `const ${importName} = ${dynamicImport?.(path) || `() => import("${path}")`}`;
};

const dynamicImport = (path: string) => `React.lazy(() => import("${path}"))`;

function get_md5(str: string) {
  const md5 = createHash('md5');
  return md5.update(str).digest('hex');
}
