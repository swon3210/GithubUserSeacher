import Text from "../../components/@stateless/Text/Text";
import Tabs from "../../components/Tabs/Tabs";
import { TABS } from "../../constants/layout";
import type { Container } from "../../types";
import "./Header.scss";

interface HeaderContainer extends Container {}

export default class Header implements HeaderContainer {
  component: HTMLElement;

  constructor() {
    this.component = document.createElement("header");
    this.component.appendChild(
      Text({
        type: "h1",
        className: "header__title",
        text: "Github Stars",
      })
    );

    const tabItems = TABS.map((tab) => ({
      componentId: tab,
      text: tab,
    }));

    const tabs = new Tabs(tabItems);

    this.component.appendChild(tabs.component);
  }
}
