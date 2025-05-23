import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
const Panel = ({ title, className, children }: Props) => {
  return (
    <div
      className={cn(
        "mb-5 flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5",
        className,
      )}
    >
      {title && <span className="font-medium">{title}</span>}
      {children}
    </div>
  );
};

export default Panel;
