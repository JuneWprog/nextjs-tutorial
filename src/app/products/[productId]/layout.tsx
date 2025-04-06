
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
            <h1 className="text-blue-600 text-3xl">Layout Apply to productId pages</h1>
            {children}

    </div>

  );
}
