'use client';

import { SearchProduct } from "./SearchProduct";

export function Header() {
  return (
    <div
      className="p-4 shadow-sm shadow-blue-700"
      style={{ boxShadow: "5px 5px 15px rgba(0,0,0,0.5)" }}
    >
      <SearchProduct />
    </div>
  );
}
