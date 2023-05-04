import { join } from 'path';
import { getConventionRoutes, tryPaths, winPath } from './fork-umi';
import { abs_src_path, convention_routes_path_base } from './constants';
import type { IRoute } from './fork-umi';

export function generated_layout() {
  const convention_routes = getConventionRoutes({
    base: convention_routes_path_base,
  });

  // layout routes
  const absLayoutPath = tryPaths([join(abs_src_path, 'layouts/index.tsx'), join(abs_src_path, 'layouts/index.jsx'), join(abs_src_path, 'layouts/index.js')]);

  absLayoutPath &&
    addParentRoute({
      addToAll: true,
      target: {
        id: '@@/global-layout',
        path: '/',
        file: '/' + winPath(absLayoutPath),
        parentId: undefined,
        absPath: '/',
        isLayout: true,
      },
      routes: convention_routes,
    });

  return convention_routes;
}

function addParentRoute(opts: { id?: string; addToAll?: boolean; target: IRoute; routes: Record<string, IRoute>; test?: Function }) {
  if (opts.addToAll) {
    for (const id of Object.keys(opts.routes)) {
      if (opts.routes[id].parentId === undefined && (!opts.test || opts.test(opts.routes[id]))) {
        opts.routes[id].parentId = opts.target.id;
      }
    }
  } else if (opts.id) {
    if (!opts.test || opts.test(opts.routes[opts.id])) {
      opts.routes[opts.id].parentId = opts.target.id;
    }
  } else {
    throw new Error(`addParentRoute failed, opts.addToAll or opts.id must be supplied.`);
  }

  // add new route
  opts.routes[opts.target.id] = opts.target;
}
