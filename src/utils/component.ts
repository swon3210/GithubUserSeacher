import { ErrorText } from "../constants/error";
import { addElementToStore } from "../store/elementStore";
import { ComponentProps } from "../types";

interface initialComponentProps extends ComponentProps {
  tagType: keyof HTMLElementTagNameMap;
  defaultClassName: string;
}

interface eventDelegatorProps {
  componentId: string;
  callback: Function;
}

export const createComponent = <ElementType extends HTMLElement>(
  { tagType, componentId, defaultClassName, className }: initialComponentProps,
  callback?: (element: ElementType) => ElementType
) => {
  const element = document.createElement(tagType) as ElementType;

  initComponent(element, {
    componentId,
    defaultClassName: defaultClassName,
    className,
  });

  if (!callback) {
    return element;
  }

  return callback(element);
};

export const initComponent = (
  element: HTMLElement,
  {
    componentId,
    defaultClassName,
    className = "",
  }: Omit<initialComponentProps, "tagType">
) => {
  if (defaultClassName === className) {
    throw Error(ErrorText.SAME_WITH_DEFAULT_CLASS_NAME);
  }

  if (componentId) {
    element.dataset.componentId = componentId;
    addElementToStore(componentId, element);
  }

  element.className = `${defaultClassName} ${className}`;
};

export const delegateEvent = (
  target: Event["target"],
  { componentId, callback }: eventDelegatorProps
) => {
  if (!(target instanceof HTMLElement)) {
    throw Error(ErrorText.WRONG_EVENT_BINDING);
  }

  if (target.dataset.componentId === componentId) {
    callback();
  }
};

export const appendChildren = (
  element: HTMLElement,
  children: HTMLElement | HTMLElement[]
) => {
  if (!Array.isArray(children)) {
    element.appendChild(children);
    return;
  }

  children.forEach((child) => {
    element.appendChild(child);
  });
};

/** 주의! inlineSVGText 는 웹팩의 url-loader 를 활용해서 가져온 svg 파일의 내용에 한합니다. */
export const getSVG = (inlineSVGText: string) => {
  const SVG = inlineSVGText.replace("data:image/svg+xml,", "");

  return SVG;
};
