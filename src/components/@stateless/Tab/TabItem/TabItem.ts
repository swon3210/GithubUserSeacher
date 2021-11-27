import { ErrorText } from "../../../../constants/error";
import type { Component } from "../../../../types";
import { createComponent } from "../../../../utils/component";

import "./TabItem.scss";

export interface Props {
  text: string;
}

const DEFAULT_CLASS_NAME = "tab-item";

const TabItem: Component<Props> = ({ componentId, className, text }) =>
  createComponent(
    {
      tagType: "button",
      componentId,
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    },
    (element) => {
      element.innerText = text;

      return element;
    }
  );

export default TabItem;
