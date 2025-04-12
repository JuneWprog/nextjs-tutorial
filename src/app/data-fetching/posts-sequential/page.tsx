
import { Suspense } from 'react'
import AuthorDetail from './author'


type Post ={
    userId: number,
    id: number,
    title: string,
    body: string
}



const PostsSequential = async() => {
    //fetching data sequentially
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await res.json()

    // fetch user data for each post
    const filteredPosts = posts.filter((post) => post.id%10 === 1);

    return (
        <div className="p-4 max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-8">Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.body}</p>
                <Suspense
                  fallback={
                    <div className="text-sm text-gray-500">Loading author...</div>
                  }
                >
                  <AuthorDetail userId={post.userId} />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      );
}

export default PostsSequential
