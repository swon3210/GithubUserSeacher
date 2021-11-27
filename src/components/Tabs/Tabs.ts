import { ErrorText } from "../../constants/error";
import type { ComponentProps, Container } from "../../types";
import {
  appendChildren,
  createComponent,
  delegateEvent,
} from "../../utils/component";
import TabIndicator from "../@stateless/Tab/TabIndicator/TabIndicator";
import TabItem, {
  Props as TabItemProps,
} from "../@stateless/Tab/TabItem/TabItem";

import "./Tabs.scss";

type TabItem = ComponentProps & TabItemProps;

interface TabsContainer extends Container {}

const DEFAULT_CLASS_NAME = "tabs";

export default class Tabs implements TabsContainer {
  component: HTMLElement;
  private $$tabs: HTMLElement[];
  private $tabIndicator: HTMLElement;
  private tabIndex: number = 0;
  private tabs: TabItem[];
  private className?: string;

  constructor(tabs: TabItem[], className?: string) {
    this.tabs = tabs;
    this.className = className;
    this.component = createComponent({
      tagType: "div",
      defaultClassName: DEFAULT_CLASS_NAME,
      className: this.className,
    });

    this.$$tabs = this.tabs.map((tab) => TabItem(tab));
    this.$tabIndicator = TabIndicator({
      tabItemCount: this.tabs.length,
    });

    this.renderComponent();
    this.setEvents();
  }

  private renderComponent() {
    appendChildren(this.component, this.$$tabs);
    appendChildren(this.component, this.$tabIndicator);
  }

  private setEvents() {
    this.component.addEventListener("click", ({ target }) => {
      this.$$tabs.forEach(($tab, index) => {
        const componentId = $tab.dataset.componentId;

        if (!componentId) {
          return;
        }

        delegateEvent(target, {
          componentId: componentId,
          callback: () => this.changeTabIndex(index),
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
