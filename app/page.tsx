import Header from "@/components/header";
import Features from "@/components/sections/features";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Features />
      </main>
    </>
  );
}
