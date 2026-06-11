import { Box } from "@mui/material";
import { ApplicationBar } from "../Components";
import { DeviceTable } from "./Components";

interface IProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function DeviceManager({ isDarkMode, onThemeToggle }: IProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ position: "sticky", top: 0, zIndex: 10, pt: 1, px: 2 }}>
        <ApplicationBar isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      </Box>
      <Box sx={{ mt: 2, flex: 1, overflow: "auto", px: 2 }}>
        <DeviceTable />
      </Box>
    </Box>
  );
}
