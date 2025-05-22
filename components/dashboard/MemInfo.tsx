"use client";

import { useEffect, useRef, useState } from "react";

const MemInfo = () => {
  const [lineCount, setLineCount] = useState(100);
  const [redRatio, setRedRatio] = useState(0.3); // 初始比例30%

  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setLineCount(Math.floor(width / 6)); // 每4px一条线
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 生成0.1到0.5之间的随机比例（10%到50%）
      const newRatio = 0.1 + Math.random() * 1;
      console.log(newRatio);
      setRedRatio(newRatio);
    }, 11000); // 1000毫秒 = 1秒

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="space-y-2">
        <div ref={containerRef} className="flex flex-row justify-between">
          {Array.from({ length: lineCount }).map((_, index) => {
            // 计算30%的索引位置
            const isRed = index < lineCount * redRatio;

            return (
              <div
                key={index}
                className={`h-4 w-1 rounded-sm ${
                  isRed ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="flex flex-row justify-between">
          <span>内存</span>
          <span>{redRatio}M / 3.32G</span>
        </div>
      </div>
    </div>
  );
};

export default MemInfo;
