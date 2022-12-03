/// <reference types="vite/client" />
/// <reference types="react" />

type RouteRedirectProps = ({ from: string; to: string } | null)[];
type PropsWithChildren<P> = P & { children?: ReactNode };

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;

  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

interface BackendResponse<TData = any> {
  data: TData;
  message: string;
  status: number;
  success: boolean;
}

interface ResponseError {
  message: string;
  data: any;
  status: boolean;
  response?: AxiosResponse;
  config?: AxiosRequestConfig;
  noconnection?: boolean;
  isAxiosError?: boolean;
  logout?: boolean;
}
