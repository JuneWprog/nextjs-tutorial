"use client";

import { addProduct } from "@/prisma-db";
import { FormState, createProduct } from "../actions/products"; //server functions
import { Submit } from "../components/submit";
import { useActionState } from "react";
import { redirect } from "next/dist/server/api-utils";

//form state handling validation errors
export default function AddProductPage() {
  const initialState: FormState = {
    errors: {},
  };
  // The following createProduct logic in server function should be seperated from the client component.
  // async function createProduct(formData: FormData) {
  //   "use server"; // This function will be executed on the server side

  //   const title = formData.get("title")as string
  //   const price = formData.get("price")as string
  //   const description = formData.get("description")as string
  //   await addProduct(title, parseInt(price), description);
  //   redirect("/data-fetching/products"); // Redirect to the products page after adding a product
  //   }



    // Bind the createProduct function to the current context
    //useActionState is a custom hook that manages the state of the form submission process.
    // It takes a function (createProduct) and an initial state (initialState) as arguments.
    // The hook returns the current state of the form and a function to handle form submissions.
    
  const [state, formAction, isPending] = useActionState(createProduct, initialState);

  return (
    <form action={formAction} className="p-4 space-y-4 max-w-96">
      <div>
        <h2>Add A Product</h2>
        <label className="text-black">
          Title
          <input
            type="text"
            className="block w-full p-2 text-black border rounded"
            name="title"
          />
        </label>
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>
      <div>
        <label className="text-black">
          Price
          <input
            type="number"
            className="block w-full p-2 text-black border rounded"
            name="price"
          />
        </label>
        {state.errors.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>
      <div>
        <label className="text-black">
          Description
          <textarea
            className="block w-full p-2 text-black border rounded"
            name="description"
          />
        </label>
        {state.errors.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>
      <div>
        {isPending && <p>action pending</p>}
      </div>

      {/* <button
        type="submit"
        className="block w-full p-2 text-black bg-blue-500 rounded disabled:bg-gray-500"
        disabled={isPending}
      >
        Submit
      </button> */}
      <Submit />
    </form>
  );
}