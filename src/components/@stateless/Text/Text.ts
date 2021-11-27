import type { Component } from "../../../types";
import { createComponent } from "../../../utils/component";

import "./Text.scss";

interface Props {
  type: "h1" | "h2" | "h3" | "p" | "span";
  text: string;
}

const DEFAULT_CLASS_NAME = "text";

const Text: Component<Props> = ({ componentId, className, type, text }) =>
  createComponent(
    {
      tagType: type,
      componentId,
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    },
    (element) => {
      element.innerText = text;

      return element;
    }
  );

export default Text;
