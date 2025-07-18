//API Controller to handle clerk user-related operations
//https://localhost:5000/api/user/webhooks

import { Webhook } from "svix";
import userModel from "../models/userModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    switch (type) {
      case "user.created":
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo:
            data.image_url ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
        };
        await userModel.create(userData);
        res.json({ message: "User created successfully" });
        console.log("User created:", data);
        break;

      case "user.updated":
        const updateData = {
          email: data.email_addresses[0].email_address,
          photo:
            data.image_url ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
        };
        await userModel.updateOne({ clerkId: data.id }, updateData);
        res.json({ message: "User updated successfully" });
        console.log("User updated:", data);
        break;
      case "user.deleted":
        await userModel.deleteOne({ clerkId: data.id });
        res.json({ message: "User deleted successfully" });
        console.log("User deleted:", data);
        break;
      default:
        console.log("Unhandled event type:", type);
    }
  } catch (error) {
    console.error("Error initializing webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { clerkWebhooks };