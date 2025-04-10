import { comments } from './data';
import { NextRequest } from 'next/server';

// export async function GET() {
//     return new Response(JSON.stringify({comments}), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' }
//     })
// }
//search query comments?query=comment
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const filteredComments = query
      ? comments.filter((comment) => comment.text.includes(query))
      : comments;
    return Response.json(filteredComments);
  }
  


export async function POST(request: Request) {
    const { text } = await request.json();
    const newComment = {
        id: comments.length + 1,
        text,
    };
    comments.push(newComment);
    return new Response(JSON.stringify({ comments }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex > -1) {
        comments.splice(commentIndex, 1);
        return new Response(JSON.stringify({ comments }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } else {
        return new Response(JSON.stringify({ message: 'Comment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export async function PUT(request: Request) {
    const { id, text } = await request.json();
    console.log(id, text);
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex > -1) {
        comments[commentIndex].text = text;
        return new Response(JSON.stringify({ comments }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } else {
        return new Response(JSON.stringify({ message: 'Comment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}