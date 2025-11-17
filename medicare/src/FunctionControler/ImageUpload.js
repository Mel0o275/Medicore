import toast from "react-hot-toast";
import { useUserMutations } from "../Hooks/reactUser/useUserMutations";

export const useHandleImageUpload = () => {
  const { uploadAvatarMutation } = useUserMutations();

  const handleImageUpload = (e, setSelectedImg) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      uploadAvatarMutation.mutate(base64Image, {
        onSuccess: () => {
          toast.success("Avatar uploaded successfully! ");
        },
        onError: (error) => {
          const serverMessage =
            error?.response?.data?.message || "Something went wrong";

          toast.error(serverMessage);
          // toast.error("Failed to upload image ");

        },
      });
    };
  };

  return { handleImageUpload };
};

  

 


