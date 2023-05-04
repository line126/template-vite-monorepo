import { generated_components } from './generated-components';
import { generated_layout } from './generated-layout';
import type { IRoutesById } from './fork-umi';

export function react_convention_route() {
  const VIRTUAL_MODULE_IDS = ['~convention-routes', 'virtual:convention-routes'];
  const RESOLVED_VIRTUAL_MODULE_ID_PREFIX = '/@vite-plugin-convention-routes/generated-react-route';

  return {
    name: 'vite-plugin-convention-routes', // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (VIRTUAL_MODULE_IDS.includes(id)) {
        return `${RESOLVED_VIRTUAL_MODULE_ID_PREFIX}?id=${id}`;
      }
    },
    load(id) {
      const { module_id_prefix, virtual_module_id } = parse_load_id(id);
      if (module_id_prefix === RESOLVED_VIRTUAL_MODULE_ID_PREFIX && virtual_module_id && VIRTUAL_MODULE_IDS.includes(virtual_module_id))
        return route_stringify();
    },
  };
}

function parse_load_id(id: string) {
  const [module_id_prefix, rawQuery] = id.split('?', 2);
  const query = new URLSearchParams(rawQuery);
  const virtual_module_id = query.get('id');

  return {
    module_id_prefix,
    query,
    virtual_module_id,
  };
}

function route_stringify() {
  const layout_routes = generated_layout();

  const route_components = generated_components(layout_routes);

  const import_routes_string = Object.keys(route_components)
    .map((id) => route_components[id]?.path)
    .join('\n');

  const routes_string = JSON.stringify(
    generated_routes_by_id({
      routesById: layout_routes,
      routeComponents: route_components,
    })
  ).replace(componentRE, componentReplacer);

  return `import React from "react";

${import_routes_string}

const convention_routes = ${routes_string}

const umi_routes = ${JSON.stringify(layout_routes)}

export { convention_routes, umi_routes }`;
}

interface GeneratedReactRoutesById {
  routesById: IRoutesById;
  parentId?: string;
  routeComponents: Record<string, { importName: string; path: string }>;
}

function generated_routes_by_id({ routesById, parentId, routeComponents }: GeneratedReactRoutesById) {
  return Object.keys(routesById)
    .filter((id) => routesById[id].parentId === parentId)
    .map((id) => {
      const route = {
        id: routesById[id].id,
        path: routesById[id].path,
        element: `React.createElement(${routeComponents[id].importName})`,
      };

      const children = generated_routes_by_id({
        routesById,
        parentId: route.id,
        routeComponents,
      });

      if (children.length > 0) {
        route['children'] = children;
      }

      return route;
    });
}

const componentRE = /"(?:component|element)":("(.*?)")/g;

function componentReplacer(str: string, replaceStr: string, path: string) {
  return str.replace(replaceStr, path);
}
