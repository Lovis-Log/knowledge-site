"use client";

import { UiText } from "@/components/ui-text";
import { uiLabel } from "@/lib/ui-language";
import { api } from "@/lib/api";
import { ReaderLink as Link } from "./navigation-feedback";
import './donate-enhancements.css';

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function DonateButton() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [method, setMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const sending = useRef(false);
  const requestId = useRef('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setShowQr(false);
    setShowNote(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === 'Tab') {
        const controls = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), [tabindex="0"]') ?? []).filter(element => element.getClientRects().length > 0);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
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
                ref={panelRef}
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
                  onClick={() => { setShowQr((value) => !value); setShowNote(false); }}
                >
                  <UiText zh="支持一下" />
                </button>

                <div id="donate-qr" className="donate-modal__qr" hidden={!showQr}>
                  <div className="donate-methods" role="group" {...uiLabel('支付方式', 'Payment method')}>
                    <button type="button" aria-pressed={method === 'wechat'} onClick={() => setMethod('wechat')}><UiText zh="微信" en="WeChat Pay" /></button>
                    <button type="button" aria-pressed={method === 'alipay'} onClick={() => setMethod('alipay')}><UiText zh="支付宝" en="Alipay" /></button>
                  </div>
                  <img
                    src={method === 'wechat' ? '/images/wechat-pay.png' : '/images/alipay.jpg'}
                    alt={method === 'wechat' ? '微信支付收款码 / WeChat Pay QR code' : '支付宝收款码 / Alipay QR code'}
                    width={876}
                    height={985}
                  />
                  <p className="donate-modal__qr-note">
                    {method === 'wechat' ? <UiText zh="打开微信扫一扫" en="Scan with WeChat Pay" /> : <UiText zh="打开支付宝扫一扫" en="Scan with Alipay" />}
                  </p>
                </div>
                {showQr && <button className="donate-note-toggle" type="button" aria-expanded={showNote} aria-controls="donate-note" onClick={() => setShowNote(value => !value)}>
                  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
                  <UiText zh="捎信（可选）" en="Send a note (optional)" />
                </button>}
                {showQr && showNote && <form id="donate-note" className="donate-note" onSubmit={async event => {
                  event.preventDefault();
                  if (sending.current || !note.trim()) return;
                  sending.current = true; setBusy(true); setError('');
                  requestId.current ||= crypto.randomUUID();
                  try {
                    await api('/api/submissions', 'POST', { message: note, url: '', source: 'donation', requestId: requestId.current });
                    setSent(true); setNote(''); requestId.current = '';
                  } catch (caught) { setError((caught as Error).message); }
                  finally { sending.current = false; setBusy(false); }
                }}>
                  <label htmlFor="donate-note-text"><UiText zh="写给站长" en="A note for the author" /></label>
                  <textarea id="donate-note-text" rows={3} maxLength={2000} required value={note} disabled={busy}
                    onChange={event => { setNote(event.target.value); setSent(false); requestId.current = ''; }} />
                  <button type="submit" disabled={busy || !note.trim()}>{busy ? <UiText zh="发送中…" en="Sending…" /> : <UiText zh="发送私密捎信" en="Send private note" />}</button>
                  {sent && <p role="status"><UiText zh="捎信已送达，谢谢你。" en="Your note has been delivered. Thank you." /></p>}
                  {error && <p role="alert">{error} <Link href="/login/" onClick={close}><UiText zh="登录" en="Sign in" /></Link></p>}
                </form>}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
