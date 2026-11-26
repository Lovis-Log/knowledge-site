"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { RocketLoader } from "./rocket-loader";
import { errorMessage, isAuthError, SessionRecovery } from "./session-recovery";
import { UiText } from "./ui-text";
import styles from "./submissions.module.css";

type Donation = { id: number; donor: string; amountFen: number; createdAt: number };
type DonationPage = { items: Donation[]; next: number | null };

const yuan = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" });

export function DonationRecords() {
  const [ledger, setLedger] = useState<DonationPage | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ message: string; authExpired: boolean } | null>(null);
  const requestId = useRef("");
  const saving = useRef(false);
  const before = pages.at(-1);

  function showError(caught: unknown) {
    setError({ message: errorMessage(caught), authExpired: isAuthError(caught) });
  }

  useEffect(() => {
    let active = true;
    setLedger(null);
    api<DonationPage>("/api/admin/donations" + (before ? `?before=${before}` : ""))
      .then((result) => { if (active) setLedger(result); })
      .catch((caught: unknown) => { if (active) showError(caught); });
    return () => { active = false; };
  }, [before, revision]);

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving.current) return;
    const form = event.currentTarget;
    const { donor, amount } = Object.fromEntries(new FormData(form));
    saving.current = true;
    setBusy(true);
    setError(null);
    requestId.current ||= crypto.randomUUID();
    try {
      await api("/api/admin/donations", "POST", { donor, amount, requestId: requestId.current });
      requestId.current = "";
      form.reset();
      setPages([]);
      setRevision((value) => value + 1);
    } catch (caught) {
      showError(caught);
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  function reload() {
    setError(null);
    setRevision((value) => value + 1);
  }

  return <section aria-labelledby="donation-records-title">
    <h2 id="donation-records-title"><UiText zh="打赏记录" en="Donation records" /></h2>
    <form className={styles.form} onSubmit={add} onChange={() => { requestId.current = ""; }}>
      <label className={styles.field}>
        <span className={styles.label}><UiText zh="打赏人" en="Donor" /></span>
        <input name="donor" required maxLength={100} disabled={busy} />
      </label>
      <label className={styles.field}>
        <span className={styles.label}><UiText zh="金额（人民币）" en="Amount (CNY)" /></span>
        <input name="amount" type="number" inputMode="decimal" min="0.01" max="9999999.99" step="0.01" required disabled={busy} />
      </label>
      <div className={styles.footer}>
        <button type="submit" className={styles.submit} disabled={busy || error?.authExpired}>
          {busy ? <UiText zh="保存中…" en="Saving…" /> : <UiText zh="添加打赏记录" en="Add donation" />}
        </button>
      </div>
    </form>
    {error && (error.authExpired ? <SessionRecovery error={error.message} onRetry={reload} /> :
      <p className={styles.error} role="alert">{error.message}{" "}
        {!ledger && <button type="button" onClick={reload}><UiText zh="重试" en="Retry" /></button>}
      </p>)}
    {ledger ? <>
      {ledger.items.length === 0 ? <p className={styles.empty}><UiText zh="暂无打赏记录" en="No donations recorded" /></p> :
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr>
            <th scope="col"><UiText zh="打赏人" en="Donor" /></th>
            <th scope="col"><UiText zh="金额" en="Amount" /></th>
            <th scope="col"><UiText zh="记录时间" en="Recorded at" /></th>
          </tr></thead>
          <tbody>{ledger.items.map((item) => {
            const date = new Date(item.createdAt * 1000);
            return <tr key={item.id}>
              <td>{item.donor}</td>
              <td>{yuan.format(item.amountFen / 100)}</td>
              <td><time dateTime={date.toISOString()}>{date.toLocaleString()}</time></td>
            </tr>;
          })}</tbody>
        </table></div>}
      <div className={styles.pager}>
        <button type="button" className={styles.inlineAction} disabled={busy || !pages.length}
          onClick={() => setPages((value) => value.slice(0, -1))}><UiText zh="上一页" en="Previous" /></button>
        <button type="button" className={styles.inlineAction} disabled={busy || ledger.next === null}
          onClick={() => setPages((value) => [...value, ledger.next!])}><UiText zh="下一页" en="Next" /></button>
      </div>
    </> : !error && <div className={styles.loading}><RocketLoader compact /></div>}
  </section>;
}
