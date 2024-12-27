import { promises as fs } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "server/subscribers.json");

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // { email: "example@example.com" }

  if (!body.email || !body.email.includes("@")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email address.",
    });
  }

  // Read existing subscribers
  let subscribers = [];
  try {
    const data = await fs.readFile(filePath, "utf-8");
    subscribers = JSON.parse(data);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  // Remove the email if it exists
  const updatedSubscribers = subscribers.filter((sub) => sub !== body.email);

  // If the email was not found, return a specific message
  if (updatedSubscribers.length === subscribers.length) {
    return { message: "Email not found in subscribers list." };
  }

  // Write the updated list back to the file
  await fs.writeFile(filePath, JSON.stringify(updatedSubscribers, null, 2));

  return { message: "Successfully unsubscribed." };
});
