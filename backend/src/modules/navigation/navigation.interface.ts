export interface NavigationMenuItemInput {
  id?: string;
  label: string;
  url: string;
  target?: string;
  order?: number;
  iconName?: string | null;
  badgeText?: string | null;
  badgeColor?: string | null;
  description?: string | null;
  isVisible?: boolean;
  children?: NavigationMenuItemInput[];
}

export interface CreateMenuPayload {
  name: string;
  location: string;
}

export interface UpdateMenuPayload {
  name?: string;
  isPublished?: boolean;
}

export interface SaveMenuItemsPayload {
  items: NavigationMenuItemInput[];
}

