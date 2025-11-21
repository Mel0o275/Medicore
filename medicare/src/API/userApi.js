import clientUser from "./clientUser";

// Get one user
export const test = async () => {
  const res = await clientUser.get(`/`);
  return res.data.data.user;
};

// Get all users
export const getUsers = async ({ page = 1, limit = 10 }) => {
  const res = await clientUser.get(`/get-users?page=${page}&limit=${limit}`);
  return res.data.data.users;
};


// Get one user
export const getUserById = async (id) => {
  const res = await clientUser.get(`/get-user/${id}`);
  return res?.data?.data?.user;
};

// Change user data
export const updateUserData = async (newData) => {
  //   console.log("Sending data to server:", newData);

  const res = await clientUser.put("/change-data", newData);
  return res.data.data.user;
};

// Change password
export const changePassword = async (password) => {
  const res = await clientUser.put("/change-pass", password);
  return res.data.data.user;
};

// Upload avatar
export const uploadAvatar = async (avatar) => {
  const res = await clientUser.post(
    "/upload-avatar",
    { profilePic: avatar },
    { headers: { "Content-Type": "application/json" } }
  );

  return res.data.data.user;
};


// Delete user
export const deleteUser = async (id) => {
  const res = await clientUser.delete(`/delete-user/${id}`);

  return res.data.message; // "User deleted successfully"


};
