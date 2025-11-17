import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addNoti , deleteNoti , clearNoti } from "../../API/notiApi";

export const useNotiMutations = () => {
  const queryClient = useQueryClient();

  const addNotiMutation = useMutation({
    mutationFn: addNoti,
    onSuccess: () => {
      queryClient.invalidateQueries(["notis"]);
    },
  });

  const deleteNotiMutation = useMutation({
    mutationFn: deleteNoti,
    onSuccess: () => {
      queryClient.invalidateQueries(["notis"]);
    },
  });

  const clearNotiMutation = useMutation({
    mutationFn: clearNoti,
    onSuccess: () => {
      queryClient.invalidateQueries(["notis"]);
    },
  });

  return {
    addNotiMutation,
    deleteNotiMutation,
    clearNotiMutation,
  };
};
