import { StatCard } from "@/components/dashboard/stat-card";
import { RiskDonut } from "@/components/charts/risk-donut";
import { ThreatActivityList } from "@/components/dashboard/threat-activity";
import { RecentCasesTable } from "@/components/dashboard/recent-cases-table";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dashboardStats } from "@/data/mock-data";
import { FolderOpen, ScanSearch, AlertTriangle, Clock3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-text">Digital Forensics Overview</h1>
          <p className="mt-1 text-[13.5px] text-text-muted">
            Monitor deepfake investigations, media analysis and forensic evidence.
          </p>
        </div>
        <Link href="/analyze">
          <Button variant="primary" icon={<ScanSearch className="h-4 w-4" />}>
            Analyze New Media
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Cases"
          value={dashboardStats.totalCases.value}
          trend={dashboardStats.totalCases.trend}
          up={dashboardStats.totalCases.up}
          icon={FolderOpen}
          accent="accent"
        />
        <StatCard
          label="Analyzed Media"
          value={dashboardStats.analyzedMedia.value.toLocaleString()}
          trend={dashboardStats.analyzedMedia.trend}
          up={dashboardStats.analyzedMedia.up}
          icon={ScanSearch}
          accent="accent"
        />
        <StatCard
          label="High Risk Findings"
          value={dashboardStats.highRiskFindings.value}
          trend={dashboardStats.highRiskFindings.trend}
          up={dashboardStats.highRiskFindings.up}
          icon={AlertTriangle}
          accent="critical"
        />
        <StatCard
          label="Pending Investigations"
          value={dashboardStats.pendingInvestigations.value}
          trend={dashboardStats.pendingInvestigations.trend}
          up={dashboardStats.pendingInvestigations.up}
          icon={Clock3}
          accent="high"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader title="Risk Overview" subtitle="Distribution across all analyzed media" />
          <CardBody>
            <RiskDonut />
            <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
              <LegendRow color="bg-safe" label="Low Risk" value="612" />
              <LegendRow color="bg-medium" label="Medium Risk" value="481" />
              <LegendRow color="bg-high" label="High Risk" value="302" />
              <LegendRow color="bg-critical" label="Critical" value="96" />
            </div>
          </CardBody>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader
            title="Recent Threat Activity"
            subtitle="Live feed of suspicious media findings"
            action={
              <Link href="/cases" className="flex items-center gap-1 text-[12.5px] text-accent-2 hover:underline">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="max-h-[300px] overflow-y-auto">
            <ThreatActivityList />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Recent Cases"
          subtitle="Latest submissions across all investigators"
          action={
            <Link href="/cases" className="flex items-center gap-1 text-[12.5px] text-accent-2 hover:underline">
              View all cases <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <RecentCasesTable />
      </Card>
    </div>
  );
}

function LegendRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border-soft bg-surface-2/40 px-2.5 py-1.5">
      <span className="flex items-center gap-1.5 text-text-muted">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        {label}
      </span>
      <span className="font-mono text-text">{value}</span>
    </div>
  );
}
