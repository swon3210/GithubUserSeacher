import { ErrorText } from "../../constants/error";
import type { Container } from "../../types";
import {
  appendChildren,
  createComponent,
  delegateEvent,
} from "../../utils/component";
import TabIndicator from "../@stateless/Tab/TabIndicator/TabIndicator";
import TabItem from "../@stateless/Tab/TabItem/TabItem";

import "./Tabs.scss";

interface TabsContainer extends Container {}

interface Props {
  tabs: string[];
  className?: string;
  onTabChange?: (tabIndex: number) => void;
}

const DEFAULT_CLASS_NAME = "tabs";

export default class Tabs implements TabsContainer {
  component: HTMLElement;
  private $$tabItems: HTMLElement[];
  private $tabIndicator: HTMLElement;
  private tabIndex: number = 0;
  private tabs: string[];
  private className?: string;
  private onTabChange?: (tabIndex: number) => void;

  constructor({ tabs, className, onTabChange }: Props) {
    this.tabs = tabs;
    this.className = className;
    this.component = createComponent({
      tagType: "div",
      defaultClassName: DEFAULT_CLASS_NAME,
      className: this.className,
    });
    this.onTabChange = onTabChange;

    this.$$tabItems = this.tabs.map((tab, index) =>
      TabItem({
        text: tab,
        componentId: String(index),
      })
    );
    this.$tabIndicator = TabIndicator({
      tabItemCount: this.tabs.length,
    });

    this.renderComponent();
    this.setEvents();
  }

  private renderComponent() {
    appendChildren(this.component, this.$$tabItems);
    appendChildren(this.component, this.$tabIndicator);
  }

  private setEvents() {
    this.component.addEventListener("click", ({ target }) => {
      this.$$tabItems.forEach(($tab, index) => {
        const componentId = $tab.dataset.componentId;

        if (!componentId) {
          return;
        }

        delegateEvent(target, {
          componentId: componentId,
          callback: () => {
            this.changeTabIndex(index);
            this.onTabChange && this.onTabChange(this.tabIndex);
          },
        });
      });
    });
  }

  private changeTabIndex(index: number) {
    if (index < 0 || index >= this.tabs.length) {
      throw Error(ErrorText.TAB_INDEX_OUT_OF_RANGE);
    }

    if (this.tabIndex === index) {
      return;
    }

    this.tabIndex = index;
    this.switchTab();
  }

  private switchTab() {
    this.$tabIndicator.style.transform = `translateX(${100 * this.tabIndex}%)`;
  }
}
