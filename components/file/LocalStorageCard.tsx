import { IconType } from "react-icons";
import { ProgressBar } from "../ProgressBar";

interface Props {
  title: string;
  available: number;
  total: number;
  icon: IconType;
}
const LocalStorageCard = ({ title, available, total, icon: Icon }: Props) => {
  return (
    <div className="flex w-60 flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-sm">
      <Icon className="text-4xl" />
      <ul className="flex flex-col gap-2">
        <li className="font-medium">{title}</li>
        <li>
          <ProgressBar />
        </li>
        <li className="text-xs">
          {available.toFixed(2)} GB 可用，共 {total.toFixed(2)} GB
        </li>
      </ul>
    </div>
  );
};

export default LocalStorageCard;
