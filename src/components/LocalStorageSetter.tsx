"use client";

import { useEffect } from "react";

export default function LocalStorageSetter({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  useEffect(() => {
    localStorage.setItem(key, value);
  });

  return <></>;
}
