import { useMutation, useQueryClient } from 'react-query';
import performApiAction from '../../helper/performApiAction';
import { RequestMethod } from '../../helper/api-request/api-enums';

const patientApiDetail = {
  actionName: 'LOGOUT',
  controllerName: '/v1/auth/logout',
  requestMethod: RequestMethod.DELETE
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      return await performApiAction<BackendResponse<any>>(patientApiDetail);
    },
    {
      mutationKey: patientApiDetail.actionName,
      onSuccess() {
        queryClient.clear();
        queryClient.cancelQueries();
      }
    }
  );
};
