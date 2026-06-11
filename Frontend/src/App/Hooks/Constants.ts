import { SortDirection } from "../Enums";
import { IDashboardState, IDevice, IDeviceFilterSettings } from "../Interfaces";

const defaultDeviceFilterState: IDeviceFilterSettings = {
  name: undefined,
  ipAddress: undefined,
  deviceType: [],
  deviceStatus: [],
  deviceTypeDescription: undefined,
};

export const DefaultDeviceDashboardState: IDashboardState<IDevice, IDeviceFilterSettings> = {
  filterSettings: defaultDeviceFilterState,
  sortSetting: {
    sortColumn: "name",
    sortDirection: SortDirection.ascending,
  },
  page: 0,
  rowsPerPage: 10,
};
