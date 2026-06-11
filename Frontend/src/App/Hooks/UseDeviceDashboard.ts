import { useState } from "react";
import { IDashboardState, IDevice, IDeviceFilterSettings } from "../Interfaces";
import { DefaultDeviceDashboardState } from "./Constants";
import { SortRecords } from "../Helpers";
import { SortDirection } from "../Enums";
import { useDeviceApi } from "../Api";

//FUTURE IMPROVEMENTS: add search params and caching
export const useDeviceDashboard = () => {
  const [deviceDashboardState, setDeviceDashboardState] = useState<IDashboardState<IDevice, IDeviceFilterSettings>>(DefaultDeviceDashboardState);

  const { GetDevices } = useDeviceApi();
  const { data: devices = [], isLoading } = GetDevices;

  const { filterSettings, sortSetting, page, rowsPerPage } = deviceDashboardState;

  //FUTURE IMPROVEMENTS: some of these would be better handled by the backend/database
  const filteredDevices = [
    ...devices.filter((d) => {
      const { name, ipAddress, deviceTypeDescription, deviceStatus, deviceType } = filterSettings;
      if (name && !d.name.includes(name)) return false;
      if (ipAddress && !d.ipAddress.includes(ipAddress)) return false;
      if (deviceTypeDescription && !d.deviceTypeDescription?.includes(deviceTypeDescription)) return false;
      if (deviceStatus.length && !deviceStatus.includes(d.deviceStatus)) return false;
      if (deviceType.length && !deviceType.includes(d.deviceType)) return false;

      return true;
    }),
  ];

  const sortedDevices = SortRecords(filteredDevices, sortSetting);
  const paginatedDevices = sortedDevices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return {
    paginatedDevices,
    rowsPerPage,
    page,
    sortSetting,
    filterSettings,
    recordCount: filteredDevices.length,
    onUpdatePage: (page: number) => setDeviceDashboardState((prev) => ({ ...prev, page })),
    onUpdateRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) =>
      setDeviceDashboardState((prev) => ({ ...prev, rowsPerPage: parseInt(event.target.value, 10), page: 0 })),
    onUpdateSortSetting: (sortColumn: keyof IDevice) =>
      setDeviceDashboardState((prev) => ({
        ...prev,
        sortSetting: {
          sortColumn,
          sortDirection: prev.sortSetting.sortDirection === SortDirection.ascending ? SortDirection.descending : SortDirection.ascending,
        },
        page: 0,
      })),
    onUpdateFilterSetting: (filterColumn: keyof IDeviceFilterSettings, filterValue: IDeviceFilterSettings[keyof IDeviceFilterSettings]) =>
      setDeviceDashboardState((prev) => ({ ...prev, filterSettings: { ...prev.filterSettings, [filterColumn]: filterValue }, page: 0 })),
    onClearFilterSetting: (filterColumn: keyof IDeviceFilterSettings) =>
      setDeviceDashboardState((prev) => ({
        ...prev,
        filterSettings: { ...prev.filterSettings, [filterColumn]: Array.isArray(prev.filterSettings[filterColumn]) ? [] : undefined },
        page: 0,
      })),
    isLoading,
  };
};
