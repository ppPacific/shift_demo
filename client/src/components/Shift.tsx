import { ChangeEvent, FC } from "react";
import { log } from "util";
interface ISlot {
  start: string;
  end: string;
}
export interface IShift {
  s_id: string;
  code: number;
  en_fullName: string;
  ch_fullName: string;
  type: string;
  status: string;
  slot: ISlot;
}

const Colors = {
  ST: "#4df5b9",
  EN: "#f54dce",
} as const;

export const Shift: FC<IShift> = ({ ...props }) => {
  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
  };
  return (
    <div className={"flex flex-row border-t-[1px] "}>
      <div className={"flex items-center pl-4"}>
        <input
          type={"checkbox"}
          value={props.s_id}
          onChange={checkboxHandler}
        />
      </div>
      <div className={"flex flex-col text-xs text-black gap-y-2 p-4"}>
        <div>{props.slot.start}</div>
        <div>
          {props.code} - {props.en_fullName} {props.ch_fullName}
        </div>
        <div className={"flex flex-row items-center"}>
          <div
            style={{
              backgroundColor: `${Colors[props.type as keyof typeof Colors]}`,
              minWidth: "8px",
              height: "8px",
              borderRadius: "10px",
              marginRight: "5px",
            }}
          ></div>
          {props.type}
        </div>
        {props.status !== "pending" ? (
          <div
            className={
              props.status === "confirmed" ? "confirmed-btn" : "declined-btn"
            }
          >
            {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
          </div>
        ) : (
          <div className={"flex flex-row gap-2"}>
            <button
              className={
                "px-3 h-6 rounded border border-1 border-red-600 text-red-600"
              }
              onClick={() => {
                console.log("decline");
              }}
            >
              Decline
            </button>
            <button
              className={
                "px-3 h-6 rounded border border-1 border-green-500 bg-green-500 text-white"
              }
              onClick={() => {
                console.log("confirm");
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
