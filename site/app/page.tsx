import IconImage from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <Image
          src={IconImage}
          alt="Lapse Icon"
          className="my-5 rounded-[20%] border border-border bg-black shadow-lg shadow-primary/15"
          priority
        />

        <h1 className="my-3 text-7xl font-black tracking-tight">Lapse</h1>

        <p className="my-3 text-3xl font-bold tracking-tight">
          Gain perspective on your time
        </p>

        <p className="my-1 text-muted-foreground">Coming to App Stores soon</p>

        <div className="space-4 my-8 flex flex-row">
          <Link
            href="https://github.com/midzdotdev/lapse"
            className="flex flex-row items-center space-x-2 rounded-full border-2 pr-3"
          >
            <FaGithub className="size-8 rounded-full" />
            <span className="font-mono font-bold">/midzdotdev/lapse</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
