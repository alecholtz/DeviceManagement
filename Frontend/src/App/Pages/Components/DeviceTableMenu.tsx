import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useDeviceApi } from "../../Api";

interface IProps {
  deviceId: number;
  onEdit: () => void;
}

export function DeviceTableMenu({ deviceId, onEdit }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { DeleteDevice } = useDeviceApi();
  const { mutateAsync: deleteDevice } = DeleteDevice;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDevice = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      await deleteDevice(deviceId);
      setAnchorEl(null);
      event.stopPropagation();
    } catch (err) {
      //Do nothing, the toast is handled in the API
    }
  };

  return (
    <>
      <Box
        className="row-actions"
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
        }}
        onClick={handleMenuOpen}
      >
        <IconButton size="small" color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose} onClick={(e) => e.stopPropagation()}>
        <MenuItem onClick={onEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteDevice}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
