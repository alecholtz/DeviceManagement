import { Box, Chip, Paper, Stack } from "@mui/material";
import { IDevice, IDeviceFilterSettings } from "../../Interfaces";
import { CreateDeviceButton } from "./CreateDeviceButton";
import { DeviceDrawer } from "./DeviceDrawer";
interface IProps {
  filterSettings: IDeviceFilterSettings;
  onClearFilterSetting: (filterColumn: keyof IDeviceFilterSettings) => void;
  selectedDevice: IDevice | undefined;
  onCloseDrawer: () => void;
  children: React.ReactNode;
}

export function DeviceTableContainer({ filterSettings, onClearFilterSetting, selectedDevice, onCloseDrawer, children }: IProps) {
  const { name, ipAddress, deviceTypeDescription, deviceStatus, deviceType } = filterSettings;

  return (
    <Paper sx={{ width: "100%", padding: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", padding: 0.5, alignItems: "center" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {name && <Chip label={`Device Name = ${name}`} onDelete={() => onClearFilterSetting("name")} />}
          {ipAddress && <Chip label={`IP Address = ${ipAddress}`} onDelete={() => onClearFilterSetting("ipAddress")} />}
          {deviceTypeDescription && (
            <Chip label={`Device Type Description = ${deviceTypeDescription}`} onDelete={() => onClearFilterSetting("deviceTypeDescription")} />
          )}
          {deviceStatus.length > 0 && <Chip label={`Status = ${deviceStatus.join(", ")}`} onDelete={() => onClearFilterSetting("deviceStatus")} />}
          {deviceType.length > 0 && <Chip label={`Device Type = ${deviceType.join(", ")}`} onDelete={() => onClearFilterSetting("deviceType")} />}
        </Stack>
        <CreateDeviceButton />
      </Box>
      {children}
      <DeviceDrawer selectedDevice={selectedDevice} onCloseDrawer={onCloseDrawer} />
    </Paper>
  );
}
