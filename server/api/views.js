import { promises as fs } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "server/views.json");

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event);

  if (!slug) return { error: "No slug provided" };

  // Read the current views data
  let views = {};
  try {
    const data = await fs.readFile(filePath, "utf-8");
    views = JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, start with an empty object
    if (err.code !== "ENOENT") throw err;
  }

  // Increment the view count for the slug
  views[slug] = (views[slug] || 0) + 1;

  // Write the updated views data back to the file
  await fs.writeFile(filePath, JSON.stringify(views, null, 2));

  return { views: views[slug] };
});
