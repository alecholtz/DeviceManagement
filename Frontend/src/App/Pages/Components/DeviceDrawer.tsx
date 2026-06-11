import { startTransition, useState } from "react";
import { IDevice, IDeviceRequest } from "../../Interfaces";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { ConfirmAndCancelButtons, DeviceManagerSelectField, DeviceManagerTextField } from "../../Components";
import { ArePartialsEqual, CharacterLimitWarning, IsDevice } from "../../Helpers";
import { MaxLengthForDeviceDescription, MaxLengthForDeviceName, MaxLengthForIpAddress } from "../../Interfaces/IDevice";
import { DeviceStatus, DeviceType } from "../../Enums";
import { ValidateDeviceDialog } from "./Helpers";
import { useDeviceApi } from "../../Api";

interface IProps {
  selectedDevice: IDevice | undefined;
  onCloseDrawer: () => void;
}

export function DeviceDrawer({ selectedDevice, onCloseDrawer }: IProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deviceRequest, setDeviceRequest] = useState<Partial<IDeviceRequest>>({});

  const { UpdateDevice } = useDeviceApi();
  const { mutateAsync: updateDevice } = UpdateDevice;

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDeviceRequest({});
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDeviceRequest({ ...selectedDevice });
  };

  const handleCloseDrawer = () => {
    onCloseDrawer();
    startTransition(() => {
      setDeviceRequest({});
      setIsEditing(false);
    });
  };

  const { isError, validationMessage } = ValidateDeviceDialog(deviceRequest);

  const handleUpdateDevice = async () => {
    if (isError || !IsDevice(deviceRequest) || !selectedDevice) return;

    if (ArePartialsEqual({ ...deviceRequest }, { ...selectedDevice })) {
      handleCloseDrawer();
      return;
    }

    try {
      await updateDevice({ deviceId: selectedDevice.deviceId, deviceRequest });
      handleCloseDrawer();
    } catch (err) {
      //Do nothing, the toast is handled in the API
    }
  };

  const deviceToDisplay = isEditing ? deviceRequest : selectedDevice;

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={!!selectedDevice}
      onClose={handleCloseDrawer}
      ModalProps={{
        keepMounted: true,
        hideBackdrop: true,
      }}
      sx={{
        pointerEvents: "none",
        "& .MuiDrawer-paper": {
          pointerEvents: "auto",
          boxSizing: "border-box",
          width: "25vw",
          p: 3,
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ padding: 0.5 }}>
        <Typography variant="h5" sx={{ paddingBottom: 1 }}>
          Device Detals:
        </Typography>
        <DeviceManagerTextField
          label={"Device Name"}
          value={deviceToDisplay?.name}
          validation={{
            isError: !!deviceToDisplay?.name && deviceToDisplay?.name?.length > MaxLengthForDeviceName,
            validationMessage: CharacterLimitWarning(deviceToDisplay?.name, MaxLengthForDeviceName),
          }}
          onUpdateValue={(value) => setDeviceRequest((prev) => ({ ...prev, name: value }))}
          isEditing={isEditing}
        />
        <DeviceManagerTextField
          label={"IP Address"}
          value={deviceToDisplay?.ipAddress}
          validation={{
            isError: !!deviceToDisplay?.ipAddress && deviceToDisplay?.ipAddress?.length > MaxLengthForIpAddress,
            validationMessage: CharacterLimitWarning(deviceToDisplay?.ipAddress, MaxLengthForIpAddress),
          }}
          onUpdateValue={(value) => setDeviceRequest((prev) => ({ ...prev, ipAddress: value }))}
          isEditing={isEditing}
        />
        <DeviceManagerSelectField
          options={Object.values(DeviceStatus)}
          value={deviceToDisplay?.deviceStatus}
          label="Device Status"
          onChange={(value) => setDeviceRequest((prev) => ({ ...prev, deviceStatus: value as DeviceStatus }))}
          isEditing={isEditing}
        />
        <DeviceManagerSelectField
          options={Object.values(DeviceType)}
          value={deviceToDisplay?.deviceType}
          label="Device Type"
          onChange={(value) => setDeviceRequest((prev) => ({ ...prev, deviceType: value as DeviceType, deviceTypeDescription: undefined }))}
          isEditing={isEditing}
        />
        {deviceToDisplay?.deviceType === DeviceType.Other && (
          <DeviceManagerTextField
            label={"Device Type Description"}
            value={deviceToDisplay?.deviceTypeDescription}
            validation={{
              isError: !!deviceToDisplay?.deviceTypeDescription && deviceToDisplay?.deviceTypeDescription?.length > MaxLengthForDeviceDescription,
              validationMessage: CharacterLimitWarning(deviceToDisplay?.deviceTypeDescription, MaxLengthForDeviceDescription),
            }}
            onUpdateValue={(value) => setDeviceRequest((prev) => ({ ...prev, deviceTypeDescription: value }))}
            isEditing={isEditing}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 1 }}>
        {isEditing ? (
          <ConfirmAndCancelButtons
            onCancel={handleCancelEdit}
            onConfirm={handleUpdateDevice}
            isDisabled={isError}
            validationTooltip={validationMessage}
          />
        ) : (
          <>
            <Button onClick={handleEdit} color="primary" variant="contained">
              Edit
            </Button>
            <Button onClick={handleCloseDrawer} color="inherit">
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}
