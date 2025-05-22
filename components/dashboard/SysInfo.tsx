const SysInfo = () => {
  return (
    <div>
      <div className="space-y-2 ">
        <div className="flex justify-between">
          <span>最近使用</span>
          <span className="font-medium">YESNAS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">运行时间</span>
          <span className="font-medium">7天23小时</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">当前负载</span>
          <span className="font-medium">3.0</span>
        </div>
      </div>
    </div>
  );
};

export default SysInfo;
