import { ErrorText } from "../constants/error";

enum KOREAN_CONSONANTS {
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
}

export const isKoreanCharacter = (character: string) => {
  return !!character.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g);
};

export const isEnglishCharacter = (character: string) => {
  return !!character.match(/[a-zA-Z]/g);
};

export const isSpecialCharacter = (character: string) => {
  return !!character.match(/[~!@#\#$%<>^&*]/g);
};

const getKoreanConsonant = (text: string) => {
  const code = text.charCodeAt(0) - 44032;

  if (code <= -1 || code > 11172) {
    throw Error(ErrorText.CANNOT_FIND_KOREAN_CONSONANT);
  }

  return KOREAN_CONSONANTS[Math.floor(code / 588)];
};

export const getFirstCharacter = (text: string) => {
  const [firstCharacter] = text;

  if (isKoreanCharacter(firstCharacter)) {
    return getKoreanConsonant(firstCharacter);
  }

  return firstCharacter;
};
