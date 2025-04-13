"use server";

import { addProduct, updateProduct, deleteProduct } from "@/prisma-db";  //db functions
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

export type FormState = {
  errors: Errors;
};
/***
 * validate form data from client product-edit-form.tsx product-db-create
 * 
 * 
 */

export async function createProduct(prevState: FormState, formData: FormData) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  const errors: Errors = {};
//validation form data
  if (!title) {
    errors.title = "Title is required";
  }

  if (!price) {
    errors.price = "Price is required";
  }

  if (!description) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  //call db function to add product
  await addProduct(title, parseInt(price), description);
  redirect("/data-fetching/products-db");
}

export async function editProduct(
  id: number,
  prevState: FormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required";
  }

  if (!price) {
    errors.price = "Price is required";
  }

  if (!description) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await updateProduct(id, title, parseInt(price), description);
  redirect("/data-fetching/products-db");
}

export async function removeProduct(id: number) {
  await deleteProduct(id);
  revalidatePath("/data-fetching/products-db");
}