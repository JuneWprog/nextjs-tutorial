import {Card} from "@/app/components/card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div className="flex flex-col">
      <div>Notifications</div>
        <Link href="/complex-dashboard/archived" className="underline">Archived</Link>
      </div>
    </Card>
  );
}