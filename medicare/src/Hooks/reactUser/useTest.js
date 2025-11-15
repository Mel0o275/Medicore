import { useQuery } from "@tanstack/react-query";
import { test } from "../../API/userApi";

export const useTest = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: test,
    enabled: false
  });
};
