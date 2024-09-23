import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div>
      <Button variant="link" asChild className="px-0">
        <Link href="/">
          <ChevronLeft className="w-6 h-6 mr-2" />
          Back to home
        </Link>
      </Button>
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  );
}
