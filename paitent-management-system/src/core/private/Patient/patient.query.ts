import { useMutation, useQuery, useQueryClient } from 'react-query';
import performApiAction from '../../../helper/performApiAction';
import { RequestBodyType, RequestMethod } from '../../../helper/api-request/api-enums';
import { PatientData, PatientResponse } from './patient.schema';

export const patientApiDetails = {
  getAll: {
    actionName: 'GET_ALL_PATIENT',
    controllerName: '/patient',
    requestMethod: RequestMethod.GET
  },
  add: {
    actionName: 'ADD_PATIENT',
    controllerName: '/patient',
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.FORMDATA
  },
  edit: {
    actionName: 'EDIT_PATIENT',
    controllerName: '/patient/{id}',
    requestMethod: RequestMethod.PUT,
    requestBodyType: RequestBodyType.FORMDATA
  },
  delete: {
    actionName: 'DELETE_PATIENT',
    controllerName: '/patient/{id}',
    requestMethod: RequestMethod.DELETE
  }
};

export const useAddPatient = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (requestData: PatientData) => {
      return await performApiAction<BackendResponse<any>>(patientApiDetails.add, {
        requestData
      });
    },
    {
      mutationKey: patientApiDetails.add.actionName,
      onSuccess() {
        queryClient.invalidateQueries(patientApiDetails.getAll.actionName);
      }
    }
  );
};

export const useEditPatient = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (requestData: PatientData) => {
      return await performApiAction<BackendResponse<any>>(patientApiDetails.edit, {
        requestData,
        pathVariables: { id }
      });
    },
    {
      mutationKey: patientApiDetails.edit.actionName,
      onSuccess() {
        queryClient.invalidateQueries(patientApiDetails.getAll.actionName);
      }
    }
  );
};

export const useDeletePatient = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      return await performApiAction<BackendResponse<any>>(patientApiDetails.delete, {
        pathVariables: { id }
      });
    },
    {
      mutationKey: patientApiDetails.delete.actionName,
      onSuccess() {
        queryClient.invalidateQueries(patientApiDetails.getAll.actionName);
      }
    }
  );
};

export const useGetPatientList = () => {
  return useQuery([patientApiDetails.getAll.actionName], async () => {
    return (await performApiAction<BackendResponse<PatientResponse[]>>(patientApiDetails.getAll))
      ?.data;
  });
};
