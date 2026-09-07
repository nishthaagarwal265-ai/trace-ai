"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { currentInvestigator } from "@/data/mock-data";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ critical: true, high: true, medium: false, weekly: true });
  const [sensitivity, setSensitivity] = useState(70);
  const [retention, setRetention] = useState("365");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-text">Settings</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">Manage your profile, preferences, and platform configuration.</p>
      </div>

      <Card>
        <CardHeader title="Investigator Profile" />
        <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" value={currentInvestigator.name} />
          <Field label="Badge ID" value={currentInvestigator.badge} />
          <Field label="Role" value={currentInvestigator.role} />
          <Field label="Unit" value={currentInvestigator.unit} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Notification Preferences" />
        <CardBody className="space-y-3">
          <ToggleRow label="Critical risk alerts" checked={notifs.critical} onChange={(v) => setNotifs((n) => ({ ...n, critical: v }))} />
          <ToggleRow label="High risk alerts" checked={notifs.high} onChange={(v) => setNotifs((n) => ({ ...n, high: v }))} />
          <ToggleRow label="Medium risk alerts" checked={notifs.medium} onChange={(v) => setNotifs((n) => ({ ...n, medium: v }))} />
          <ToggleRow label="Weekly summary digest" checked={notifs.weekly} onChange={(v) => setNotifs((n) => ({ ...n, weekly: v }))} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Analysis Preferences" />
        <CardBody className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-[12.5px]">
              <span className="text-text-muted">Detection sensitivity threshold</span>
              <span className="font-mono text-text">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-[#3B82F6]"
            />
            <p className="mt-1 text-[11.5px] text-text-dim">Lower values flag more media for manual review.</p>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] text-text-muted">Evidence retention period (days)</label>
            <select
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-text focus:border-accent/50 focus:outline-none"
            >
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">365 days</option>
              <option value="indefinite">Indefinite (legal hold)</option>
            </select>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="API Configuration" subtitle="Placeholder for connecting live detection services" />
        <CardBody className="space-y-3">
          <Field label="Detection API Endpoint" value="Not configured" muted />
          <Field label="API Key" value="•••••••••••••••• (not set)" muted />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Model Configuration" subtitle="Placeholder for managing detection engine weights" />
        <CardBody className="space-y-3">
          <Field label="Ensemble strategy" value="Weighted average (default)" muted />
          <Field label="Active model set" value="6 engines enabled" muted />
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" icon={<Save className="h-4 w-4" />}>Save Changes</Button>
      </div>
    </div>
  );
}

function Field({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <div className="mb-1 text-[11.5px] text-text-dim">{label}</div>
      <div className={`rounded-lg border border-border bg-surface px-3 py-2 text-[13px] ${muted ? "text-text-dim" : "text-text"}`}>
        {value}
      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-text-muted">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
