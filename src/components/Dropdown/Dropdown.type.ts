export interface DropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}