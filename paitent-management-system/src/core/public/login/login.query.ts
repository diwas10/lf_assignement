import { useMutation } from 'react-query';
import { loginInitialValues, LoginResponse } from './login.schema';
import { RequestMethod } from '../../../helper/api-request/api-enums';
import performApiAction from '../../../helper/performApiAction';
import TokenService from '../../../services/token.service';
import { useNavigate } from 'react-router-dom';
import { privateRoutePaths } from '../../../routes';
import { useAuth } from '../../../providers/AuthProvider';

const apiDetails = {
  login: {
    actionName: 'LOGIN',
    controllerName: '/v1/login',
    requestMethod: RequestMethod.POST
  },
  register: {
    actionName: 'REGISTER',
    controllerName: '/v1/signup',
    requestMethod: RequestMethod.POST
  }
};

export const useLoginQuery = (page: 'login' | 'signup') => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const apiDetail = page === 'login' ? apiDetails.login : apiDetails.register;

  return useMutation(
    async (requestData: typeof loginInitialValues) => {
      return await performApiAction<BackendResponse<LoginResponse>>(apiDetail, {
        requestData,
        disableSuccessToast: true
      });
    },
    {
      mutationKey: apiDetail.actionName,
      onSuccess(response) {
        if (response.success) {
          setIsAuthenticated(true);
          setUser(response.data?.user!);
          TokenService.setToken(response.data!);
          navigate(privateRoutePaths.dashboard);
        }
      }
    }
  );
};
