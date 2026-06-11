import { DeviceStatus, DeviceType } from "../Enums";

export interface IDeviceRequest {
  name: string;
  ipAddress: string;
  deviceType: DeviceType;
  deviceStatus: DeviceStatus;
  deviceTypeDescription?: string;
}

export const DeviceRequestKeys: (keyof IDeviceRequest)[] = ["name", "ipAddress", "deviceType", "deviceStatus"];
