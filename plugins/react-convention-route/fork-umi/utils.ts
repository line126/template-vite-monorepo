import { extname } from 'path';
import { existsSync } from 'fs';

export function createRouteId(file: string) {
  return winPath(stripFileExtension(file));
}

function stripFileExtension(file: string) {
  return file.replace(/\.[a-z0-9]+$/i, '');
}

export function byLongestFirst(a: string, b: string): number {
  return b.length - a.length;
}

export function findParentRouteId(routeIds: string[], childRouteId: string): string | undefined {
  return routeIds.find((id) => childRouteId.startsWith(`${id}/`));
}

const routeModuleExts = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx', '.vue'];
export function isRouteModuleFile(opts: { file: string; exclude?: RegExp[] }) {
  // TODO: add cache strategy
  for (const excludeRegExp of opts.exclude || []) {
    if (opts.file && excludeRegExp instanceof RegExp && excludeRegExp.test(opts.file)) {
      return false;
    }
  }
  return routeModuleExts.includes(extname(opts.file));
}

export function tryPaths(paths: string[]) {
  for (const path of paths) {
    if (existsSync(path)) return path;
  }
}

export function winPath(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  if (isExtendedLengthPath) {
    return path;
  }
  return path.replace(/\\/g, '/');
}
