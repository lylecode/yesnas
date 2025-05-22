import { IconType } from "react-icons";

interface Props {
  title: string;
  address: string;
  icon: IconType;
}
const NetworkStorageCard = ({ title, address, icon: Icon }: Props) => {
  return (
    <div className="flex flex-row items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 pr-5 text-sm">
      <Icon className="text-4xl" />
      <ul className="flex flex-col gap-1">
        <li className="font-medium">{title}</li>
        <li>{address}</li>
      </ul>
    </div>
  );
};

export default NetworkStorageCard;
