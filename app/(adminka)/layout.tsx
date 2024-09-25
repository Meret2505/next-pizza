import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Adminka",
};

export default function AdminkaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen">Adminka Header Adminka body</main>;
}
