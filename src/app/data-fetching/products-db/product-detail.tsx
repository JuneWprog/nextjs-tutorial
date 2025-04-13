"use client";

import { useOptimistic } from "react";
import { removeProduct } from "@/app/data-fetching/actions/products";
import Link from "next/link";
import Form from "next/form";
import { useRouter } from 'next/navigation';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};
/**
 * 
 * It helps you immediately reflect changes in the UI while waiting for the real data update from the server.
 *  This gives your app a snappier and more responsive feel.
 * 
 * 
 * @returns 
 */
export const ProductDetail = ({ products }: { products: Product[] }) => {
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (currentProducts, productId) => {
      return currentProducts.filter((product) => product.id !== productId);
    }
  );

  const removeProductById = async (productId: number) => {
    setOptimisticProducts(productId); // Optimistically remove the product from the UI
    await removeProduct(productId); // Call the server function to remove the product
  };

  const router =useRouter()
  const handleClick = (productId: number)=> {
    router.push(`/data-fetching/products-db/${productId}`)
  };

  return (
    <ul className="space-y-4 p-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
         <div onClick={() => handleClick(product.id)} className="cursor-pointer">
         <h2 className="text-xl font-semibold">
            <Link href={`/data-fetching/products-db/${product.id}`} className="hover:text-blue-500">{product.title}</Link>
          </h2>
          <p>{product.description}</p>
          <p className="text-lg font-medium">${product.price}</p>

         </div>
         
         
          <Form action={removeProductById.bind(null, product.id)}>
            <button
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Delete
            </button>
          </Form>
        </li>
      ))}
    </ul>
  );
};