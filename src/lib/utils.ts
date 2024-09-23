import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function convertSemesterDataToEventsFormat(jsonData: any): Events {
  const events: Events = {};

  // Loop through each course in jsonData
  for (const course of jsonData) {
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
