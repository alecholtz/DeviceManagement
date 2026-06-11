import { DeviceStatus, DeviceType } from "../Enums";

export interface IDeviceFilterSettings {
  name: string | undefined;
  ipAddress: string | undefined;
  deviceType: DeviceType[];
  deviceStatus: DeviceStatus[];
  deviceTypeDescription: string | undefined;
}
