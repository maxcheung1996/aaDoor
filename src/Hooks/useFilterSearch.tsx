import { useState, useEffect } from "react";
import { MyActivityModal } from "../model/activity";

export const [searchQuery, setSearchQuery] = useState("");
export const [filteredSearch, setFilteredSearch] = useState<MyActivityModal[]>([
  {
    activityGuid: "",
    category: "",
    woNo: "",
    activityId: "",
    locationCode: "",
    locationDesc: "",
    startDatetime: "",
    endDatetime: "",
    isDeleted: "",
    createdBy: "",
    createdTimestamp: "",
    updatedBy: "",
    updatedTimestamp: "",
  },
]);

export const useFilterSearch = (activity: MyActivityModal[]) => {
  useEffect(() => {
    let tempSearchResult: MyActivityModal[] = activity.filter((ele) =>
      ele.activityId.includes(searchQuery)
    );
    setFilteredSearch([...tempSearchResult]);
  }, [searchQuery]);

  return filteredSearch;
};
