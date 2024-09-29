"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircleIcon } from "lucide-react";

interface ProgressCardProps {
  startDate: Date;
  endDate: Date;
}

export default function ProgressCard({
  startDate,
  endDate,
}: ProgressCardProps) {
  const [progress, setProgress] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { isFinished, calculatedProgress, daysLeft, totalDays } =
    useMemo(() => {
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsedDuration = currentDate.getTime() - startDate.getTime();
      const calculatedProgress = Math.min(
        Math.max((elapsedDuration / totalDuration) * 100, 0),
        100
      );
      const isFinished = currentDate >= endDate;
      const daysLeft = Math.max(
        Math.ceil(
          (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        ),
        0
      );
      const totalDays = Math.max(
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ),
        1
      );

      return { isFinished, calculatedProgress, daysLeft, totalDays };
    }, [startDate, endDate, currentDate]);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= calculatedProgress) {
          clearInterval(interval);
          return calculatedProgress;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [calculatedProgress]);

  const formatDate = useMemo(
    () => (date: Date) => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    []
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <CardTitle>Project Progress</CardTitle>
        {isFinished && (
          <Badge
            variant="default"
            className="bg-green-500 text-white mt-2 sm:mt-0"
          >
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Completed
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Start</span>
            <span className="font-medium">{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {isFinished ? "End" : "Estimated End"}
            </span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm font-medium text-foreground">
              {isFinished ? "100" : progress.toFixed(0)}%
            </span>
          </div>
          <Progress value={isFinished ? 100 : progress} className="h-2" />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {isFinished ? "Completed" : "Days Left"}
          </span>
          <span className="font-medium text-foreground">
            {isFinished ? `${totalDays} days` : `${daysLeft} days`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
