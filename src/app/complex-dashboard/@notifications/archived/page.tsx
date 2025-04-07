import {Card} from "@/app/components/card";
import Link from "next/link";


const ArchivedNotifications = () => {
  return (
    <Card>
      <div>
      <h1>Archived Notifications</h1>
      <Link href ="/complex-dashboard" className="underline">default notifications </Link>
      </div>
    </Card>
  )
}

export default ArchivedNotifications
