import { getLocalStorage, setLocalStorage } from "@/src/hooks/useLocalStorage";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

export const CookieConsentModal = () => {
  const [isAgreec, setIsAgree] = useState<boolean>();
  useEffect(() => {
    setIsAgree(() => {
      const isAgree = getLocalStorage("cookie-consent");
      return isAgree === true || isAgree === false ? false : true;
    });
  }, []);

  return (
    <>
      {isAgreec ? (
        <div className="flex w-full fixed bottom-0 right-0 bg-yellow-400 md:items-center px-3 md:px-10 text-white z-50 py-3 flex-col md:flex-row justify-between">
          <p className="md:mr-10 text-xs md:text-lg">
            Używamy plików cookie, aby zapewnić najlepsze doświadczenia na stronie. Link do{" "}
            <Link className="text-blue-600" href="/faq">
              FAQ
            </Link>
          </p>
          <div className="flex mt-2">
            <button
              className="bg-blue-500 w-[120px] h-[30px] md:h-[40px] rounded-md mr-3 text-xs"
              onClick={() => {
                setLocalStorage("cookie-consent", true);
                setIsAgree(false);
              }}
            >
              Zgadzam się
            </button>
            <button
              className="bg-red-500 w-[120px] h-[30px] md:h-[40px] rounded-md text-xs"
              onClick={() => {
                setLocalStorage("cookie-consent", false);
                setIsAgree(false);
              }}
            >
              Nie zgadzam się
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
