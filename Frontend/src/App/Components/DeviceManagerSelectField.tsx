import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { SplitCaps } from "../Helpers";

interface IProps {
  options: string[];
  value: string | undefined;
  label: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  isSmall?: true;
}

export function DeviceManagerSelectField({ options, label, value, onChange, isSmall, isEditing }: IProps) {
  return isEditing ? (
    <FormControl sx={{ m: isSmall ? 0 : 1, width: !isSmall ? 300 : 150 }} size={isSmall ? "small" : undefined}>
      <InputLabel>{label}</InputLabel>
      <Select value={value ?? ""} onChange={(e) => onChange(e.target.value)} input={<OutlinedInput label={label} />} renderValue={(val) => val}>
        {options.map((option) => (
          <MenuItem key={option} value={SplitCaps(option)}>
            <Checkbox checked={option === value} />
            <ListItemText primary={SplitCaps(option)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
