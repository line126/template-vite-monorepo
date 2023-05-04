interface IRoute {
  path: string;
  absPath: string;
  file: string;
  id: string;
  parentId?: string;
  [key: string]: any;
}

declare module '~convention-routes' {
  import type { RouteObject } from 'react-router-dom';
  const convention_routes: RouteObject[];
  const umi_routes: Record<string, IRoute>;
  export { routes, convention_routes, umi_routes };
}

declare module 'virtual:convention-routes' {
  import type { RouteObject } from 'react-router-dom';
  const convention_routes: RouteObject[];
  const umi_routes: Record<string, IRoute>;
  export { routes, convention_routes, umi_routes };
}
