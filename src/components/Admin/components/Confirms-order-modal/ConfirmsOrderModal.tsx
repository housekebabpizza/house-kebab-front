import { useGeneral } from "@/src/hooks/useGeneral";
import { useSocket } from "@/src/hooks/useSocket";
import { IConfirmsOrder, ISebdOrder } from "@/src/types";
import { Checkbox, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface Props {
  newOpen: boolean;
  handleClickClose: () => void;
  orderForModal: ISebdOrder;
  refreshOrdersForAdmin: (page?: number | undefined, size?: number | undefined) => void;
  page: number;
}

export function ConfirmsOrderModal({ newOpen, handleClickClose, orderForModal, refreshOrdersForAdmin, page }: Props) {
  const [open, setOpen] = useState(newOpen);
  const { newOrderData, sendConfirmsOrder } = useSocket();
  const { updateOrder } = useGeneral();
  const [availableStatuses, setAvailableStatuses] = useState<string[]>(["Potwierdzony", "Kuchnia"]);
  const [form, setForm] = useState<IConfirmsOrder>({
    minutes: orderForModal?.minutes ?? "20",
    statusOrder: orderForModal?.statusOrder ?? "Potwierdzony",
    isDelivered: orderForModal?.isDelivered ?? false,
  });

  useEffect(() => {
    switch (form.statusOrder) {
      case "Nie potwierdzony":
        setAvailableStatuses(["Anulować", "Potwierdzony", "Kuchnia"]);
        break;
      case "Potwierdzony":
        setAvailableStatuses(["Anulować", "Kuchnia"]);
        break;
      case "Kuchnia":
        setAvailableStatuses(["Anulować", "W drodze"]);
        break;
      case "W drodze":
        setAvailableStatuses(["Anulować", "Smacznego 😀"]);
        break;
      default:
        setAvailableStatuses([]);
        break;
    }
  }, [setForm, form]);

  const handleClose = () => {
    setOpen(false);
    handleClickClose();
    setForm({ minutes: "", statusOrder: "", isDelivered: false });
  };

  const sendHandler = async () => {
    orderForModal.statusOrder = form?.statusOrder;
    orderForModal.isDelivered = form?.isDelivered;
    orderForModal.minutes = form?.minutes;

    await updateOrder(orderForModal, orderForModal?.id ?? "");
    sendConfirmsOrder(orderForModal?.clientPhone ?? newOrderData, form?.minutes, form?.statusOrder);
    refreshOrdersForAdmin(page, 5);
    handleClose();
  };

  const handleChangeTextField = (event: any) => {
    setForm((pre: IConfirmsOrder) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleChangeChekbox = (event: any) => {
    setForm((pre: IConfirmsOrder) => ({ ...pre, [event.target.name]: event.target.checked }));
  };

  return (
    <div>
      <Dialog
        open={open || newOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Potwierdzenie zamówienia"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl fullWidth>
              <Typography className="my-2">Wybierz czas</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form?.minutes}
                label=""
                name="minutes"
                onChange={handleChangeTextField}
              >
                <MenuItem value="20">20 Minutes</MenuItem>
                <MenuItem value="40">40 Minutes</MenuItem>
                <MenuItem value="60">60 Minutes</MenuItem>
                <MenuItem value="80">80 Minutes</MenuItem>
                <MenuItem value="100">100 Minutes</MenuItem>
                <MenuItem value="120">120 Minutes</MenuItem>
                <MenuItem value="140">140 Minutes</MenuItem>
                <MenuItem value="160">160 Minutes</MenuItem>
                <MenuItem value="180">180 Minutes</MenuItem>
                <MenuItem value="200">200 Minutes</MenuItem>
              </Select>
              {availableStatuses?.length ? (
                <>
                  <Typography className="my-2" pt={1}>
                    Zmienić status zamówienia
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form.statusOrder}
                    onChange={handleChangeTextField}
                    name="statusOrder"
                  >
                    <MenuItem value={form.statusOrder}>{form.statusOrder}</MenuItem>
                    {availableStatuses?.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                ""
              )}
              {form.statusOrder == "Smacznego 😀" ? (
                <FormControlLabel
                  control={<Checkbox checked={form?.isDelivered} name="isDelivered" onChange={handleChangeChekbox} />}
                  label="Dostarczony ?"
                />
              ) : (
                ""
              )}
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={sendHandler}>Zaakceptować</Button>
          <Button onClick={handleClose}>Zamknąć</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
