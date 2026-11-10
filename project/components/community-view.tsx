"use client";
import { useEffect, useState } from 'react';
import { GuestbookView } from './guestbook';
import { Submissions } from './submissions';
export function CommunityView() { const [sub, setSub] = useState(false); useEffect(() => { const read = () => setSub(location.hash === '#submissions'); read(); window.addEventListener('hashchange', read); return () => window.removeEventListener('hashchange', read); }, []); return <><nav className="shell feature-tabs" aria-label="交流 / Community"><a href="#messages" aria-current={!sub ? 'page' : undefined} onClick={() => setSub(false)}>留言 / Messages</a><a href="#submissions" aria-current={sub ? 'page' : undefined} onClick={() => setSub(true)}>投稿 / Submissions</a></nav>{sub ? <div className="shell"><Submissions /></div> : <GuestbookView />}</>; }
