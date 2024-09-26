import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import customEvents from "@/data/custom-event.json";
import semester from "@/data/semester-1.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Event {
  title: string;
  color: string;
  data?: Record<string, any>;
}

interface Events {
  [date: string]: Event[];
}

function getCustomEvent() {
  const events: Events = {};
  for (const event of customEvents) {
    if (!events[event.date]) {
      events[event.date] = [];
    }
    events[event.date].push({
      title: event.title,
      color: event.color,
      data: event.data,
    });
  }
  return events;
}

function getSemesterEvent(): Events {
  const events: Events = {};

  // Loop through each course in jsonData
  for (const course of semester) {
    const courseName = course.name;
    const dates = course.dates;

    // Loop through each date in the course's `dates` array
    for (const entry of dates) {
      // Convert date from "DD/MM/YYYY" to 'YYYY-MM-DD' format
      const formattedDate = entry.date.split("/").reverse().join("-");

      if (!events[formattedDate]) {
        events[formattedDate] = [];
      }

      events[formattedDate].push({
        title: courseName,
        color: course.color,
        data: {
          time: entry.time,
          address: course.address,
          room: course.room,
        },
      });
    }
  }

  return events;
}

export function getEvents() {
  const customEvents = getCustomEvent();
  const semesterEvents = getSemesterEvent();
  // join the two objects with array values
  const result: Events = {};
  for (const date in customEvents) {
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(...customEvents[date]);
  }
  for (const date in semesterEvents) {
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(...semesterEvents[date]);
  }
  return result;
}
