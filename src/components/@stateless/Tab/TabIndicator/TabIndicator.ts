import type { Component } from "../../../../types";
import { createComponent } from "../../../../utils/component";

import "./TabIndicator.scss";

export interface Props {
  tabItemCount: number;
}

const DEFAULT_CLASS_NAME = "tab-indicator";

const TabIndicator: Component<Props> = ({
  componentId,
  className,
  tabItemCount,
}) =>
  createComponent(
    {
      tagType: "div",
      componentId,
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    },
    (element) => {
      element.style.width = `${100 / tabItemCount}%`;

      return element;
    }
  );

export default TabIndicator;
