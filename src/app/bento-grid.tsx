import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Globe from "@/components/ui/globe";
import ProgressCard from "./minimalist-progress-card";

export default function BentoGrid() {
  return (
    <div className="not-prose">
      <div className="grid md:grid-cols-5 gap-5">
        <div className="md:col-span-3">
          <ProgressCard
            startDate={new Date("2024-10-01")}
            endDate={new Date("2026-10-01")}
          />
        </div>
        <div className="md:col-span-2 ">
          <Card className="size-full overflow-hidden h-60 md:h-full">
            <CardHeader>
              <CardTitle>Learning Location</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ho Chi Minh City, Vietnam
              </p>
            </CardHeader>
            <div className="relative size-full">
              <Globe />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
