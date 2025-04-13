"use server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../../../types/globals";
import { revalidatePath } from "next/cache";

//clerkClient is a server-side client for Clerk, which allows you to interact with the Clerk API from your server-side code.
// It is used to manage users, sessions, and other Clerk-related operations.

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  const { sessionClaims } = await auth();
  const curRole = sessionClaims?.publicMetadata?.role;

  console.log("User role:", curRole); // e.g., "admin"

  if (curRole !== "admin") {
    throw new Error("Not Authorized");
  }
  //validate the formData to ensure it contains the required fields
  // const client = await clerkClient();
  const id = formData.get("id") as string;
  const role = formData.get("role") as Roles;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role }, //set the role in the public metadata of the user role:role
    });
    revalidatePath("/auth/admin");
  } catch {
    throw new Error("Failed to set role");
  }
}

export async function removeRole(formData: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/auth/admin");
  } catch {
    throw new Error("Failed to remove role");
  }
}
