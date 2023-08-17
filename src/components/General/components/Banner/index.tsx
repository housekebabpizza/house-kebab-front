import { IHeader } from "@/src/types";

interface Props {
  header: IHeader;
}

export const Banner = ({ header }: Props) => {
  return (
    <div className="w-full h-[150px] md:h-[200px] relative">
      {header?.banner ? (
        <img className="w-full h-[150px] md:h-[200px" src={header?.banner || ""} alt="house Bnner" />
      ) : (
        ""
      )}
      <div className="w-[62px] h-[62px] md:w-[72px] md:h-[72px] absolute left-10 md:left-20 -bottom-2 bg-slate-100 flex justify-center items-center rounded-md">
        {header?.logo ? (
          <img
            className="w-[62px] h-[62px] md:w-[72px] md:h-[72px] bg-white p-0.5 rounded-md"
            src={header?.logo || ""}
            alt="house Logo"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
