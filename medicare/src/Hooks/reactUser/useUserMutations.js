import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUserData,
  changePassword,
  uploadAvatar,
  deleteUser,
} from "../../API/userApi";


export const useUserMutations = () => {
  const queryClient = useQueryClient();


  const updateDataMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
     
    },
  });

  const changePassMutation = useMutation({
    mutationFn: changePassword,
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: uploadAvatar,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  return {
    updateDataMutation,
    changePassMutation,
    uploadAvatarMutation,
    deleteUserMutation,
  };
};
