import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { TrendAreaChart, SimpleLineChart } from "@/components/charts/line-area-chart";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { DonutSimple } from "@/components/charts/donut-simple";
import {
  analyticsTrends,
  casesByRisk,
  mediaTypeBreakdown,
  modelPerformance,
  falsePositiveTrend,
  crossDatasetPerformance,
} from "@/data/mock-data";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-text">Analytics</h1>
        <p className="mt-1 text-[13.5px] text-text-muted">
          Detection trends, model performance, and quality monitoring across the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Deepfake Detection Trends" subtitle="Cases submitted vs. flagged, last 7 months" />
          <CardBody>
            <TrendAreaChart
              data={analyticsTrends}
              xKey="month"
              areas={[
                { key: "cases", color: "#3B82F6", label: "Cases" },
                { key: "flagged", color: "#F0453D", label: "Flagged" },
              ]}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Cases by Risk Level" />
          <CardBody>
            <DonutSimple data={casesByRisk} colors={["#34D399", "#F0C242", "#F5893A", "#F0453D"]} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Media Type Distribution" />
          <CardBody>
            <DonutSimple data={mediaTypeBreakdown} colors={["#3B82F6", "#22D3EE", "#8B5CF6"]} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Detection Model Performance" subtitle="Accuracy by engine" />
          <CardBody>
            <SimpleBarChart data={modelPerformance} dataKey="accuracy" nameKey="name" color="#22D3EE" height={240} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="False-Positive Monitoring" subtitle="Weekly rate, trending down" />
          <CardBody>
            <SimpleLineChart data={falsePositiveTrend} xKey="week" yKey="rate" color="#F0C242" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Cross-Dataset Model Performance" subtitle="AUC across benchmark datasets" />
          <CardBody>
            <SimpleBarChart
              data={crossDatasetPerformance}
              dataKey="auc"
              nameKey="dataset"
              color="#3B82F6"
              height={240}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
