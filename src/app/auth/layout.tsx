import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "./components/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <Navigation />
          {children}
    </ClerkProvider>
  );
}