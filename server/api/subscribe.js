import { promises as fs } from "node:fs";
import nodemailer from "nodemailer";
import { join } from "node:path";

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  auth: {
    user: "your-email@example.com",
    pass: "your-email-password",
  },
});

//const uri = "mongodb+srv://<username>:<password>@cluster.mongodb.net/newsletter";
//const client = new MongoClient(uri);
const filePath = join(process.cwd(), "server/subscribers.json");

export default defineEventHandler(async (event) => {
  // Parse incoming data
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
    // await client.connect();
    // const collection = client.db().collection("subscribers");
    const data = await fs.readFile(filePath, "utf-8");
    subscribers = JSON.parse(data);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  } finally {
    // await client.close();
  }

  // Check if subscribers is an object
  if (typeof subscribers === "object" && !Array.isArray(subscribers)) {
    subscribers = Object.keys(subscribers);
  }

  // Check if email already exists
  // const existingSubscriber = await collection.findOne({ email: body.email });
  if (subscribers.includes(body.email)) {
    return { message: "Already subscribed." };
  }

  // Add new subscriber
  // await collection.insertOne({ email: body.email });
  subscribers.push(body.email);
  await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2));

  // Send confirmation email
  const mailOptions = {
    from: '"Don Freddy" <no-reply@example.com>',
    to: body.email,
    subject: "Subscription Confirmation",
    text: "Thank you for subscribing to my newsletter! I promise not to spam you.",
  };

 // await transporter.sendMail(mailOptions);

  return {
    message: "Subscription successful. You will receive a confirmation email shortly.",
  };
});
