import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
  span?: 1 | 2 | 3;
}

const Card = ({ children, title, className, span }: Props) => {
  const spanClass = cn({
    "md:col-span-2": span === 2,
    "md:col-span-3": span === 3,
  });

  return (
    <div
      className={cn(
        "flex flex-col",
        "rounded-lg bg-white p-5",
        spanClass,
        className,
      )}
    >
      <div className="mb-5 flex flex-row items-start gap-3">
        <h3 className="text-base">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default Card;
