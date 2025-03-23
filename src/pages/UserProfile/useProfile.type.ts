import { JSX } from "react";

export type ActiveTab = 'profile' | 'users';
export type MenuItem = {
  id: ActiveTab;
  label: string;
  icon: JSX.Element;
};
