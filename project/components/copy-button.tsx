"use client";

import { useEffect, useRef, useState } from "react";
import { UiText } from "./ui-text";

export function CopyButton({ value }: { value: string }) {
  return <ClipboardButton key={value} value={value} />;
}

function ClipboardButton({ value }: { value: string }) {
  const [status, setStatus] = useState<"" | "copied" | "error">("");
  const sequence = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    setStatus("");
    return () => {
      sequence.current++;
      clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    const attempt = ++sequence.current;
    clearTimeout(timer.current);
    setStatus("");
    try {
      await navigator.clipboard.writeText(value);
      if (attempt !== sequence.current) return;
      setStatus("copied");
      timer.current = setTimeout(() => setStatus(""), 2000);
    } catch {
      if (attempt === sequence.current) setStatus("error");
    }
  }

  return <span className="copy-control">
    <button type="button" onClick={() => void copy()}>
      {status === "copied" ? <UiText zh="复制成功" en="Copied" /> : <UiText zh="复制" en="Copy" />}
    </button>
    <span role="status" className={status === "error" ? "copy-control__error" : "reader-sr-only"}>
      {status === "copied" && <UiText zh="复制成功" en="Copied successfully" />}
      {status === "error" && <UiText zh="复制失败，请选中邀请码或凭据手动复制。" en="Copy failed. Select the code or credential and copy it manually." />}
    </span>
  </span>;
}
