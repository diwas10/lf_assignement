import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Method } from 'axios';
import { ApiDetailType, Primitive } from './api-request/api-enums';
import initApiRequest, { RequestParam } from './api-request/api-request';
import TokenService from '../services/token.service';
import { toast } from 'react-toastify';
import { requestTimeout } from '../utility/timeout/timeout';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory({ window });

/**
 * Request details for XML HTTP request
 */

export interface ResponseData<TData = any> {
  messageSource: any;
  status: boolean;
  message: string;
  data: TData;
  errors: string | string[];
}

function sanitizeController(
  apiDetail: ApiDetailType,
  pathVariables?: { [key: string]: Primitive }
) {
  return pathVariables && Object.keys(pathVariables).length
    ? {
        ...apiDetail,
        controllerName: Object.entries(pathVariables).reduce(
          (acc, [key, value]) => (acc = acc.replace(`{${key}}`, value?.toString())),
          apiDetail.controllerName
        )
      }
    : apiDetail;
}

export interface APIRequestDetail {
  /**Request data for the API */
  requestData?: any;
  /** REST API Method
   *
   * This will override requestMethod provided by apiDetails
   */
  requestMethod?: Method;
  /**Path variables present in controller
   *
   * Provided pathVariables -> {id: 1, type: 'test'}
   * Converts controller-url/{id}/{type} -> controller-url/1/test
   */
  pathVariables?: { [key: string]: Primitive };
  /**Request params
   *
   * Provided params -> {id: 1, type: 'test'}
   * Converts controller-url -> controller-url?id=1&type=test
   */
  params?: RequestParam;
  /**Axios cancel token source */
  cancelSource?: CancelTokenSource;
  /**Disable Success Toast */
  disableSuccessToast?: boolean;
  /**Disable Failure Toast */
  disableFailureToast?: boolean;
}

export interface CustomResponse<TData = unknown> extends AxiosResponse {
  message: string;
  data: TData | null;
  // data: TData | undefined;
  status: number;
  noconnection: boolean;
  config: AxiosRequestConfig;
  isAxiosError: boolean;
}

export type APIResponseDetail<TData = unknown> = Promise<CustomResponse<TData>>;

let timeoutLanguageCount = 0;
let noServerConnectionLanguageCount = 0;
let noConnectionLanguageCount = 0;
let sessionExpiredLanguageCount = 0;
const axiosCancelSource = Axios.CancelToken.source();

/**
 * Manages API call and updates reducer with success or failure
 * @param apiDetails redux action and api config
 * @param apiRequestDetails request details for XMLHTTP request
 */
export default async function performApiAction<TData = unknown>(
  apiDetails: ApiDetailType,
  apiRequestDetails: APIRequestDetail = {}
): Promise<TData> {
  const {
    requestData,
    requestMethod,
    pathVariables,
    params,
    cancelSource,
    disableSuccessToast = false
    // disableFailureToast
  } = apiRequestDetails;

  // Check for path variables in controllername
  const sanitizedApiDetails = sanitizeController(apiDetails, pathVariables);

  let responseData: any;
  try {
    responseData = await initApiRequest<TData>(
      sanitizedApiDetails,
      requestData,
      params,
      cancelSource || axiosCancelSource
    );

    // Success Dispatch
    if ((responseData as ResponseError).data && !(responseData as ResponseError).isAxiosError) {
      !disableSuccessToast &&
        ![requestMethod, sanitizedApiDetails.requestMethod].includes('GET') &&
        toast.success(responseData?.message);
    }
  } catch (customThrownError) {
    responseData = customThrownError;
    let errorResponseData: { [key: string]: any } = {};
    if (responseData instanceof Object) errorResponseData = { ...responseData };

    // If Token Expired
    if (
      (responseData as ResponseError).isAxiosError &&
      (responseData as ResponseError).data?.error === 'invalid_token'
    ) {
      if (TokenService.getAccessToken()) {
        TokenService.clearToken();
        window.location.href = '/login';
        if (!sessionExpiredLanguageCount) {
          toast.error('Your session has expired.');
          sessionExpiredLanguageCount++;
          requestTimeout(() => {
            sessionExpiredLanguageCount--;
          }, 500);
        }
      }
    }

    // Refresh Token Expired
    if ((responseData as ResponseError).logout) {
      TokenService.clearToken();
    }

    if (errorResponseData.status === 413) {
      toast.error('कृपया १२ MB भन्दा कम साइजको फाइलहरु अपलोड गर्नुहोला ।');
    }

    // Axios Timeout
    if (responseData.config?.code === 'ECONNABORTED') {
      if (!timeoutLanguageCount) {
        toast.dismiss();
        timeoutLanguageCount++;
        toast.error('Server is taking too long to respond, please try again in sometime!');
      }
    }

    if ((responseData as ResponseError).data && (responseData as ResponseError).isAxiosError) {
      if (responseData.data?.message) {
        ![requestMethod, sanitizedApiDetails.requestMethod].includes('GET') &&
          toast.error(responseData?.message);
      } else if (errorResponseData?.message) {
        ![requestMethod, sanitizedApiDetails.requestMethod].includes('GET') &&
          toast.error(
            'Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!'
          );
      }
    }

    // No Server connection
    if (
      (responseData as ResponseError).isAxiosError &&
      (responseData as ResponseError).noconnection &&
      (responseData as ResponseError).message === 'Server could not be reached'
    ) {
      if (!noServerConnectionLanguageCount) {
        toast.dismiss();
        noServerConnectionLanguageCount++;
        toast.error(
          'Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!'
        );
        requestTimeout(() => {
          noServerConnectionLanguageCount--;
        }, 500);
      }
    }
    // No Connection
    else if (
      (responseData as ResponseError).isAxiosError &&
      (responseData as ResponseError).noconnection &&
      (responseData.config as any)?.code !== 'ECONNABORTED'
    ) {
      if (!noConnectionLanguageCount) {
        toast.dismiss();
        noConnectionLanguageCount++;
        toast.error(
          'Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!'
        );
        requestTimeout(() => {
          noConnectionLanguageCount--;
        }, 500);
      }
    }

    throw new Error(errorResponseData?.message);
  }

  return responseData as TData;
}
