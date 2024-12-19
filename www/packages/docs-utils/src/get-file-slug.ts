import { matter } from "vfile-matter"
import { readSync } from "to-vfile"
import { FrontMatter } from "types"
import { getFrontMatter } from "./get-front-matter.js"

export async function getFileSlug(
  filePath: string
): Promise<string | undefined> {
  const fileFrontmatter = await getFrontMatter(filePath)

  if (fileFrontmatter.slug) {
    // add to slugs array
    return fileFrontmatter.slug
  }
}

export function getFileSlugSync(filePath: string): string | undefined {
  const content = readSync(filePath)

  matter(content)

  return ((content.data.matter as FrontMatter).slug as string) || undefined
}
