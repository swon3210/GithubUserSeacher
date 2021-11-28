import { getIcon, IconType } from "../../../assets/svgs";
import type { Component } from "../../../types";
import { createComponent, getSVG } from "../../../utils/component";

interface Props {
  iconType: IconType;
}

const DEFAULT_CLASS_NAME = "icon";

/** Important : 아이콘을 이미지가 아닌 SVG 로 불러올 수 있게 해주는 함수입니다. */
const Icon: Component<Props> = ({ componentId, className, iconType }) =>
  createComponent(
    {
      tagType: "div",
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
      componentId,
    },
    (element) => {
      element.innerHTML = getSVG(getIcon(iconType));

      return element;
    }
  );

export default Icon;
