import Axios, {
  AxiosBasicCredentials,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic
} from 'axios';
import { ApiDetailType, RequestBodyType } from './api-enums';
import TokenService from '../../services/token.service';

export interface RequestParam {
  [key: string]: any;
}

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

export default function initApiRequest<TData = any>(
  apiDetails: ApiDetailType,
  requestData?: any,
  params?: RequestParam,
  cancelSource?: CancelTokenSource
) {
  const headers = getRequestHeaders(apiDetails);
  const transformedRequestData = transformRequestData(apiDetails, requestData);
  let axiosReqParams: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    url: apiDetails.controllerName,
    method: apiDetails.requestMethod,
    responseType: 'json',
    timeout: 60 * 3 * 1000,
    cancelToken: cancelSource ? cancelSource.token : source.token,
    headers: headers,
    ...transformedRequestData,
    ...(params && { params })
  };

  return Axios.request<TData>(axiosReqParams)
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      return manageErrorResponse(error);
    });
}

Axios.interceptors.response.use(function (response) {
  return response;
});

const getRequestHeaders = (apiDetails: ApiDetailType) => {
  let headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TokenService.getAccessToken()}`
  };

  switch (apiDetails.requestBodyType) {
    case 'QUERY-STRING':
      headers = {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      break;
    case 'FORM-DATA':
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data'
      };
      break;
    case 'NO-AUTH':
      delete headers['Authorization'];
      break;
    default:
      headers = { ...headers };
  }

  return headers;
};

interface TransformedRequestData {
  auth?: AxiosBasicCredentials;
  data: any;
}

const transformRequestData = (apiDetails: ApiDetailType, requestData: any) => {
  let transformedRequestData: TransformedRequestData = { data: requestData };

  switch (apiDetails.requestBodyType) {
    case RequestBodyType.FORMDATA:
      transformedRequestData.data = getFormData(requestData);
      break;
    default:
      transformedRequestData.data = requestData;
      break;
  }
  return transformedRequestData;
};

const manageErrorResponse = (error: AxiosError) => {
  const { message, config, code, request, response, isAxiosError } = error;

  let errorResponse = {
    message: message, // Something happened in setting up the request that triggered an Error
    data: null,
    status: response?.status || false,
    noconnection: false,
    config: config, // Request Params Configs
    isAxiosError: isAxiosError //If Axios Error
  };

  if (response) {
    errorResponse.data = {
      ...(response.data as any),
      status: response ? response?.status >= 200 && response?.status < 400 : false
    }; // The server responded with a status code and data
  } else if (request) {
    errorResponse.message = 'Server could not be reached.'; // No response was received
    errorResponse.noconnection = true;
  }

  return errorResponse;
};

function getFormData(requestData: { [key: string]: any }) {
  const formData = new FormData();
  for (const data in requestData) {
    if (requestData[data] instanceof Array) {
      requestData[data].forEach((dataEl: any, index: number) => {
        if (dataEl instanceof Object && !(dataEl instanceof File)) {
          Object.keys(dataEl).forEach((elKey) =>
            formData.append(`${data}[${index}].${elKey}`, dataEl[elKey])
          );
        } else if (dataEl instanceof File) {
          // formData.append(data, dataEl);
          formData.append(`${data}[${index}]`, dataEl);
        } else if (typeof dataEl === 'number' || typeof dataEl === 'string') {
          formData.append(`${data}[${index}]`, dataEl.toString());
        }
      });
    } else if (
      requestData[data] instanceof Object &&
      !(requestData[data] instanceof File) &&
      !(requestData[data] instanceof Blob)
    ) {
      Object.entries(requestData[data]).forEach(([key, value]: [string, any]) =>
        formData.append(`${data}.${key}`, value)
      );
    } else {
      formData.append(data, requestData[data]);
    }
  }

  return formData;
}
