type RequiredKeys<T> = T extends object
  ? { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]
  : never;
type HasRequiredKeys<T> = [T] extends [never]
  ? false
  : RequiredKeys<T> extends never
    ? false
    : true;

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export type IsAny<T> = IfAny<T, true, never>;

export type SystemPaths =
  | 'content-types'
  | 'components'
  | 'plugins'
  | 'content-types'
  | 'files'
  | 'locales'
  | 'permissions'
  | 'roles';

export type StaticParameters = {
  query?: any;
  header?: any;
  path?: any;
  cookie?: any;
};

export type IsUndefinedOrNever<T> = T extends never ? true : T extends undefined ? true : false;

export type PathHasHandler<
  Paths,
  Path extends keyof Paths,
  Handler extends SystemPathHandlers,
> = Handler extends keyof Paths[Path]
  ? IsUndefinedOrNever<Paths[Path][Handler]> extends true
    ? false
    : true
  : false;

export type GetAllHandlersNames<Paths, Handler extends SystemPathHandlers> = {
  [K in keyof Paths & string]: PathHasHandler<Paths, K, Handler> extends false ? never : K;
}[keyof Paths & string];

export type IsPathContentType<Paths extends any, Path extends keyof Paths> = Path extends string
  ? PathHasHandler<Paths, Path, 'get'> extends true
    ? PathHasHandler<Paths, Path, 'post'> extends true
      ? `${Path}/{id}` extends keyof Paths
        ? PathHasHandler<Paths, `${Path}/{id}`, 'get'> extends true
          ? PathHasHandler<Paths, `${Path}/{id}`, 'put'> extends true
            ? PathHasHandler<Paths, `${Path}/{id}`, 'delete'> extends true
              ? true
              : false
            : false
          : false
        : false
      : false
    : false
  : false;

export type GetAllContentTypeNames<Paths> = {
  [K in keyof Paths & string]: K extends `/${infer Name}`
    ? IsPathContentType<Paths, K> extends true
      ? Name
      : never
    : never;
}[keyof Paths & string];

export type GetPaths<Paths> = {
  [Path in keyof Paths & string]: Path extends string ? Path : never;
}[keyof Paths & string];

export type AssignIfNotNever<T, U, S> = [T] extends [never] ? U : S;

export type ContentTypeNames<Paths> = AssignIfNotNever<
  Paths,
  string,
  GetAllContentTypeNames<Paths>
>;

export type GetRouteHandler<
  Paths,
  Path extends GetPaths<Paths>,
  Method extends SystemPathHandlers,
> = Method extends keyof Paths[Path]
  ? PathHasHandler<Paths, Path, Method> extends true
    ? Paths[Path][Method]
    : never
  : never;

export type IfIsKeyOf<Target, Key extends string> = Key extends keyof Target ? Target[Key] : never;

export type SystemPathHandlers =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

export type StrapiRequestInitVariableParameters<
  Paths,
  Path extends GetPaths<Paths>,
  Method extends SystemPathHandlers,
> = [GetRouteHandler<Paths, Path, Method>] extends [never]
  ? BodyInit | null
  : IfIsKeyOf<GetRouteHandler<Paths, Path, Method>, 'parameters'>;

export type StrapiRequestInitVariable<
  Paths,
  Path extends GetPaths<Paths>,
  Method extends SystemPathHandlers,
> = [GetRouteHandler<Paths, Path, Method>] extends [never]
  ? {
      /** A BodyInit object or null to set request's body. */
      body?: BodyInit | null;
      method?: Method;
      parameters?: StrapiRequestInitVariableParameters<Paths, Path, Method>;
    }
  : {
      /** A BodyInit object or null to set request's body. */
      body?: AssignIfNotNever<
        ExtractBodyContentType<IfIsKeyOf<GetRouteHandler<Paths, Path, Method>, 'requestBody'>>,
        BodyInit | null,
        ExtractBodyContentType<IfIsKeyOf<GetRouteHandler<Paths, Path, Method>, 'requestBody'>>
      >;
      method?: Method;
    } & (HasRequiredKeys<IfIsKeyOf<GetRouteHandler<Paths, Path, Method>, 'parameters'>> extends true
      ? { parameters: StrapiRequestInitVariableParameters<Paths, Path, Method> }
      : { parameters?: StrapiRequestInitVariableParameters<Paths, Path, Method> });

export interface StrapiRequestInitRest {
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache;
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials;
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /** A boolean to set request's keepalive. */
  keepalive?: boolean;
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  mode?: RequestMode;
  priority?: RequestPriority;
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: RequestRedirect;
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  referrer?: string;
  /** A referrer policy to set request's referrerPolicy. */
  referrerPolicy?: ReferrerPolicy;
  /** An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  /** Can only be null. Used to disassociate request from any Window. */
  window?: null;
}

export type ExtractBodyContentType<Body> = Body extends { content: infer Content }
  ? ExtractContentType<Content>
  : never;

export type ExtractContentType<Content> = Content extends { 'application/json': infer Json }
  ? Json
  : never;

export type IfPathHasHandler<
  Paths,
  Path extends GetPaths<Paths>,
  Handler extends SystemPathHandlers,
  True,
  False,
> = PathHasHandler<Paths, Path, Handler> extends true ? True : False;

export type StrapiRequestInitMethod<
  Paths,
  Path extends GetPaths<Paths>,
  Handler extends SystemPathHandlers,
> = IfPathHasHandler<
  Paths,
  Path,
  Handler,
  StrapiRequestInitVariable<Paths, Path, Handler> & StrapiRequestInitRest,
  never
>;

export type StrapiRequestInit<Paths, Path extends GetPaths<Paths>> =
  | StrapiRequestInitMethod<Paths, Path, 'delete'>
  | StrapiRequestInitMethod<Paths, Path, 'get'>
  | StrapiRequestInitMethod<Paths, Path, 'head'>
  | StrapiRequestInitMethod<Paths, Path, 'options'>
  | StrapiRequestInitMethod<Paths, Path, 'patch'>
  | StrapiRequestInitMethod<Paths, Path, 'post'>
  | StrapiRequestInitMethod<Paths, Path, 'put'>
  | StrapiRequestInitMethod<Paths, Path, 'trace'>;

export type StrapiRequestInitPathGate<Paths, Path extends GetPaths<Paths>> = AssignIfNotNever<
  Paths,
  any,
  StrapiRequestInit<Paths, Path>
>;

/*
parameters: {
          query?: {
              fields?: ("test" | "createdAt" | "updatedAt" | "publishedAt")[];
              populate?: "*" | "others" | "others"[];
              filters?: {
                  [key: string]: unknown;
              };
              sort?: ("test" | "createdAt" | "updatedAt" | "publishedAt") | ("test" | "createdAt" | "updatedAt" | "publishedAt")[] | {
                  [key: string]: "asc" | "desc";
              } | {
                  [key: string]: "asc" | "desc";
              }[];
              status?: "draft" | "published";
              hasPublishedVersion?: boolean | ("true" | "false");
          };
          header?: never;
          path: {
              id: string;
          };
          cookie?: never;
      };
*/
