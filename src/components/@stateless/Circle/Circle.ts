import type { Component } from "../../../types";
import { initComponent } from "../../../utils/component";

import AnonymousUserPNG from "../../../assets/images/anonymous-user.png";
import "./Circle.scss";

interface Props {
  imageUrl?: string;
}

const DEFAULT_CLASS_NAME = "circle";

const Circle: Component<Props> = ({
  componentId,
  className,
  imageUrl = AnonymousUserPNG,
}) => {
  const element = document.createElement("div");

  initComponent(element, {
    componentId,
    defaultClassName: DEFAULT_CLASS_NAME,
    className,
  });

  element.style.backgroundImage = `url("${imageUrl}")`;

  return element;
};

export default Circle;
