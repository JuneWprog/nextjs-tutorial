"use client";
import { useFormStatus } from "react-dom";
/**
 * 
 * formStatus is a hook that provides information about the status of a form submission.
 * It returns an object with properties: pending and formData, method, action.
 * pending: A boolean indicating if the parent <form> is currently submitting.
 * data: An object containing the form's submission data.
 * method: The HTTP method used (either 'get' or 'post').
 * action: A reference to the function passed to the parent <form> as its onSubmit prop.
 */
export const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
      disabled={pending}
    >
      Submit
    </button>
  );
};