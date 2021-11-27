export interface ComponentProps {
  componentId?: string;
  className?: string;
}

export interface Component<Props, ElementType = HTMLElement> {
  (props: Props & ComponentProps): ElementType;
}

export interface Container {
  component: HTMLElement;
}
