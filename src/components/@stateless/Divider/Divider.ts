import type { Component } from "../../../types";
import { createComponent } from "../../../utils/component";

import "./Divider.scss";

interface Props {}

const DEFAULT_CLASS_NAME = "divider";

const Divider: Component<Props> = ({ componentId, className }) =>
  createComponent({
    tagType: "div",
    componentId,
    defaultClassName: DEFAULT_CLASS_NAME,
    className,
  });

export default Divider;
