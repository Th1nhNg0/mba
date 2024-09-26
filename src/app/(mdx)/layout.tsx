import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="px-5">
      <Button variant="link" asChild className="px-0 text-muted-foreground">
        <Link href="/">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </Button>
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  );
}
