import { CustomInput } from "./CustomInput";
import { ChangeEvent, useContext } from "react";
import { SearchContext } from "../context/searchContext";

export const SearchBar = () => {
  const { handleSearch } = useContext(SearchContext);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleSearch(value);
  };
  return (
    <div
      className={
        "py-6 fixed bg-white text-black text-sm w-full min-w-[400px] flex flex-row items-center"
      }
    >
      <CustomInput
        label={"Caregiver Name"}
        name={"searchname"}
        type={"text"}
        placeholder={"Search"}
        onChange={handleChange}
      />
    </div>
  );
};
