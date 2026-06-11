import { IDeviceRequest } from "../Interfaces";
import { DeviceRequestKeys } from "../Interfaces/IDeviceRequest";

export function IsDevice(device: Partial<IDeviceRequest>): device is IDeviceRequest {
  return DeviceRequestKeys.every((key) => key in device && device[key] !== undefined);
}
