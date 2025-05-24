"use client";

import CpuInfo from "@/components/dashboard/CpuInfo";
import MemInfo from "@/components/dashboard/MemInfo";
import { NetworkInfo } from "@/components/dashboard/NetworkInfo";
import SysInfo from "@/components/dashboard/SysInfo";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/UICard";

const DashboardPage = () => {
  return (
    <Container title="监控面板">
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card title="系统">
            <SysInfo />
          </Card>
          <Card title="CPU">
            <CpuInfo />
          </Card>
          <Card title="RAM">
            <MemInfo />
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card span={2} title="网络" className="h-80">
            <NetworkInfo />
          </Card>
          <Card title="bbbwww" className="">
            bbbwwwasdfsadfs
          </Card>
        </div>

        <div className="grid h-80 grid-cols-1 gap-5 md:grid-cols-3">
          <Card span={3} title="网络">
            <NetworkInfo />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;
