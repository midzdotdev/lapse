import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import IconImage from "./icon.svg";

export default function Home() {
  return (
    <main className="bg-neutral-950">
      <section className="flex min-h-screen flex-col items-center justify-center">
        <Image
          src={IconImage}
          alt="Lapse Icon"
          className="my-5 rounded-[20%] border border-white/15 bg-black shadow-xl shadow-white/10"
        />

        <h1 className="my-3 text-7xl font-black tracking-tight">Lapse</h1>

        <p className="my-3 text-3xl font-bold tracking-tight text-neutral-100">
          Gain perspective on your time
        </p>

        <p className="my-1 font-light text-neutral-500">
          Coming to App Stores soon
        </p>

        <div className="space-4 my-8 flex flex-row">
          <Link
            href="https://github.com/midzdotdev/lapse"
            className="flex flex-row items-center space-x-2 rounded-full border border-white/5 bg-white/10 pr-3"
          >
            <FaGithub className="size-8 rounded-full" />
            <span className="font-mono text-neutral-200">
              /midzdotdev/lapse
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
