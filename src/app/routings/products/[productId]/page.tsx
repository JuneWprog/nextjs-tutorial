import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Props ={params: Promise<{productId:string}>}

export const generateMetadata = async({
  params,
}:Props): Promise<Metadata>=>{
  const id = (await params).productId;

  const productName = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`ipone ${id}`);
    }, 2000);
  });

  return {
    title: productName,
    description: productName,
  };
};
const ProductDetail = async ({params,}:{params: Promise<{productId:string}>}) => {
    // const { productId } = useParams()
    const productId= (await params).productId;
    if(parseInt(productId) < 0){
        notFound()
    }
  return (
    <div>
        <h1 className='text-4xl font-bold'>Product Detail</h1>
        <p className='text-2xl'>Product ID: {productId}</p>
      
    </div>
  )
}

export default ProductDetail
