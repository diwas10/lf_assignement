export type Primitive = string | boolean | number;

export enum RequestMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK'
}

export enum RequestBodyType {
  /**If request id in application/x-www-form-urlencoded as string*/
  QUERYSTRING = 'QUERY-STRING',
  /**If request is in formdata*/
  FORMDATA = 'FORM-DATA',
  /**If request requires Bearer*/
  AUTH = 'AUTH',
  /**If request is open*/
  NOAUTH = 'NO-AUTH',
  FILE = 'FILE'
}

export interface ApiDetailType {
  actionName: string;
  controllerName: string;
  requestMethod?: RequestMethod;
  requestBodyType?: RequestBodyType;
}

export interface ApiRequestDetail {
  requestData?: any;
  pathVariables?: { [key: string]: Primitive };
  params?: { [key: string]: Primitive };
}

export function sanitizeController(
  apiDetail: ApiDetailType,
  pathVariables?: { [key: string]: Primitive }
) {
  return pathVariables && Object.keys(pathVariables).length
    ? {
        ...apiDetail,
        controllerName: Object.entries(pathVariables).reduce(
          (acc, [key, value]) => (acc = acc.replace(`{${key}}`, value.toString())),
          apiDetail.controllerName
        )
      }
    : apiDetail;
}
