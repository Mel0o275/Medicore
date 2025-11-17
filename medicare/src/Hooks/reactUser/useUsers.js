import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../API/userApi";

export const useUsers = (page, limit) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers({ page, limit }),
    keepPreviousData: true, // علشان ما تختفيش الداتا أثناء التحميل
  });
};
