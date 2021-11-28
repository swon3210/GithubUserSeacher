import { ErrorText } from "../../constants/error";
import {
  hasMarkedUserItem,
  addMarkedUserItem,
  getMarkedUserItems,
  removeMarkedUserItem,
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

interface UserItemListContainer extends Container {}

interface Props {
  className?: string;
  userItems: UserItem[];
}

const DEFAULT_CLASS_NAME = "user-item-list";
const USER_ITEM_CLASS_NAME = "user-item";

const getUserListItemId = (componentId: string) => `user-${componentId}`;

export default class UserItemList implements UserItemListContainer {
  component: HTMLElement;
  userItems: UserItem[];
  private className?: string;
  private $$userItems: HTMLElement[];

  constructor({ userItems, className }: Props) {
    this.userItems = userItems;
    this.className = className;
    this.component = createComponent({
      tagType: "ul",
      defaultClassName: DEFAULT_CLASS_NAME,
    });

    this.$$userItems = userItems.map((userItem) =>
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

  appendUserItems(userItems: UserItem[]) {
    this.userItems.concat(userItems);
    this.renderComponent();
  }

  removeAllUserItems() {
    this.userItems = [];
    this.$$userItems = [];
    this.component.innerHTML = "";
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
    const targetUser = this.userItems.find((user) => user.name === userName);
    const $targetUserItem = this.$$userItems.find(($userItem) => {
      return $userItem.dataset.componentId === getUserListItemId(userName);
    });

    if (!targetUser || !$targetUserItem) {
      throw Error(ErrorText.WRONG_USER_ITEM_CLICKED);
    }

    targetUser.isMarked = !targetUser.isMarked;

    targetUser.isMarked
      ? addMarkedUserItem(targetUser)
      : removeMarkedUserItem(targetUser.name);

    $targetUserItem.classList.toggle("marked");
  }

  private renderComponent() {
    this.renderUserItemsWithHeaderLine(this.userItems);
  }

  private setEvents() {
    this.component.addEventListener("click", ({ target }) => {
      this.userItems.forEach((user) => {
        delegateEvent(target, {
          componentId: getUserListItemId(user.name),
          callback: () => this.toggleUserMark(user.name),
        });
      });
    });
  }
}
