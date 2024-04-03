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
              "rounded-lg border border-[1px] border-black-100 mr-3 mb-3"
            }
          >
            <div
              className={
                //date header
                "font-semibold text-md rounded-t-lg bg-gray-200 w-full min-w-[300px] min-h-10 flex items-center"
              }
            >
              {DateTime.fromFormat(mth, "yyyy-MM").toFormat("MMMM yyyy")}
              {groupedData && (
                <span className={"text-sm font-normal"}>
                  ({groupedData[mth]?.length} held shifts)
                </span>
              )}
            </div>
            {groupedData[mth]?.map((mthItem, idx) => {
              return (
                <div>
                  {/*{(groupedData[mth].length === 1 ||*/}
                  {/*  mthItem.slot.start.substring(8, 10) !==*/}
                  {/*    groupedData[mth][idx + 1].slot.start.substring(8, 10)) &&*/}
                  {/*  mthItem.slot.start.substring(8, 10)}*/}
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
