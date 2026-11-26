import { AdminNav } from "@/components/admin-nav";
import { PageHeading } from "@/components/page-heading";
import { Submissions } from "@/components/submissions";

export default function Page() {
  return <section className="shell admin-shell">
    <PageHeading kind="users" zh="投稿" en="Submissions" />
    <AdminNav section="submissions" />
    <Submissions mode="submissions" />
  </section>;
}
