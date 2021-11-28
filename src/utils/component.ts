import { ErrorText } from "../constants/error";
import { ComponentProps } from "../types";

interface initialComponentProps extends ComponentProps {
  tagType: keyof HTMLElementTagNameMap;
  defaultClassName: string;
}

interface eventDelegatorProps {
  componentId: string;
  callback: Function;
}

/** Important : stateless 컴포넌트를 만드는데 사용되는 메서드입니다. 두번째 인자로 함수를 받을 수 있게 해서
 * element 를 createComponent 를 호출하는 측에서 구성할 수 있도록 신경썼습니다. */
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
  }

  element.className = `${defaultClassName} ${className}`;
};

export const delegateEvent = (
  target: Event["target"],
  { componentId, callback }: eventDelegatorProps
) => {
  if (!(target instanceof HTMLElement) && !(target instanceof SVGElement)) {
    throw Error(ErrorText.WRONG_EVENT_BINDING);
  }

  if (target.dataset.componentId === componentId) {
    callback();
    return;
  }

  const $closest = target.closest(`[data-component-id="${componentId}"]`);

  if (!($closest instanceof HTMLElement)) {
    return;
  }

  if ($closest.dataset.componentId === componentId) {
    callback();
    return;
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

/** Important : 주의! inlineSVGText 는 웹팩의 url-loader 를 활용해서 가져온 svg 파일의 내용에 한합니다. */
export const getSVG = (inlineSVGText: string) => {
  const SVG = inlineSVGText.replace("data:image/svg+xml,", "");

  return SVG;
};
