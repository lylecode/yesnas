import LocalDirCard from "@/components/file/LocalDirCard";
import LocalStorageCard from "@/components/file/LocalStorageCard";
import NetworkStorageCard from "@/components/file/NetworkStorageCard";
import Container from "@/components/layout/Container";
import { CiMusicNote1 } from "react-icons/ci";
import { GiFilmSpool } from "react-icons/gi";
import { PiFileDocLight } from "react-icons/pi";

const FilePage = () => {
  const localDir = [
    {
      title: "视频",
      size: 128,
      icon: GiFilmSpool,
      progress: 65,
    },
    {
      title: "图片",
      size: 42,
      icon: PiFileDocLight,
      progress: 30,
    },
    {
      title: "文档",
      size: 42,
      icon: PiFileDocLight,
      progress: 30,
    },
    {
      title: "音频",
      size: 18,
      icon: CiMusicNote1,
      progress: 15,
    },
  ];
  const localStorage = [
    {
      title: "视频",
      size: 128,
      icon: GiFilmSpool,
      progress: 65,
      available: 23,
      total: 200,
    },
    {
      title: "图片",
      size: 42,
      icon: PiFileDocLight,
      progress: 30,
      available: 33,
      total: 300,
    },
  ];
  const networkStorage = [
    {
      title: "视频",
      address: "192.168.168.1",
      icon: GiFilmSpool,
    },
    {
      title: "百度",
      address: "http://www.baidu.com",
      icon: GiFilmSpool,
    },
  ];
  return (
    <Container>
      <h2>本地文件</h2>
      <div className="flex flex-wrap gap-4 rounded-lg border border-gray-200 bg-white">
        {localDir.map((m) => (
          <LocalDirCard
            key={m.title}
            title={m.title}
            size={m.size}
            icon={m.icon}
          />
        ))}
      </div>
      <h2 className="mt-12">存储空间</h2>
      <div className="flex gap-4">
        {localStorage.map((m) => (
          <LocalStorageCard
            key={m.title}
            title={m.title}
            available={m.available}
            total={m.total}
            icon={m.icon}
          />
        ))}
      </div>
      <h2 className="mt-12">网络位置</h2>{" "}
      <div className="flex gap-4">
        {networkStorage.map((m) => (
          <NetworkStorageCard
            key={m.title}
            title={m.title}
            address={m.address}
            icon={m.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default FilePage;
