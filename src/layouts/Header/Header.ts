import Text from "../../components/@stateless/Text/Text";
import type { Container } from "../../types";
import { createComponent } from "../../utils/component";
import "./Header.scss";

interface HeaderContainer extends Container {}

const DEFAULT_CLASS_NAME = "header";

export default class Header implements HeaderContainer {
  component: HTMLElement;

  constructor() {
    this.component = createComponent({
      tagType: "header",
      defaultClassName: DEFAULT_CLASS_NAME,
    });
    this.component.appendChild(
      Text({
        type: "h1",
        className: "header__title",
        text: "Github Stars",
      })
    );
  }
}
