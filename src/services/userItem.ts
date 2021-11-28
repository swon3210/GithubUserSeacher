import { UserItem } from "../types";
import {
  getFirstCharacter,
  isKoreanCharacter,
  isEnglishCharacter,
  isSpecialCharacter,
} from "../utils/character";

/** Important : 한글, 영어, 특수기호로 시작하는 이름들을 각 순서에 해당하는 배열에 넣어 return 해주는 메서드입니다. */
export const getSortedUserItemMatrix = (userItems: UserItem[]) => {
  const UserItemMatrix: UserItem[][] = [[], [], []];

  [...userItems]
    .sort((a, b) => new Intl.Collator("ko-KR").compare(a.name, b.name))
    .forEach((userItem) => {
      const firstCharacter = getFirstCharacter(userItem.name);

      if (isKoreanCharacter(firstCharacter)) {
        UserItemMatrix[0].push(userItem);
        return;
      }

      if (isEnglishCharacter(firstCharacter)) {
        UserItemMatrix[1].push(userItem);
        return;
      }

      if (isSpecialCharacter(firstCharacter)) {
        UserItemMatrix[2].push(userItem);
        return;
      }
    });

  return UserItemMatrix;
};
