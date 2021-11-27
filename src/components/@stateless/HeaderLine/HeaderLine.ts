import { ErrorText } from "../../../constants/error";
import type { Component } from "../../../types";
import { appendChildren, createComponent } from "../../../utils/component";
import Divider from "../Divider/Divider";
import Text from "../Text/Text";

import "./HeaderLine.scss";

interface Props {
  letter: string;
}

const DEFAULT_CLASS_NAME = "header-line";

const HeaderLine: Component<Props> = ({ componentId, className, letter }) =>
  createComponent(
    {
      tagType: "div",
      componentId,
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    },
    (element) => {
      if (letter.length > 1) {
        throw Error(ErrorText.HEADER_LINE_TEXT_SHOULD_BE_CHARACTER);
      }

      appendChildren(
        element,
        Text({
          type: "span",
          text: letter,
          className: "header-line__text",
        })
      );

      appendChildren(element, Divider({}));

      return element;
    }
  );

export default HeaderLine;
