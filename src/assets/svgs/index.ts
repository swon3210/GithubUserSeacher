import star from "./star.svg";
import search from "./search.svg";

const Icons = {
  star,
  search,
};

export type IconType = keyof typeof Icons;

export const getIcon = (iconType: IconType) => Icons[iconType];
