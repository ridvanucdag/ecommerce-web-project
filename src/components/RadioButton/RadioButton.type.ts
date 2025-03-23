export interface RadioProps {
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
}