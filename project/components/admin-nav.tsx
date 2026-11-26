import { ReaderLink } from "./navigation-feedback";
import { UiText } from "./ui-text";

const sections = [
  ["users", "用户审核", "User reviews"],
  ["invites", "邀请码", "Invites"],
  ["submissions", "投稿", "Submissions"],
  ["donations", "用户打赏", "User donations"],
] as const;

export function AdminNav({ section }: { section: typeof sections[number][0] }) {
  return <nav className="admin-nav">
    {sections.map(([id, zh, en]) => (
      <ReaderLink key={id} href={`/admin/${id}/`} aria-current={section === id ? "page" : undefined}>
        <UiText zh={zh} en={en} />
      </ReaderLink>
    ))}
  </nav>;
}
