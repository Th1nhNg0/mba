import data from "@/data/semester-1.json";
import { convertSemesterDataToEventsFormat } from "@/lib/utils";
import Calendar from "../components/calendar";

export default function Home() {
  const lastUpdated = new Date();
  return (
    <div className="px-5">
      <p className="text-sm text-muted-foreground">
        Last updated:{" "}
        <time dateTime={lastUpdated.toISOString()}>
          {lastUpdated.toLocaleString()}
        </time>
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Welcome! I'm Thinh 👋</h1>
        <p>
          This website serves as my digital notebook for documenting my MBA
          journey.
        </p>
        <p>
          I'm currently pursuing a master's degree at the{" "}
          <a
            href="https://ueh.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Economics Ho Chi Minh City
          </a>
          . Throughout this experience, I'm gaining valuable insights into
          business, leadership, and personal growth. My goal is to share these
          learnings with you, inviting you to join me on this educational
          adventure.
        </p>
        <p>
          Below is the calendar of my first semester. I'll be updating it
          regularly with new events, assignments, and other important dates.
          Feel free to check it out and follow along with my journey!
        </p>
      </div>
      <div className="my-5">
        <Calendar events={convertSemesterDataToEventsFormat(data)} />
      </div>
      <div className="prose dark:prose-invert max-w-none"></div>
    </div>
  );
}
