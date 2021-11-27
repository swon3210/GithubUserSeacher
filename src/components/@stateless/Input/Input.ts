import type { Component } from "../../../types";
import { createComponent } from "../../../utils/component";

import "./Input.scss";

interface Props {
  placeholder?: string;
  defaultValue?: string;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

const DEFAULT_CLASS_NAME = "input";

const Input: Component<Props, HTMLInputElement> = ({
  componentId,
  className,
  placeholder,
  defaultValue,
  type = "text",
}) =>
  createComponent(
    {
      tagType: "input",
      componentId,
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    },
    (element) => {
      if (defaultValue) {
        element.defaultValue = defaultValue;
      }

      if (placeholder) {
        element.placeholder = placeholder;
      }

      element.type = type;

      return element;
    }
  );

export default Input;
