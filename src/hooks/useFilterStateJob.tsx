import { useFilterStore } from "@/lib/stores/filter";
import { useEffect, useState } from "react";

export const useFilterStateJob = () => {
  const [filterQuery, setFilterQuery] = useState<Object>({});

  const { filter } = useFilterStore((state) => state);

  useEffect(() => {
    if (filter) {
      let query: any = {}; // CategoryJob: {}
      if (filter?.categories && filter?.categories.length > 0) {
        query["CategoryJob"] = {
          is: {
            id: {
              in: filter?.categories,
            },
          },
        };
      }
      if (filter?.jobtype && filter?.jobtype.length > 0) {
        query["TypeJob"] = {
          is: {
            id: {
              in: filter?.jobtype,
            },
          },
        };
      }
      setFilterQuery(query);
    }
  }, [filter]);
  return {
    filterQuery,
  };
};
