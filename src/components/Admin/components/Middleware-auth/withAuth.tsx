import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGeneral } from "@/src/hooks/useGeneral";
export const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const { jwtToken } = useGeneral();
    const { push } = useRouter();
    useEffect(() => {
      try {
        if (!jwtToken) {
          throw new Error("Not Auth");
        }
      } catch (err) {
        push("/admin/login");
      }
    }, []);
    return <Component {...props} />;
  };

  return Auth;
};
