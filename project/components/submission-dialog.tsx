"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { uiLabel } from "@/lib/ui-language";
import { Submissions } from "./submissions";
import { UiText } from "./ui-text";
import styles from "./submissions.module.css";

export function SubmissionDialog() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const show = useCallback(() => { setStarted(true); setOpen(true); }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (!/^\/library\/?$/.test(url.pathname) || url.searchParams.get("submit") !== "1") return;
    url.searchParams.delete("submit");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    show();
  }, [show]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLElement>("textarea")?.focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`site-nav__submission ${styles.trigger}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={show}
        {...uiLabel("投稿", "Submit")}
      >
        <svg className={`site-nav__icon ${styles.triggerIcon}`} aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </svg>
        <UiText zh="投稿" en="Submit" />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="submission-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.panel}>
          <header className={styles.head}>
            <div className={styles.headText}>
              <h2 id="submission-dialog-title" className={styles.title}>
                <UiText zh="投稿" en="Submissions" />
              </h2>
              <p className={styles.lede}>
                <UiText
                  zh="留下想分享的文字或链接。投稿仅你和管理员可见；已采用表示决定使用素材，不会自动发布，管理员会另行整理与复核。"
                  en="Leave a note or a link you would like to share. Only you and administrators can see submissions. Adoption means the material will be used, not published automatically; an administrator will review it separately."
                />
              </p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={close}
              {...uiLabel("关闭", "Close")}
            >
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>
          {started && <Submissions />}
        </div>
      </dialog>
    </>
  );
}
