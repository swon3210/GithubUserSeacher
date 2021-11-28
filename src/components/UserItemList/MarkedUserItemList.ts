import { ErrorText } from "../../constants/error";
import {
  hasMarkedUserItem,
  addMarkedUserItem,
  removeMarkedUserItem,
  getMarkedUserItems,
} from "../../services/markedUserItem";
import { getSortedUserItemMatrix } from "../../services/userItem";
import type { Container, UserItem } from "../../types";
import { getFirstCharacter } from "../../utils/character";
import {
  appendChildren,
  createComponent,
  delegateEvent,
} from "../../utils/component";
import HeaderLine from "../@stateless/HeaderLine/HeaderLine";
import Icon from "../@stateless/Icon/Icon";
import ListItem from "../@stateless/ListItem/ListItem";

import "./UserItemList.scss";

interface MarkedUserItemListContainer extends Container {}

interface Props {
  className?: string;
}

const DEFAULT_CLASS_NAME = "user-item-list";
const USER_ITEM_CLASS_NAME = "user-item";

const getUserListItemId = (componentId: string) => `user-${componentId}`;

export default class MarkedUserItemList implements MarkedUserItemListContainer {
  component: HTMLElement;
  private className?: string;
  private $$userItems: HTMLElement[];

  constructor({ className }: Props) {
    this.className = className;
    this.component = createComponent({
      tagType: "ul",
      defaultClassName: DEFAULT_CLASS_NAME,
    });

    this.$$userItems = getMarkedUserItems().map((userItem) =>
      ListItem({
        componentId: getUserListItemId(userItem.name),
        className: hasMarkedUserItem(userItem.name)
          ? `${USER_ITEM_CLASS_NAME} marked`
          : USER_ITEM_CLASS_NAME,
        text: userItem.name,
        rightContent: Icon({ iconType: "star" }),
        thumbnailUrl: userItem.profileImage,
      })
    );

    this.renderComponent();
    this.setEvents();
  }

  renderComponent() {
    this.component.innerHTML = "";
    this.renderUserItemsWithHeaderLine(getMarkedUserItems());
  }

  filterUserItems(userName: string) {
    const filteredUserItems = getMarkedUserItems().filter((userItem) =>
      userItem.name.includes(userName)
    );

    this.component.innerHTML = "";
    this.renderUserItemsWithHeaderLine(filteredUserItems);
  }

  private renderUserItemsWithHeaderLine(userItems: UserItem[]) {
    const sortedUserItemMatrix = getSortedUserItemMatrix(userItems);
    const sortedUserItems = sortedUserItemMatrix.reduce(
      (acc, userItems) => acc.concat(userItems),
      []
    );

    let firstCharacter: string;

    sortedUserItems.forEach((userItem) => {
      const userNameFirstCharacter = getFirstCharacter(
        userItem.name
      ).toLowerCase();
      if (firstCharacter !== userNameFirstCharacter) {
        firstCharacter = userNameFirstCharacter;
        appendChildren(
          this.component,
          HeaderLine({
            letter: userNameFirstCharacter,
            className: "user-name-header-line",
          })
        );
      }

      const $userListItem = ListItem({
        componentId: getUserListItemId(userItem.name),
        className: hasMarkedUserItem(userItem.name)
          ? `${USER_ITEM_CLASS_NAME} marked`
          : USER_ITEM_CLASS_NAME,
        text: userItem.name,
        rightContent: Icon({ iconType: "star" }),
        thumbnailUrl: userItem.profileImage,
      });

      this.$$userItems.push($userListItem);
      this.component.appendChild($userListItem);
    });
  }

  private toggleUserMark(userName: string) {
    const targetUser = getMarkedUserItems().find(
      (user) => user.name === userName
    );
    const $targetUserItem = this.$$userItems.find(($userItem) => {
      return $userItem.dataset.componentId === getUserListItemId(userName);
    });

    if (!targetUser || !$targetUserItem) {
      throw Error(ErrorText.WRONG_USER_ITEM_CLICKED);
    }

    targetUser.isMarked
      ? removeMarkedUserItem(targetUser.name)
      : addMarkedUserItem(targetUser);

    this.renderComponent();
  }

  private setEvents() {
    this.component.addEventListener("click", ({ target }) => {
      getMarkedUserItems().forEach((user) => {
        delegateEvent(target, {
          componentId: getUserListItemId(user.name),
          callback: () => this.toggleUserMark(user.name),
        });
      });
    });
  }
}
