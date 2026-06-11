import { DeviceType } from "../../Enums";
import { IDeviceRequest, IValidationResult } from "../../Interfaces";
import { MaxLengthForDeviceDescription, MaxLengthForDeviceName, MaxLengthForIpAddress } from "../../Interfaces/IDevice";

export const ValidateDeviceDialog = (device: Partial<IDeviceRequest>): IValidationResult => {
  //Existence Checks
  if (!device["name"]) return { isError: true, validationMessage: "Device Name is required." };
  if (!device["ipAddress"]) return { isError: true, validationMessage: "IP Address is required." };
  if (!device["deviceType"]) return { isError: true, validationMessage: "Device Type is required." };
  if (!device["deviceStatus"]) return { isError: true, validationMessage: "Device Status is required." };

  //Required Length Checks
  if (device.name.length > MaxLengthForDeviceName)
    return { isError: true, validationMessage: `Device Name must be less than ${MaxLengthForDeviceName} characters.` };
  if (device.ipAddress.length > MaxLengthForIpAddress)
    return { isError: true, validationMessage: `Device Name must be less than ${MaxLengthForIpAddress} characters.` };

  //Business Logic Checks
  if (device.deviceType === DeviceType.Other && !device["deviceTypeDescription"])
    return { isError: true, validationMessage: "A Device Type Description is required for devices with type Other" };
  if (device.deviceType !== DeviceType.Other && device["deviceTypeDescription"])
    return { isError: true, validationMessage: "A Device Type Description is not permitted for devices that are not type Other." };

  //Optional Length Checks
  if (device.deviceTypeDescription && device.deviceTypeDescription.length > MaxLengthForDeviceDescription)
    return { isError: true, validationMessage: `Device Name must be less than ${MaxLengthForDeviceDescription} characters.` };

  return { isError: false };
};
