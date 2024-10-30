import IconImage from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 bg-primary-foreground/50 py-4 shadow-md backdrop-blur-md lg:py-8">
        <Link
          className="container flex max-w-3xl flex-row items-center space-x-2 lg:space-x-4"
          href="/"
        >
          <Image
            src={IconImage}
            alt="Lapse Icon"
            className="w-8 rounded-[20%] bg-primary lg:w-12"
            priority
          />
          <h1 className="text-xl font-black tracking-tight lg:text-3xl">
            Lapse
          </h1>
        </Link>
      </header>

      <article className="container max-w-3xl py-6 lg:py-12">
        {children}
      </article>
    </>
  );
}
