export interface IRoute {
  path: string;
  absPath: string;
  file: string;
  id: string;
  parentId?: string;
  [key: string]: any;
}

export interface IRoutesById {
  [id: string]: IRoute;
}
