export interface GraphQlError {
  message: string;
  [index: string]: unknown;
}

export type RouteType = {
  id: string | null;
  attributes: {
    heading: string | null;
    pathName: string | null;
    componentName: string | null;
  } | null;
};

export type MenuType = {
  id: string;
  heading: string;
};
