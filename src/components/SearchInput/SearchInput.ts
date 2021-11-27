import type { Container } from "../../types";
import {
  appendChildren,
  createComponent,
  delegateEvent,
} from "../../utils/component";
import Icon from "../@stateless/Icon/Icon";
import Input from "../@stateless/Input/Input";

import "./SearchInput.scss";

interface SearchInputContainer extends Container {}

interface Props {
  className?: string;
}

const DEFAULT_CLASS_NAME = "search-input-wrapper";

export default class SearchInput implements SearchInputContainer {
  component: HTMLElement;
  private $input: HTMLInputElement;
  private $icon: HTMLElement;

  constructor({ className }: Props) {
    this.component = createComponent({
      tagType: "div",
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    });

    this.$input = Input({
      className: "search-input",
      placeholder: "검색어를 입력하세요",
    });

    this.$icon = Icon({
      iconType: "search",
      className: "search-icon",
    });

    this.renderComponent();
  }

  private renderComponent() {
    appendChildren(this.component, this.$input);
    appendChildren(this.component, this.$icon);
  }
}
