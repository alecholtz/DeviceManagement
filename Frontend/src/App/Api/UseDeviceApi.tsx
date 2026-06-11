import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHttp } from "../Hooks";
import { IDevice, IDeviceRequest } from "../Interfaces";

export const useDeviceApi = () => {
  const queryClient = useQueryClient();

  const { Get, Delete, Put, Post } = useHttp("api/Device");

  const GetDevices = useQuery({
    queryKey: ["devices"],
    queryFn: async () => Get<IDevice[]>(),
  });

  const DeleteDevice = useMutation({
    mutationKey: ["devices"],
    mutationFn: async (deviceId: number) => Delete(deviceId),
    onSuccess: (_, deviceId: number) => {
      queryClient.setQueryData(["devices"], (oldData: IDevice[]) => [...oldData.filter((d) => d.deviceId !== deviceId)]);
    },
  });

  const UpdateDevice = useMutation({
    mutationKey: ["devices"],
    mutationFn: async (request: { deviceId: number; deviceRequest: IDeviceRequest }): Promise<void> => Put(request.deviceId, request.deviceRequest),
    onSuccess: (_, { deviceId, deviceRequest }) => {
      queryClient.setQueryData(["devices"], (oldData: IDevice[]) =>
        oldData.map((device) => (device.deviceId === deviceId ? { ...deviceRequest, deviceId } : device)),
      );
    },
  });

  const CreateDevice = useMutation({
    mutationKey: ["devices"],
    mutationFn: async (deviceRequest: IDeviceRequest): Promise<number> => Post(null, deviceRequest),
    onSuccess: (deviceId, deviceRequest) => {
      queryClient.setQueryData(["devices"], (oldData: IDevice[]) => [...oldData, { ...deviceRequest, deviceId }]);
    },
  });

  return { GetDevices, DeleteDevice, UpdateDevice, CreateDevice };
};
