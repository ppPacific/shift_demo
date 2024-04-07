import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import { IShift } from "../components/Shift";

export const useData = () => {
  const shiftUrl = "http://localhost:3001/shifts";
  const [mshifts, setMShifts] = useState<Array<IShift>>();
  const [sortedShifts, setSortedShifts] = useState<Array<IShift>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(shiftUrl, {
          headers: { Accept: "application/json" },
        });

        if (response && response.data && response.data.length > 0)
          setMShifts(response.data);
      } catch (e) {
        throw new Error("cannot load shifts!");
      }
    })();
  }, []);

  useEffect(() => {
    if (mshifts) {
      let sorted = mshifts.sort(function (a, b) {
        return (
          DateTime.fromFormat(
            a.slot.start,
            "yyyy-MM-dd'T'HH:mm:ss",
          ).toMillis() -
          DateTime.fromFormat(b.slot.start, "yyyy-MM-dd'T'HH:mm:ss").toMillis()
        );
      });
      setSortedShifts(sorted);
    }
  }, [mshifts]);

  return { sortedShifts };
};
