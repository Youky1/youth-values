interface RouteConfigItem {
  path: string;
  element: JSX.Element;
  children?: RouteConfig;
  index?: true;
}
export type RouteConfig = Array<RouteConfigItem>;
