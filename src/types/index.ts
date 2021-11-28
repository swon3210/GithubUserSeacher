export interface ComponentProps {
  componentId?: string;
  className?: string;
}

export interface Component<Props, ElementType = HTMLElement> {
  (props: Props & ComponentProps): ElementType;
}

export interface Container<ElementType = HTMLElement> {
  component: ElementType;
}

export interface UserItem {
  profileImage: string;
  name: string;
  isMarked: boolean;
}

