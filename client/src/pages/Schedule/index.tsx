import { useData } from "../../hooks/useData";
import { DateTime } from "luxon";
import { IShift, Shift } from "../../components/Shift";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/searchContext";

export const SchedulePage = () => {
  const { sortedShifts } = useData();
  const { searchTerm } = useContext(SearchContext);
  const [shifts, setShifts] = useState<Array<IShift>>(sortedShifts);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [statusUpdates, setStatusUpdates] = useState<Array<IShift>>([]);

  useEffect(() => {
    if (sortedShifts) {
      setShifts(sortedShifts);
      setStatusUpdates(sortedShifts);
    }
  }, [sortedShifts]);

  const handleCheckboxChange = (recordId: string) => {
    setSelectedRecords((prevSelectedRecords) => {
      if (prevSelectedRecords.includes(recordId)) {
        return prevSelectedRecords.filter((id) => id !== recordId);
      } else {
        return [...prevSelectedRecords, recordId];
      }
    });
  };
  const handleSelectAllChange = (currMth: Array<IShift>) => {
    const colData = currMth?.map((item) => {
      if (item.status === "pending") return item.s_id;
    });

    if (checkRemain(currMth)) {
      setSelectedRecords((prevState) => {
        return prevState.filter((id) => !colData.includes(id));
      });
    } else {
      for (const id of colData) {
        if (!selectedRecords.includes(id!)) {
          handleCheckboxChange(id!);
        }
      }
    }
  };

  const handleStatus = (recordId: string, status: string) => {
    if (selectedRecords.includes(recordId)) {
      setStatusUpdates((prevRecords) =>
        prevRecords.map((record) =>
          record.s_id === recordId ? { ...record, status: status } : record,
        ),
      );
    } else {
      setShifts((prevRecords) =>
        prevRecords.map((record) =>
          record.s_id === recordId ? { ...record, status: status } : record,
        ),
      );
      setStatusUpdates((prevRecords) =>
        prevRecords.map((record) =>
          record.s_id === recordId ? { ...record, status: status } : record,
        ),
      );
    }
  };

  const handleConfirmAll = (currMth: Array<IShift>) => {
    const colData = currMth?.map((item) => {
      return item.s_id;
    });
    setShifts((prevRecords) =>
      prevRecords.map((record) => {
        const statusUpdate = statusUpdates.find(
          (update) =>
            update.s_id === record.s_id && colData.includes(update.s_id),
        );
        return statusUpdate
          ? { ...record, status: statusUpdate.status }
          : record;
      }),
    );

    setSelectedRecords([]);
  };

  let groupedData = shifts
    .filter(
      (item) =>
        item.en_fullName
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()) ||
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
  const checkRemain = (currMth: Array<IShift>) => {
    return currMth
      ?.filter((item) => item.status === "pending")
      .every((item) => selectedRecords.includes(item.s_id));
  };

  return (
    <div className={"pt-24 flex flex-col mobile:flex-row overflow-y-scroll"}>
      {sortedMonths?.map((mth, idx) => {
        return (
          <div
            key={`k${idx}-${mth}`}
            className={
              "rounded-lg border border-[1px] border-black-100 min-w-[360px] min-h-[100vh] mr-3 mb-3 overflow-x-auto"
            }
          >
            <div
              className={
                "flex flex-row justify-between items-center rounded-t-lg bg-gray-200 pr-2"
              }
            >
              <div
                className={
                  "font-semibold text-md w-full min-h-10 flex items-center flex-row"
                }
              >
                <div className={"flex items-center pl-4 pr-2"}>
                  <input
                    type={"checkbox"}
                    checked={checkRemain(groupedData[mth])}
                    disabled={groupedData[mth]?.every(
                      (item) => item.status !== "pending",
                    )}
                    onChange={() => handleSelectAllChange(groupedData[mth])}
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
                onClick={() => handleConfirmAll(groupedData[mth])}
                disabled={groupedData[mth]?.every(
                  (item) => item.status !== "pending",
                )}
              >
                Confirm
              </button>
            </div>
            {groupedData[mth]?.map((mthItem, idx) => {
              return (
                <div key={`k-${idx}-${mthItem.s_id}`}>
                  <div className={"bg-gray-100 flex items-center"}>
                    {
                      <div className={"pl-2 text-xs font-semibold"}>
                        {DateTime.fromFormat(
                          mthItem.slot.start,
                          "yyyy-MM-dd'T'HH:mm:ss",
                        ).toFormat("d MMMM")}
                      </div>
                    }
                  </div>
                  <Shift
                    s_id={mthItem.s_id}
                    code={mthItem.code}
                    en_fullName={mthItem.en_fullName}
                    ch_fullName={mthItem.ch_fullName}
                    type={mthItem.type}
                    status={mthItem.status}
                    slot={mthItem.slot}
                    checked={selectedRecords.includes(mthItem.s_id)}
                    onChangeCheck={handleCheckboxChange}
                    onHandleStatus={handleStatus}
                    records={selectedRecords}
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
