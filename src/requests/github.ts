import axios from "axios";
import { ErrorText } from "../constants/error";
import { API_URL } from "../constants/urls";
import { hasMarkedUserItem } from "../services/markedUserItem";
import { UserItem } from "../types";

const CLIENT_ID = "Iv1.0f4bafec91dba04a";
const CLIENT_SECRET = "ceca60489d12eae813de8fa35aaf1bcb25243e44";

const hasUserItemData = (data: Object): data is UserItem & Object => {
  if ("avatar_url" in data) {
    return false;
  }

  if ("login" in data) {
    return false;
  }

  return true;
};

/** Important : 깃허브에 유저 검색 요청을 수행하는 request 함수입니다. 단순히 데이터를 가져오는 것만이 아니라 필요한 데이터가 있는지에 대한 예외처리를 수행합니다. */
export const requestSearchUsers = async (userName: string) => {
  const response = await axios.get(API_URL.SEARCH_USER, {
    params: {
      q: userName,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      page: 1,
      per_page: 100,
    },
  });

  response.data.items.forEach((item: Object) => {
    if (hasUserItemData(item)) {
      throw Error(ErrorText.INVALID_USER_DATA_STRUCTURE);
    }
  });

  const userItems: UserItem[] = response.data.items.map(
    (user: { avatar_url: string; login: string }) => ({
      profileImage: user.avatar_url,
      name: user.login,
      isMarked: hasMarkedUserItem(user.login) ? true : false,
    })
  );

  return userItems;
};
