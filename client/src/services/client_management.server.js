import { fetchAllUsersInfoService } from "./user.service";

export const clientInfo = async (page) => {
  const userInfo = await fetchAllUsersInfoService(page);

  console.log(userInfo);
};
