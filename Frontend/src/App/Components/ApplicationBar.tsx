import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ApplicationMenu } from "./ApplicationMenu";

interface IProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function ApplicationBar({ isDarkMode, onThemeToggle }: IProps) {
  return (
    <Box sx={{ display: "flex", borderRadius: 2, overflow: "hidden" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Device Manager
          </Typography>
          <ApplicationMenu isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
