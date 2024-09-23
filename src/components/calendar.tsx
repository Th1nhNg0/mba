"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  DoorOpen,
  MapPin,
  RotateCcw,
} from "lucide-react";
import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface Event {
  title: string;
  color: string;
  data?: Record<string, any>;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

interface RollingTextProps {
  text: string;
  direction: number;
}

const RollingText: React.FC<RollingTextProps> = ({ text, direction }) => {
  return (
    <motion.div layout className="overflow-hidden md:h-[40px]">
      <motion.span
        key={text}
        initial={{ y: direction > 0 ? 40 : -40 }}
        animate={{ y: 0 }}
        exit={{ y: direction > 0 ? -40 : 40 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

interface ComponentProps {
  events: Record<string, Event[]>;
}

export default function Calendar({ events }: ComponentProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [direction, setDirection] = useState<number>(0);

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getUTCDate() === today.getUTCDate() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCFullYear() === today.getUTCFullYear()
    );
  };

  const getDaysInMonth = (date: Date): number =>
    new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)
    ).getUTCDate();

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)
    ).getUTCDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Adjust to make Monday 0 and Sunday 6
  };

  const changeMonth = (increment: number): void => {
    setDirection(increment);
    setCurrentDate(
      (prevDate) =>
        new Date(
          Date.UTC(
            prevDate.getUTCFullYear(),
            prevDate.getUTCMonth() + increment,
            1
          )
        )
    );
  };

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(currentDate);
  const year = currentDate.getUTCFullYear();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const prevMonthDays = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 0)
  ).getUTCDate();
  const nextMonthDays = 42 - firstDayOfMonth - daysInMonth;

  const calendarDays: CalendarDay[] = [
    ...Array.from({ length: firstDayOfMonth }, (_, i) => ({
      date: new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth() - 1,
          prevMonthDays - firstDayOfMonth + i + 1
        )
      ),
      isCurrentMonth: false,
    })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      date: new Date(
        Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), i + 1)
      ),
      isCurrentMonth: true,
    })),
    ...Array.from({ length: nextMonthDays }, (_, i) => ({
      date: new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth() + 1,
          i + 1
        )
      ),
      isCurrentMonth: false,
    })),
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => changeMonth(-1)}
          className="mr-2"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => changeMonth(1)}
          className="mr-4"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <LayoutGroup>
          <motion.div className="flex items-baseline">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={monthName}
                className="text-xl sm:text-3xl font-bold mr-2"
              >
                <RollingText text={monthName} direction={direction} />
              </motion.h2>
            </AnimatePresence>
            <motion.span
              layout
              className="text-lg sm:text-xl text-muted-foreground"
            >
              {year}
            </motion.span>
          </motion.div>
        </LayoutGroup>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(new Date())}
          className="ml-auto"
          title="Reset to current month"
        >
          <RotateCcw className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-2 sm:mb-4">
        {days.map((day) => (
          <div
            key={day}
            className="bg-muted text-muted-foreground text-center text-xs sm:text-sm font-medium py-1 sm:py-2 rounded-lg"
          >
            {day}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${monthName}-${year}-grid`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1 sm:gap-4"
        >
          {calendarDays.map(({ date, isCurrentMonth }, index) => {
            const dateString = date.toISOString().split("T")[0];
            const dayEvents = events[dateString] || [];
            return (
              <HoverCard key={date.toISOString()}>
                <HoverCardTrigger>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: !isCurrentMonth ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.2, delay: index * 0.01 }}
                    className={cn(
                      "aspect-square bg-muted rounded-lg flex flex-col items-center justify-between py-1 sm:py-2 relative transition-all duration-200 ease-in-out cursor-pointer",
                      isToday(date) && "bg-primary shadow-md"
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.01 + 0.1,
                      }}
                      className="flex-1 flex w-full items-center justify-center"
                    >
                      {dayEvents.length > 0 && (
                        <>
                          {/* Mobile: Dot with ping animation */}
                          <motion.div
                            className="sm:hidden absolute top-1 right-1"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          </motion.div>
                          {/* Desktop: Event details */}
                          <div className="hidden sm:block w-full divide-y-[1px]">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className={cn(
                                  "flex items-center justify-center text-xs font-medium py-px px-1",
                                  isToday(date)
                                    ? "text-primary-foreground"
                                    : "text-background"
                                )}
                                style={{
                                  backgroundColor: `${event.color}90`,
                                }}
                              >
                                <p className="whitespace-nowrap text-white truncate">
                                  {event.title}
                                </p>
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div
                                className={cn(
                                  "w-12 h-6 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-medium",
                                  isToday(date) &&
                                    "bg-primary-foreground text-primary"
                                )}
                              >
                                +{dayEvents.length - 2}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                    <span
                      className={cn(
                        "text-lg sm:text-2xl font-medium",
                        isToday(date)
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                        !isCurrentMonth && "text-muted-foreground/50"
                      )}
                    >
                      {date.getUTCDate()}
                    </span>
                  </motion.div>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 sm:w-80 pr-0">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2 ">
                      <CalendarIcon className="w-4 h-4" />
                      <h4 className="text-sm font-semibold">
                        {format(date, "EEEE, MMMM d, yyyy")}
                      </h4>
                    </div>
                    {dayEvents.length > 0 ? (
                      <ScrollArea className="h-[180px] pr-4">
                        <ul className="space-y-2">
                          {dayEvents.map((event, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-2 bg-muted p-2 rounded-md"
                            >
                              <div
                                className="w-2 h-2 mt-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: event.color }}
                              />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm  font-medium">
                                  {event.title}
                                </p>
                                {event.data && (
                                  <div className="space-y-1 text-xs text-muted-foreground">
                                    {event.data.time && (
                                      <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                                        {event.data.time}
                                      </div>
                                    )}
                                    {event.data.address && (
                                      <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                                        {event.data.address}
                                      </div>
                                    )}
                                    {event.data.room && (
                                      <div className="flex items-center">
                                        <DoorOpen className="w-4 h-4 mr-1 flex-shrink-0" />
                                        Room: {event.data.room}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </ScrollArea>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No events scheduled
                      </p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
