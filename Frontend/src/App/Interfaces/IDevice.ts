import { DeviceStatus, DeviceType } from "../Enums";

export const MaxLengthForDeviceName = 255;
export const MaxLengthForIpAddress = 15;
export const MaxLengthForDeviceDescription = 50;

export interface IDevice {
  deviceId: number;
  name: string;
  ipAddress: string;
  deviceType: DeviceType;
  deviceStatus: DeviceStatus;
  deviceTypeDescription?: string;
}
