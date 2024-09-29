import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getNotes } from "@/lib/notes";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import BentoGrid from "./bento-grid";

export default async function Home() {
  const lastUpdated = new Date();
  const notes = await getNotes();

  return (
    <div className="px-5">
      <p className="text-sm text-muted-foreground">
        Last updated:{" "}
        <time dateTime={lastUpdated.toISOString()}>
          {format(lastUpdated, "MMMM dd, yyyy h:mm a")}
        </time>
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Welcome! I'm Thinh 👋</h1>
        <p>
          This website serves as my digital notebook for documenting my{" "}
          <b className="text-blue-500">Master of Business Administration</b>{" "}
          journey.
        </p>
        <p>
          I'm currently pursuing a master's degree at the{" "}
          <a
            href="https://ueh.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500"
          >
            University of Economics Ho Chi Minh City
          </a>
          . Throughout this experience, I'm gaining valuable insights into
          business, leadership, and personal growth. My goal is to share these
          learnings with you, inviting you to join me on this educational
          adventure.
        </p>
        <BentoGrid />
        <p>
          If you want to know more about me, visit my main website at{" "}
          <Link className="text-yellow-500" href="https://thinhcorner.com">
            thinhcorner.com
          </Link>
          .
        </p>

        <h2 className="mt-0">
          Below are the notes that I have taken on my journey:
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {notes.map((note, id) => (
          <Card key={id} id={`note-${notes.length - id}`}>
            <CardHeader className="flex flex-row pb-4 items-center justify-between gap-5">
              <Link
                href={`#note-${notes.length - id}`}
                className="text-xl  font-semibold text-muted-foreground"
              >
                #{notes.length - id}
              </Link>
              <time
                className="text-sm text-muted-foreground"
                dateTime={new Date(note.frontmatter.created_at).toISOString()}
              >
                {format(
                  new Date(note.frontmatter.created_at),
                  "MMMM dd, yyyy h:mm a"
                )}
                -{" "}
                {formatDistanceToNow(new Date(note.frontmatter.created_at), {
                  addSuffix: true,
                })}
              </time>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {note.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
