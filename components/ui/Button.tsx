import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
  target?: string;
};

export default function Button({
  href,
  children,
  outline,
  target,
}: Props) {
  return (
    <Link
      href={href}
      target={target}
      className={`
        relative overflow-hidden rounded-full
        px-8 py-4 font-bold
        transition-all duration-500
        hover:-translate-y-1 hover:shadow-2xl
        active:scale-95
        group

        ${
          outline
            ? "border-2 border-white text-white hover:bg-white hover:text-ipm-blue"
            : "bg-ipm-green text-white hover:bg-[#009348]"
        }
      `}
    >
      <span className="relative z-10">
        {children}
      </span>

      {/* Shine Effect */}
      <span
        className="
        absolute
        left-[-120%]
        top-0
        h-full
        w-full
        skew-x-12
        bg-white/20
        transition-all
        duration-700
        group-hover:left-[120%]
        "
      />
    </Link>
  );
}