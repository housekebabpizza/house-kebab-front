import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge } from "@mui/material";
import { useRouter } from "next/router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGeneral } from "@/src/hooks/useGeneral";
import QuizIcon from "@mui/icons-material/Quiz";

export function MobileAppBar() {
  const { push, asPath } = useRouter();
  const { jwtToken, basketData, logOut } = useGeneral();
  const [value, setValue] = useState(
    asPath === "/" ? 0 : asPath === "/basket" ? 1 : asPath === "/contact" ? 2 : asPath === "/admin" ? 3 : 100
  );

  return (
    <div className="block md:hidden fixed bottom-0 right-0 w-full z-50">
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => setValue(newValue)} className="py-4">
        <BottomNavigationAction
          style={{ minWidth: !!jwtToken ? "70px" : "" }}
          onClick={() => push("/")}
          label="Menu"
          icon={<MenuBookIcon />}
        />
        <BottomNavigationAction
          style={{ minWidth: !!jwtToken ? "70px" : "" }}
          onClick={() => push("/basket")}
          label="Koszyk"
          icon={
            <Badge badgeContent={basketData?.length} color="error">
              <ShoppingBasketIcon />
            </Badge>
          }
        />
        <BottomNavigationAction
          style={{ minWidth: !!jwtToken ? "70px" : "" }}
          onClick={() => push("/contact")}
          label="Kontakt"
          icon={<RecentActorsIcon />}
        />
        {!jwtToken && (
          <BottomNavigationAction
            style={{ minWidth: !!jwtToken ? "70px" : "" }}
            onClick={() => push("/faq")}
            label="FAQ"
            icon={<QuizIcon />}
          />
        )}
        {jwtToken && (
          <BottomNavigationAction
            style={{ minWidth: !!jwtToken ? "70px" : "" }}
            onClick={() => push("/admin")}
            label="Admin"
            icon={<SupervisorAccountIcon />}
          />
        )}
        {jwtToken && (
          <BottomNavigationAction
            style={{ minWidth: !!jwtToken ? "70px" : "" }}
            onClick={() => {
              logOut();
              push("/");
            }}
            label="Log out"
            icon={<LogoutIcon />}
          />
        )}
      </BottomNavigation>
    </div>
  );
}
