import { getIcon, IconType } from "../../../assets/svgs";
import type { Component } from "../../../types";
import { createComponent, getSVG } from "../../../utils/component";

interface Props {
  iconType: IconType;
}

const DEFAULT_CLASS_NAME = "icon";

const Icon: Component<Props> = ({ componentId, className, iconType }) =>
  createComponent(
    {
      tagType: "div",
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
      componentId,
    },
    (element) => {
      console.log("iconType : ", iconType);
      element.innerHTML = getSVG(getIcon(iconType));

      return element;
    }
  );

export default Icon;
