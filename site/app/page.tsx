import IconImage from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex flex-1 flex-col items-center justify-center space-y-5">
        <Image
          src={IconImage}
          alt="Lapse Icon"
          className="rounded-[20%] border border-border bg-black shadow-lg shadow-primary/15"
          priority
        />

        <h1 className="text-7xl font-black tracking-tight">Lapse</h1>

        <p className="text-center text-3xl font-bold tracking-tight">
          Gain perspective on your time
        </p>

        <p className="text-muted-foreground">Coming to App Stores soon</p>

        <Link
          href="https://github.com/midzdotdev/lapse"
          aria-label="View Lapse on GitHub"
          className="flex flex-row rounded-full p-1 outline outline-0 transition-all hover:outline-2"
        >
          <FaGithub className="size-8" />
        </Link>
      </section>

      <section className="my-3 flex flex-row justify-center space-x-1 px-3">
        <Link href="/privacy-policy" className="text-secondary-foreground">
          Privacy Policy
        </Link>
      </section>
    </main>
  );
}
