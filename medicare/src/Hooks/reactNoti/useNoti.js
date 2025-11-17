import { useQuery } from "@tanstack/react-query";
import { getNoti } from "../../API/notiApi";

export const useNoti = (page, limit) => {
  return useQuery({
    queryKey: ["notis", page, limit],
    queryFn: () => getNoti({ page, limit }),
    keepPreviousData: true, 
  });
};
