import { IconType } from "react-icons";

interface Props {
  title: string;
  size: number;
  icon: IconType;
}
const LocalDirCard = ({ title, size, icon: Icon }: Props) => {
  return (
    <div className="flex w-32 flex-col items-center gap-2 p-5">
      <Icon className="text-4xl text-red-400" />
      <span>{title}</span>
    </div>
  );
};

export default LocalDirCard;
