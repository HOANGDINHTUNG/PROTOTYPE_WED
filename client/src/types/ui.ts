export interface NavItem {
  label: string;
  to: string;
  description: string;
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  helper: string;
}

export interface SelectOption<T extends string> {
  label: string;
  value: T;
}
