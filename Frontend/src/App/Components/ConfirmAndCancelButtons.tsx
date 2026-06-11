import { Button, Tooltip } from "@mui/material";

interface IProps {
  onCancel: () => void;
  onConfirm: () => void;
  isDisabled: boolean;
  validationTooltip: string | undefined;
  overwrittenConfirmButtonText?: string;
}

export function ConfirmAndCancelButtons({ onCancel, onConfirm, isDisabled, validationTooltip, overwrittenConfirmButtonText }: IProps) {
  return (
    <>
      <Tooltip title={isDisabled ? validationTooltip : undefined}>
        <span>
          {/*span is required to to render a tooltip when button is disabled*/}
          <Button onClick={onConfirm} color="primary" variant="contained" disabled={isDisabled}>
            {overwrittenConfirmButtonText || "Confirm"}
          </Button>
        </span>
      </Tooltip>
      <Button onClick={onCancel} color="inherit">
        Cancel
      </Button>
    </>
  );
}
