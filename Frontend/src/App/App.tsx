import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DeviceManager } from "./Pages";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const appTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline>
        <DeviceManager isDarkMode={isDarkMode} onThemeToggle={() => setIsDarkMode((prev) => !prev)} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </CssBaseline>
    </ThemeProvider>
  );
}
