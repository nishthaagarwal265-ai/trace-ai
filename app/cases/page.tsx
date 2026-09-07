import { CasesTable } from "@/components/cases/cases-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[22px] font-semibold text-text">Case Management</h1>
          <p className="mt-1 text-[13.5px] text-text-muted">
            128 total cases across all investigators and detection pipelines.
          </p>
        </div>
        <Link href="/analyze">
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            New Case
          </Button>
        </Link>
      </div>
      <CasesTable />
    </div>
  );
}
