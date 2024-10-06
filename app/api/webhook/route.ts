/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUSer, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url, username } =
      evt.data;
    // create a new user in database
    const mongoUser = await createUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name ? `${last_name}` : ""}`,
      picture: image_url,
      username: username!,
    });
    return NextResponse.json({ messege: "user created", user: mongoUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url, username } =
      evt.data;

    // update a new user in database

    const updatedMongoUser = await updateUser({
      clerkId: id,
      updateData: {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name ? `${last_name}` : ""}`,
        picture: image_url,
        username: username!,
      },
      path: `/profile/${id}`,
    });

    console.log(evt.data);
    return NextResponse.json({
      messege: "user updated",
      Updateuser: updatedMongoUser,
    });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    // delete a new user in database
    const deletedUser = await deleteUSer({
      clerkId: id!,
    });
    return NextResponse.json({ messege: "uder deleted", user: deletedUser });
  }

  return new Response("", { status: 200 });
}
