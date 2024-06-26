"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret: string | undefined = process.env.NEXT_PUBLIC_STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("Missing API key");
  if (!apiSecret) throw new Error("Missing API secret");

  const client = new StreamClient(apiKey, apiSecret);
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000);
  const token = await client.createToken(user.id, exp, issued);

  return token;
};
