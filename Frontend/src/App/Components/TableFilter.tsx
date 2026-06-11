import { FilterAlt } from "@mui/icons-material";
import { Box, Checkbox, IconButton, ListItemText, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

type multiSelectProps<T> = {
  variant: "multiSelect";
  options: T[];
  selectedValues: T[];
  onUpdateSelectedValues: (value: T[]) => void;
};

type searchBarProps = {
  variant: "searchBar";
  value: string | undefined;
  label: string;
  onUpdateSearch: (value: string) => void;
};

type TableFilterProps<T> = multiSelectProps<T> | searchBarProps;

export function TableFilter<T>(props: TableFilterProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { variant } = props;

  const handleOnClickIconButton = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleOnClickCheckbox = (event: React.MouseEvent<HTMLElement>, option: T) => {
    if (variant !== "multiSelect") return;
    props.onUpdateSelectedValues(
      props.selectedValues.includes(option) ? [...props.selectedValues.filter((sv) => sv !== option)] : [...props.selectedValues, option],
    );
    event.stopPropagation();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOnClickIconButton}>
        <FilterAlt fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} onClick={(e) => e.stopPropagation()}>
        {variant === "multiSelect" &&
          props.options.map((opt) => (
            <MenuItem key={opt?.toString()} value={opt?.toString()} onClick={(e) => handleOnClickCheckbox(e, opt)}>
              <Checkbox checked={props.selectedValues.includes(opt)} />
              <ListItemText primary={opt?.toString()} />
            </MenuItem>
          ))}
        {variant === "searchBar" && (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 2 }}>
            <TextField
              fullWidth
              size="small"
              label={props.label}
              variant="outlined"
              multiline
              maxRows={10}
              value={props.value ?? ""}
              onChange={(e) => props.onUpdateSearch(e.target.value)}
            />
          </Box>
        )}
      </Menu>
    </>
  );
}
