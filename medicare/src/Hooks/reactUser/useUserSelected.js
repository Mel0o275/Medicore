import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../API/userApi";

export const useUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
