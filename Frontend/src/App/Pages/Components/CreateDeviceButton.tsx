import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ConfirmAndCancelButtons, DeviceManagerSelectField, DeviceManagerTextField } from "../../Components";
import { IDeviceRequest } from "../../Interfaces";
import { DeviceStatus, DeviceType } from "../../Enums";
import { ValidateDeviceDialog } from "./Helpers";
import { useDeviceApi } from "../../Api";
import { CharacterLimitWarning, IsDevice } from "../../Helpers";
import { MaxLengthForDeviceDescription, MaxLengthForDeviceName, MaxLengthForIpAddress } from "../../Interfaces/IDevice";

interface IProps {}

//FUTURE IMPROVEMENTS: form validation libary to simplify validation state
export function CreateDeviceButton({}: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [device, setDevice] = useState<Partial<IDeviceRequest>>({});

  const { CreateDevice } = useDeviceApi();
  const { mutateAsync: createDevice } = CreateDevice;

  const handleCloseDialog = () => {
    setDevice({});
    setIsOpen(false);
  };

  const { isError, validationMessage } = ValidateDeviceDialog(device);

  const handleCreateDevice = async () => {
    if (isError || !IsDevice(device)) return;

    try {
      await createDevice(device);
      handleCloseDialog();
    } catch (err) {
      //Do nothing, the toast is handled in the API
    }
  };

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} sx={{ borderRadius: 2 }}>
        <AddIcon />
        {"Add Device"}
      </IconButton>
      <Dialog open={isOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{"Create Device"}</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 0.5 }}>
            <DeviceManagerTextField
              label={"Device Name"}
              value={device?.name}
              validation={{
                isError: !!device?.name && device?.name?.length > MaxLengthForDeviceName,
                validationMessage: CharacterLimitWarning(device?.name, MaxLengthForDeviceName),
              }}
              onUpdateValue={(value) => setDevice((prev) => ({ ...prev, name: value }))}
              isEditing
            />
            <DeviceManagerTextField
              label={"IP Address"}
              value={device?.ipAddress}
              validation={{
                isError: !!device?.ipAddress && device?.ipAddress?.length > MaxLengthForIpAddress,
                validationMessage: CharacterLimitWarning(device?.ipAddress, MaxLengthForIpAddress),
              }}
              onUpdateValue={(value) => setDevice((prev) => ({ ...prev, ipAddress: value }))}
              isEditing
            />
            <DeviceManagerSelectField
              options={Object.values(DeviceStatus)}
              value={device?.deviceStatus}
              label="Device Status"
              onChange={(value) => setDevice((prev) => ({ ...prev, deviceStatus: value as DeviceStatus }))}
              isEditing
            />
            <DeviceManagerSelectField
              options={Object.values(DeviceType)}
              value={device?.deviceType}
              label="Device Type"
              onChange={(value) => setDevice((prev) => ({ ...prev, deviceType: value as DeviceType, deviceTypeDescription: undefined }))}
              isEditing
            />
            {device?.deviceType === DeviceType.Other && (
              <DeviceManagerTextField
                label={"Device Type Description"}
                value={device?.deviceTypeDescription}
                validation={{
                  isError: !!device?.deviceTypeDescription && device?.deviceTypeDescription?.length > MaxLengthForDeviceDescription,
                  validationMessage: CharacterLimitWarning(device?.deviceTypeDescription, MaxLengthForDeviceDescription),
                }}
                onUpdateValue={(value) => setDevice((prev) => ({ ...prev, deviceTypeDescription: value }))}
                isEditing
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <ConfirmAndCancelButtons
            isDisabled={isError}
            validationTooltip={validationMessage}
            onCancel={handleCloseDialog}
            onConfirm={handleCreateDevice}
            overwrittenConfirmButtonText="Create"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
