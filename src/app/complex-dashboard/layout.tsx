//layout of the complex dashboard
export default function ComplexDashboardLayout({
  children, // will be a page or nested layout
  users,
  revenue,
    notifications,
    login,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
    notifications: React.ReactNode;
    login: React.ReactNode;
}) {
    const isLoggedIn = true;

  return isLoggedIn ?(
    <div>
    <div>{children}</div>
    <div className="flex">
      <div className="flex flex-col">
        <div>{users}</div>
        <div>{revenue}</div>
      </div>
      <div style={{ display: "flex", flex: 1 }}>{notifications}</div>
    </div>
  </div>
) : (
  login
);
}