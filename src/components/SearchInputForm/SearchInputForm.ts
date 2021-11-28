import type { Container } from "../../types";
import { appendChildren, createComponent } from "../../utils/component";
import Icon from "../@stateless/Icon/Icon";
import Input from "../@stateless/Input/Input";

import "./SearchInputForm.scss";

interface SearchInputFormContainer extends Container {}

interface Props {
  className?: string;
}

const DEFAULT_CLASS_NAME = "search-input-form";

export default class SearchInputForm implements SearchInputFormContainer {
  component: HTMLElement;
  $input: HTMLInputElement;
  private $submitButton: HTMLElement;

  constructor({ className }: Props) {
    this.component = createComponent({
      tagType: "form",
      defaultClassName: DEFAULT_CLASS_NAME,
      className,
    });

    this.$input = Input({
      className: "search-input-form__input",
      placeholder: "검색어를 입력하세요",
      type: "text",
    });

    this.$input.name = "input";

    this.$submitButton = createComponent({
      tagType: "button",
      defaultClassName: "search-input-form__submit-button",
    });

    appendChildren(
      this.$submitButton,
      Icon({
        iconType: "search",
        className: "search-icon",
      })
    );

    this.renderComponent();
  }

  private renderComponent() {
    appendChildren(this.component, this.$input);
    appendChildren(this.component, this.$submitButton);
  }
}
