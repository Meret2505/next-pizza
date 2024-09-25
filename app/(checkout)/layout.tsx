import { Container, Header } from "@/shared/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Корзина",
  description: "Корзина в Next Pizza",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Container>
        <Header
          className=" border-b-gray-200"
          hasSearch={false}
          hasCard={false}
        />
        {children}
      </Container>
    </main>
  );
}