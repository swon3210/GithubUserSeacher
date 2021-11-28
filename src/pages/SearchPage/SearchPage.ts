import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import Tabs from "../../components/Tabs/Tabs";
import MarkedUserItemList from "../../components/UserItemList/MarkedUserItemList";
import UserItemList from "../../components/UserItemList/UserItemList";
import { ErrorText } from "../../constants/error";
import { TABS } from "../../constants/layout";
import { requestSearchUsers } from "../../requests/github";
import {
  getMarkedUserItems,
  hasMarkedUserItem,
} from "../../services/markedUserItem";
import type { Container, UserItem } from "../../types";
import { appendChildren, createComponent } from "../../utils/component";

import "./SearchPage.scss";

interface SearchPageContainer extends Container {}
interface UserItemListContainer extends Container {
  userItems: UserItem[];
  appendUserItems(userItems: UserItem[]): void;
  removeAllUserItems(): void;
}

export default class SearchPage implements SearchPageContainer {
  component: HTMLElement;
  userListItemComponent: HTMLElement;
  searchInputForm: Container;
  userItemList: UserItemListContainer;
  markedUserItemList: Container & {
    renderComponent(): void;
    filterUserItems(userName: string): void;
  };
  tabs: Container;
  mode: typeof TABS[0] | typeof TABS[1] = TABS[0];

  constructor() {
    this.component = createComponent({
      tagType: "main",
      defaultClassName: "search-page",
    });

    this.searchInputForm = new SearchInputForm({
      className: "user-search-input",
    });

    this.userItemList = new UserItemList({
      userItems: [],
    });

    this.markedUserItemList = new MarkedUserItemList({});

    this.tabs = new Tabs({
      tabs: TABS,
      className: "mode-switch-tabs",
      onTabChange: (tabIndex: number) => {
        this.mode = TABS[tabIndex];
        this.renderUserListByMode();
      },
    });

    this.userListItemComponent = this.userItemList.component;

    this.renderComponent();
    this.setEvents();
  }

  private renderNewUserList(userItems: UserItem[]) {
    this.userItemList.removeAllUserItems();
    this.userItemList.userItems = userItems;
    this.userItemList.appendUserItems(userItems);
  }

  private renderMarkedUserList() {
    this.markedUserItemList.renderComponent();
  }

  private renderUserListByMode() {
    if (this.mode === TABS[0]) {
      this.component.removeChild(this.markedUserItemList.component);
      this.component.appendChild(this.userItemList.component);
      const newUserItems = this.userItemList.userItems.map((userItem) => ({
        ...userItem,
        isMarked: hasMarkedUserItem(userItem.name) ? true : false,
      }));
      this.renderNewUserList(newUserItems);
      return;
    }

    if (this.mode === TABS[1]) {
      this.component.removeChild(this.userItemList.component);
      this.component.appendChild(this.markedUserItemList.component);
      this.renderMarkedUserList();
      return;
    }
  }

  private renderComponent() {
    appendChildren(this.component, this.tabs.component);
    appendChildren(this.component, this.searchInputForm.component);
    appendChildren(this.component, this.userListItemComponent);
  }

  private setEvents() {
    this.setSearchInputEvent();
  }

  private setSearchInputEvent() {
    this.searchInputForm.component.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!("input" in event.target!)) {
        return;
      }

      const $input = event.target["input"] as unknown;

      if (!($input instanceof HTMLInputElement)) {
        return;
      }

      const inputValue = $input.value;

      if (inputValue.length > 100) {
        throw Error(ErrorText.SEARCH_NAME_LENGTH_LIMIT_EXCEEDED);
      }

      if (this.mode === TABS[0]) {
        try {
          const userItems = await requestSearchUsers(inputValue);
          this.renderNewUserList(userItems);
          $input.value = "";
        } catch (error: unknown) {
          alert("검색 요청에 실패하였습니다.");
        }

        return;
      }

      if (this.mode === TABS[1]) {
        this.markedUserItemList.filterUserItems(inputValue);
        $input.value = "";
      }
    });
  }
}
