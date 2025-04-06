// import Link from 'next/link';
// import React from 'react'

// const  NewsArticle = async ({params, searchParams}:{
//     params: Promise <{articleId: string}>;
//     searchParams: Promise<{lang?:"en"|"fr"|"es"}>
// }) => {
//     const {articleId} = await params;
//     const {lang ="en"} = await searchParams;
//   return (
//     <div>
//         <h1> news article {articleId} </h1>
//         <p>Read in {lang}</p>
//         <div>
//         <Link href ={`/articles/${articleId}?lang=en`} className="mr-4">English</Link>
//         <Link href ={`/articles/${articleId}?lang=fr`} className="mr-4">French</Link>
//         <Link href ={`/articles/${articleId}?lang=es`}>Spanish</Link>
//         </div>
//     </div>
//   )
// }

// export default NewsArticle

'use client'
import Link from 'next/link';
import React from 'react'
import {use} from 'react'

const  NewsArticle =  ({params, searchParams}:{
    params: Promise <{articleId: string}>;
    searchParams: Promise<{lang?:"en"|"fr"|"es"}>
}) => {
    const {articleId} =  use(params);
    const {lang ="en"} =  use(searchParams);
  return (
    <div>
        <h1> news article {articleId} </h1>
        <p>Read in {lang}</p>
        <div>
        <Link href ={`/articles/${articleId}?lang=en`} className="mr-4">English</Link>
        <Link href ={`/articles/${articleId}?lang=fr`} className="mr-4">French</Link>
        <Link href ={`/articles/${articleId}?lang=es`}>Spanish</Link>
        </div>
    </div>
  )
}

export default NewsArticle
