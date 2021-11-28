import { ErrorText } from "../constants/error";
import { UserItem } from "../types";

const MARKED_USER_ITEMS_KEY = "marked-user-items";

const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);

  if (!item) {
    return;
  }

  return JSON.parse(item);
};

const setLocalStorageItem = (key: string, item: Object) =>
  localStorage.setItem(key, JSON.stringify(item));

const isValidMarkedUserItems = (
  userItems: unknown
): userItems is UserItem[] => {
  if (!Array.isArray(userItems)) {
    return false;
  }

  if (
    userItems.some(
      (userItem: UserItem) =>
        !(
          typeof userItem.name === "string" &&
          typeof userItem.isMarked === "boolean" &&
          typeof userItem.profileImage === "string"
        )
    )
  ) {
    return false;
  }

  return true;
};

export const getMarkedUserItems = () => {
  const markedUserItems = getLocalStorageItem(MARKED_USER_ITEMS_KEY) ?? [];

  if (!isValidMarkedUserItems(markedUserItems)) {
    throw Error(ErrorText.INVALID_MARKED_USER_ITEM_FOUND);
  }

  return markedUserItems;
};

export const hasMarkedUserItem = (userName: string) => {
  const markedUserItems = getMarkedUserItems();

  return markedUserItems.some(
    (markedUserItem) => markedUserItem.name === userName
  );
};

export const addMarkedUserItem = (userItem: UserItem) => {
  const markedUserItems = getMarkedUserItems();

  if (!isValidMarkedUserItems(markedUserItems)) {
    throw Error(ErrorText.INVALID_MARKED_USER_ITEM_FOUND);
  }

  if (hasMarkedUserItem(userItem.name)) {
    throw Error(ErrorText.DUPLICATED_MARKED_USER_ITEM);
  }

  markedUserItems.push(userItem);

  setLocalStorageItem(MARKED_USER_ITEMS_KEY, markedUserItems);
};

export const removeMarkedUserItem = (userName: UserItem["name"]) => {
  const markedUserItems = getLocalStorageItem(MARKED_USER_ITEMS_KEY);

  if (!markedUserItems) {
    throw Error(ErrorText.CANNOT_REMOVE_LOCAL_STORAGE_ITEM);
  }

  if (!isValidMarkedUserItems(markedUserItems)) {
    throw Error(ErrorText.INVALID_MARKED_USER_ITEM_FOUND);
  }

  const targetIndex = markedUserItems.findIndex(
    (userItem) => userItem.name === userName
  );

  if (targetIndex === -1) {
    throw Error(ErrorText.CANNOT_FIND_MARKED_USER_ITEM);
  }

  markedUserItems.splice(targetIndex, 1);
  setLocalStorageItem(MARKED_USER_ITEMS_KEY, markedUserItems);
};
