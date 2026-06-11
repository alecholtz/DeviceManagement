import { IDevice } from "../../Interfaces";

export const tableHeaders: { sourceColumn: keyof IDevice; columnName: string }[] = [
  { sourceColumn: "name", columnName: "Name" },
  { sourceColumn: "ipAddress", columnName: "IP Address" },
  { sourceColumn: "deviceStatus", columnName: "Status" },
  { sourceColumn: "deviceType", columnName: "Device Type" },
  { sourceColumn: "deviceTypeDescription", columnName: "Device Type Description" },
];
