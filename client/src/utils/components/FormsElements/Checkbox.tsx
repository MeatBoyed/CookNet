"use client";

import { useState } from "react";

export function CheckBox() {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <input
      id="checked-checkbox"
      checked={checked}
      onClick={() => setChecked(!checked)}
      type="checkbox"
      className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
    />
  );
}
