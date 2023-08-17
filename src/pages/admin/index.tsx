import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ListItemText } from "@mui/material";
import { useGeneral } from "@/src/hooks/useGeneral";
import { useSocket } from "@/src/hooks/useSocket";
import { ISebdOrder } from "@/src/types";
import { ConfirmsOrderModal } from "@/src/components/Admin/components/Confirms-order-modal/ConfirmsOrderModal";
import { NotificationAdmin } from "@/src/components/Admin/components/Notification-admin/NotificationAdmin";
import { withAuth } from "@/src/components/Admin/components/Middleware-auth/withAuth";
import { AccordionAdmin } from "@/src/components/Admin/components/AccordionAdmin";

function Home() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const { ordersForAdmin, getOrdersForAdmin, getCountOrdersForAdmin } = useGeneral();
  const { newOrderData } = useSocket();
  const [openConfirmsOrderModal, setOpenConfirmsOrderModal] = useState<boolean>(false);
  const [orderForModal, setOrderForModal] = useState<ISebdOrder | any>();

  useEffect(() => {
    getCountPage();
  }, []);

  useEffect(() => {
    if (newOrderData) {
      getOrdersForAdmin(1, 5);
    }
  }, [newOrderData]);

  const handleClickClose = () => {
    setOpenConfirmsOrderModal(false);
  };

  const handleClickOpen = (order: ISebdOrder) => {
    if (!order?.isDelivered && order?.statusOrder !== "Anulować") {
      setOrderForModal(order);
      setOpenConfirmsOrderModal(true);
    }
  };

  const getCountPage = async () => {
    const count = await getCountOrdersForAdmin();
    setCount(count);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getOrdersForAdmin(value, 5);
    setPage(value);
  };

  return (
    <div className="w-full pb-20 relative h-full flex flex-col justify-between">
      {ordersForAdmin?.length ? (
        <div className="w-full p-4 md:p-10">
          {ordersForAdmin?.map((item: ISebdOrder, index: number) => (
            <AccordionAdmin item={item} key={index} handleClickOpen={handleClickOpen} />
          ))}
        </div>
      ) : (
        <ListItemText primary="Nie masz jeszcze zamówienia!" className="text-center text-red-400" />
      )}
      {count > 4 && (
        <Stack spacing={2}>
          <Pagination count={Math.ceil(count / 5)} page={page} onChange={handleChange} />
        </Stack>
      )}
      {openConfirmsOrderModal && (
        <ConfirmsOrderModal
          newOpen={openConfirmsOrderModal}
          handleClickClose={handleClickClose}
          orderForModal={orderForModal}
          refreshOrdersForAdmin={getOrdersForAdmin}
          page={page}
        />
      )}
      <NotificationAdmin />
    </div>
  );
}

export default withAuth(Home);
