import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ArePartialsEqual, CharacterLimitWarning, IsDevice, SplitCaps } from "../../Helpers";
import { DeviceTableMenu } from "./DeviceTableMenu";
import { useDeviceDashboard } from "../../Hooks";
import { TableSortLabel } from "@mui/material";
import { tableHeaders } from "./Constants";
import { ConfirmAndCancelButtons, DeviceManagerSelectField, DeviceManagerTextField, TableFilter } from "../../Components";
import { DeviceStatus, DeviceType } from "../../Enums";
import { DeviceTableContainer } from "./DeviceTableContainer";
import { useEffect, useState } from "react";
import { IDevice, IDeviceRequest } from "../../Interfaces";
import { MaxLengthForIpAddress } from "../../Interfaces/IDevice";
import { ValidateDeviceDialog } from "./Helpers";
import { useDeviceApi } from "../../Api";

export function DeviceTable() {
  const [selectedDevice, setSelectedDevice] = useState<IDevice | undefined>(undefined);
  const [editingDeviceId, setEditingDeviceId] = useState<number | undefined>(undefined);
  const [updateDeviceRequest, setUpdateDeviceRequest] = useState<Partial<IDeviceRequest>>({});

  const { UpdateDevice } = useDeviceApi();
  const { mutateAsync: updateDevice } = UpdateDevice;

  const handleEdit = ({ deviceId, ...rest }: IDevice) => {
    setEditingDeviceId(deviceId);
    setUpdateDeviceRequest(rest);
  };

  const handleCancelEdit = () => {
    setEditingDeviceId(undefined);
    setUpdateDeviceRequest({});
  };

  const {
    paginatedDevices,
    rowsPerPage,
    page,
    onUpdatePage,
    onUpdateRowsPerPage,
    onUpdateSortSetting,
    onUpdateFilterSetting,
    onClearFilterSetting,
    recordCount,
    sortSetting,
    isLoading,
    filterSettings,
  } = useDeviceDashboard();

  useEffect(() => {
    setEditingDeviceId(undefined);
    setUpdateDeviceRequest({});
    setSelectedDevice(undefined);
  }, [filterSettings, page, rowsPerPage, sortSetting]);

  const { isError, validationMessage } = ValidateDeviceDialog(updateDeviceRequest);

  const handleUpdateDevice = async () => {
    if (isError || !IsDevice(updateDeviceRequest) || !editingDeviceId) return;

    if (ArePartialsEqual({ ...updateDeviceRequest }, { ...selectedDevice })) {
      setEditingDeviceId(undefined);
      setUpdateDeviceRequest({});
      return;
    }

    try {
      await updateDevice({ deviceId: editingDeviceId, deviceRequest: updateDeviceRequest });
      setEditingDeviceId(undefined);
      setUpdateDeviceRequest({});
    } catch (err) {
      //Do nothing, the toast is handled in the API
    }
  };

  const handleClickDeviceRow = (device: IDevice) => {
    if (!editingDeviceId) setSelectedDevice({ ...device });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DeviceTableContainer
      filterSettings={filterSettings}
      onClearFilterSetting={onClearFilterSetting}
      selectedDevice={selectedDevice}
      onCloseDrawer={() => setSelectedDevice(undefined)}
    >
      <TableContainer component={Paper} sx={{ overflowX: "initial" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeaders.map((h) => (
                <TableCell onClick={() => onUpdateSortSetting(h.sourceColumn)} key={h.sourceColumn}>
                  <TableSortLabel active={sortSetting.sortColumn === h.sourceColumn} direction={sortSetting.sortDirection}>
                    {h.columnName}
                  </TableSortLabel>
                  {
                    {
                      deviceId: <></>,
                      name: (
                        <TableFilter
                          variant="searchBar"
                          value={filterSettings.name}
                          onUpdateSearch={(value) => onUpdateFilterSetting("name", value)}
                          label="Filter Name"
                        />
                      ),
                      deviceStatus: (
                        <TableFilter
                          variant="multiSelect"
                          options={Object.values(DeviceStatus)}
                          selectedValues={filterSettings.deviceStatus}
                          onUpdateSelectedValues={(value) => onUpdateFilterSetting("deviceStatus", value)}
                        />
                      ),
                      deviceType: (
                        <TableFilter
                          variant="multiSelect"
                          options={Object.values(DeviceType)}
                          selectedValues={filterSettings.deviceType}
                          onUpdateSelectedValues={(value) => onUpdateFilterSetting("deviceType", value)}
                        />
                      ),
                      deviceTypeDescription: (
                        <TableFilter
                          variant="searchBar"
                          value={filterSettings.deviceTypeDescription}
                          onUpdateSearch={(value) => onUpdateFilterSetting("deviceTypeDescription", value)}
                          label="Filter Type Description"
                        />
                      ),
                      ipAddress: (
                        <TableFilter
                          variant="searchBar"
                          value={filterSettings.ipAddress}
                          onUpdateSearch={(value) => onUpdateFilterSetting("ipAddress", value)}
                          label="Filter IP Address"
                        />
                      ),
                    }[h.sourceColumn]
                  }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDevices.map((device) => (
              <TableRow
                key={device.deviceId}
                onClick={() => handleClickDeviceRow(device)}
                sx={{
                  "&:last-child td": { border: 0 },
                  "& .row-actions": {
                    opacity: 0,
                    transition: "opacity 0.2s",
                  },
                  "&:hover .row-actions": {
                    opacity: 1,
                  },
                }}
              >
                <TableCell>{device.name}</TableCell>
                {device.deviceId === editingDeviceId ? (
                  <>
                    <TableCell>
                      <DeviceManagerTextField
                        label={"IP Address"}
                        value={updateDeviceRequest.ipAddress}
                        validation={{
                          isError: device.ipAddress?.length > MaxLengthForIpAddress,
                          validationMessage: CharacterLimitWarning(updateDeviceRequest.ipAddress, MaxLengthForIpAddress),
                        }}
                        onUpdateValue={(value) => setUpdateDeviceRequest((prev) => ({ ...prev, ipAddress: value }))}
                        isSmall
                        isEditing
                      />
                    </TableCell>
                    <TableCell>
                      <DeviceManagerSelectField
                        options={Object.values(DeviceStatus)}
                        value={updateDeviceRequest.deviceStatus}
                        label="Device Status"
                        onChange={(value) => setUpdateDeviceRequest((prev) => ({ ...prev, deviceStatus: value as DeviceStatus }))}
                        isSmall
                        isEditing
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{device.ipAddress}</TableCell>
                    <TableCell>{device.deviceStatus}</TableCell>
                  </>
                )}
                <TableCell>{SplitCaps(device.deviceType)}</TableCell>
                <TableCell sx={{ position: "relative", height: 60, px: 4 }}>
                  {device.deviceTypeDescription}
                  {!editingDeviceId && <DeviceTableMenu deviceId={device.deviceId} onEdit={() => handleEdit(device)} />}
                  {editingDeviceId === device.deviceId && (
                    <Box
                      sx={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <ConfirmAndCancelButtons
                        isDisabled={isError}
                        validationTooltip={validationMessage}
                        onCancel={handleCancelEdit}
                        onConfirm={handleUpdateDevice}
                      />
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {paginatedDevices.length === 0 && <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 2 }}>No Devices Found</Box>}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={recordCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, pg) => onUpdatePage(pg)}
          onRowsPerPageChange={onUpdateRowsPerPage}
        />
      </TableContainer>
    </DeviceTableContainer>
  );
}
