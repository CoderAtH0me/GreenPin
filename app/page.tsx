import Header from "@/components/header";
import Features from "@/components/sections/features";

import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();
  return (
    <>
      <Header user={user} />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Features />
      </main>
    </>
  );
}
