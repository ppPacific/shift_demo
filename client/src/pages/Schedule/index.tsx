import { useData } from "../../hooks/useData";
import { DateTime } from "luxon";
import { IShift, Shift } from "../../components/Shift";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../context/searchContext";

export const SchedulePage = () => {
  const { sortedShifts } = useData();
  //const { apiData, setApiData } = useStore();
  const { searchTerm } = useContext(SearchContext);

  let groupedData = sortedShifts
    .filter(
      (item) =>
        item.en_fullName.includes(searchTerm.trim()) ||
        item.ch_fullName.includes(searchTerm.trim()),
    )
    .reduce((result: { [month: string]: Array<IShift> }, item) => {
      const month = DateTime.fromFormat(
        item.slot.start,
        "yyyy-MM-dd'T'HH:mm:ss",
      ).toFormat("yyyy-MM");
      if (!result[month]) {
        result[month] = [];
      }
      result[month].push(item);
      return result;
    }, {});

  let sortedMonths = Object.keys(groupedData); //sort()

  return (
    <div className={"pt-24 flex flex-col mobile:flex-row overflow-y-scroll"}>
      {sortedMonths?.map((mth, idx) => {
        return (
          <div
            key={`${idx}-${mth}`}
            className={
              "rounded-lg border border-[1px] border-black-100 min-w-[360px] mr-3 mb-3"
            }
          >
            <div
              className={
                "flex flex-row justify-between items-center bg-gray-200 pr-2"
              }
            >
              <div
                className={
                  "font-semibold text-md rounded-t-lg w-full min-h-10 flex items-center flex-row"
                }
              >
                <div className={"flex items-center pl-4 pr-2"}>
                  <input
                    type={"checkbox"}
                    value={mth}
                    //onChange={checkboxHandler}
                  />
                </div>
                {DateTime.fromFormat(mth, "yyyy-MM").toFormat("MMMM yyyy")}
                {groupedData && (
                  <span className={"text-sm font-normal"}>
                    ({groupedData[mth]?.length} held shifts)
                  </span>
                )}
              </div>
              <button
                className={
                  "px-3 h-6 rounded border border-1 border-green-500 bg-green-500 text-white flex items-center text-sm font-semibold"
                }
                //disabled={true}
                onClick={() => {
                  console.log("confirm");
                }}
              >
                Confirm
              </button>
            </div>
            {groupedData[mth]?.map((mthItem, idx) => {
              return (
                <div>
                  <div className={"bg-gray-100 flex items-center"}>
                    {
                      //groupedData[mth].length === 1 && (
                      <div className={"pl-2 text-xs font-semibold"}>
                        {DateTime.fromFormat(
                          mthItem.slot.start,
                          "yyyy-MM-dd'T'HH:mm:ss",
                        ).toFormat("d MMMM")}
                      </div>
                      //)
                      // mthItem.slot.start.substring(8, 10) !==
                      //   groupedData[mth][idx + 1].slot.start.substring(8, 10)) &&
                      // mthItem.slot.start.substring(8, 10)
                    }
                  </div>
                  <Shift
                    key={`k-${idx}-${mthItem.s_id}`}
                    s_id={mthItem.s_id}
                    code={mthItem.code}
                    en_fullName={mthItem.en_fullName}
                    ch_fullName={mthItem.ch_fullName}
                    type={mthItem.type}
                    status={mthItem.status}
                    slot={mthItem.slot}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
