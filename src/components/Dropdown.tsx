import type { ChangeEvent } from "react";

import type { SortType } from "../types";

export type Options = {
  value: SortType | string;
  text: string;
};

type DropdownProps = {
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
  value: SortType | string;
  options: Options[];
};

export default function Dropdown({ onChange, options, value }: DropdownProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="select select-bordered select-sm max-w-xs"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}
