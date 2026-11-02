"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function DonateButton() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setShowQr(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open, close]);

  return (
    <div className="donate">
      <button
        ref={triggerRef}
        type="button"
        className="donate__trigger"
        {...uiLabel("支持本站")}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 9h12v4.5A5.5 5.5 0 0 1 10.5 19h-1A5.5 5.5 0 0 1 4 13.5Z" />
          <path d="M16 10.5h1.4a2.75 2.75 0 0 1 0 5.5H16" />
          <path d="M8 6.2c.9-.9.9-2 0-2.7M12 6.2c.9-.9.9-2 0-2.7" />
        </svg>
      </button>
      <span className="donate__tip" aria-hidden="true">
        <UiText zh="支持本站" />
      </span>

      {mounted && open
        ? createPortal(
            <div
              className="donate-modal"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                className="donate-modal__panel"
                role="dialog"
                aria-modal="true"
                {...uiLabel("感谢你的支持")}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className="donate-modal__close"
                  {...uiLabel("关闭")}
                  onClick={close}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>

                <p className="donate-modal__eyebrow"><UiText zh="支持本站" /></p>

                <h2 id="donate-title" className="donate-modal__title" {...uiLabel("感谢你的支持")}>
                  <UiText zh="感谢你的支持" />
                </h2>

                <p className="donate-modal__copy">
                  <UiText zh="本站笔记内容将会持续更新与完善。制作不易，如果这些内容对你有帮助，欢迎打赏支持。谢谢！" />
                </p>

                <button
                  type="button"
                  className="donate-modal__pay"
                  aria-expanded={showQr}
                  aria-controls="donate-qr"
                  onClick={() => setShowQr((value) => !value)}
                >
                  <UiText zh="支持一下" />
                </button>

                <div id="donate-qr" className="donate-modal__qr" hidden={!showQr}>
                  <img
                    src="/images/wechat-pay.png"
                    alt="微信支付收款码"
                    data-ui-alt-zh="微信支付收款码"
                    data-ui-alt-en="WeChat Pay QR code"
                    width={876}
                    height={985}
                  />
                  <p className="donate-modal__qr-note">
                    <UiText zh="打开微信扫一扫" />
                  </p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
