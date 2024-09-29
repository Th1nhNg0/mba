import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".md");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");

  return compileMDX<{ created_at: string }>({
    source: rawContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
}

async function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(mdxFiles.map((file) => readMDXFile(path.join(dir, file))));
}

export async function getNotes() {
  return getMDXData(path.join(process.cwd(), "notes")).then((notes) =>
    notes.sort((a, b) => {
      return (
        new Date(b.frontmatter.created_at).getTime() -
        new Date(a.frontmatter.created_at).getTime()
      );
    })
  );
}
