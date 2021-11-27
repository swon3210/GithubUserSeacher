import type { Component } from "../../../types";
import { appendChildren, createComponent } from "../../../utils/component";
import Circle from "../Circle/Circle";
import Text from "../Text/Text";

import "./ListItem.scss";

interface Props {
  thumbnailUrl: string;
  text: string;
  rightContent: HTMLElement;
}

const DEFAULT_CLASS_NAME = "list-item";

const ListItem: Component<Props> = ({
  componentId,
  className,
  thumbnailUrl,
  text,
  rightContent,
}) =>
  createComponent(
    {
      tagType: "div",
      componentId,
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    },
    (element) => {
      const leftContent = createComponent({
        tagType: "div",
        defaultClassName: "list-item__left-content",
      });

      appendChildren(
        leftContent,
        Circle({ className: "list-item__thumbnail", imageUrl: thumbnailUrl })
      );
      appendChildren(leftContent, Text({ type: "span", text }));
      appendChildren(element, leftContent);
      appendChildren(element, rightContent);

      return element;
    }
  );

export default ListItem;
