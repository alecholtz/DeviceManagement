import { Box, TextField, Typography } from "@mui/material";
import { IValidationResult } from "../Interfaces";

interface IProps {
  label: string;
  value: string | undefined;
  validation: IValidationResult;
  onUpdateValue: (value: string) => void;
  isEditing: boolean;
  isSmall?: true;
}

export function DeviceManagerTextField({ label, value, onUpdateValue, validation: { isError, validationMessage }, isSmall, isEditing }: IProps) {
  return isEditing ? (
    <Box sx={{ padding: isSmall ? 0 : 1 }}>
      <TextField
        size={isSmall ? "small" : undefined}
        label={label}
        variant="outlined"
        fullWidth={!isSmall}
        value={value ?? ""}
        onChange={(e) => onUpdateValue(e.target.value)}
        error={isError}
        helperText={isSmall ? undefined : validationMessage}
      />
    </Box>
  ) : (
    <Box sx={{ display: "flex", gap: 1, fontWeight: "bold", paddingBottom: 1 }}>
      <Typography>
        {label}
        {":"}
      </Typography>
      {value}
    </Box>
  );
}
