import { useState } from "react";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface IProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function ApplicationMenu({ isDarkMode, onThemeToggle }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={onThemeToggle}>
          <ListItemIcon>{isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}</ListItemIcon>
          <ListItemText>{isDarkMode ? "Light Mode" : "Dark Mode"}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
