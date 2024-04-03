import { ChangeEvent, FC } from "react";

interface IForm<T> {
  label: T;
  name: T;
  type: T;
  placeholder?: T;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: FC<IForm<string>> = ({ ...props }) => {
  return (
    <div className={"flex flex-row items-center"}>
      <label className={"mr-2 text-sm font-semibold"}>{props.label}</label>
      <input
        className={"rounded-lg border border-[1px] border-black-100 h-9 p-3"}
        {...props}
      />
    </div>
  );
};
