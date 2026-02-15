import { userLoginAPI } from "./UserLoginAxios";

export const checkActiveUser = async () => {
  try {
    const response = await userLoginAPI.get("/current-user");

    if (response?.data?.data) {
      return {
        name: response.data.data.name,
        avatarURL: response.data.data.avatarURL,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
