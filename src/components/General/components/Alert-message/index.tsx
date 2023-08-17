import * as React from "react";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useGeneral } from "@/src/hooks/useGeneral";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//'success' | 'info' | 'warning' | 'error';
export function AlertMessage() {
  const { errorAlertData }: any = useGeneral();
  return (
    <>
      {errorAlertData?.message ? (
        <Stack spacing={2} className="fixed top-10 right-6">
          <Alert severity={errorAlertData?.type}>{errorAlertData?.message}</Alert>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
