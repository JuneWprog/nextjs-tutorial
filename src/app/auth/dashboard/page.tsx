import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  // console.log({ authObj });
  // console.log({ userObj });

  return (
    <div>
      <h1>Dashboard - check user and auth in console</h1>
      <p>UserId: {authObj.userId}</p>
      <p>FirstName: {userObj?.firstName}</p>
    </div>
  );
}
