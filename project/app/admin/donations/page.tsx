import { AdminNav } from "@/components/admin-nav";
import { PageHeading } from "@/components/page-heading";
import { Submissions } from "@/components/submissions";
import { DonationRecords } from "@/components/donation-records";

export default function Page() {
  return <section className="shell admin-shell">
    <PageHeading kind="users" zh="用户打赏" en="User donations" />
    <AdminNav section="donations" />
    <DonationRecords />
    <Submissions mode="donations" />
  </section>;
}
