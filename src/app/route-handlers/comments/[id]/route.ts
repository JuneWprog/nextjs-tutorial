import {comments} from '../data';

export async function GET(_request: Request,{params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const comment = comments.find((comment) => comment.id === parseInt(id));
    if (comment) {
        return new Response(JSON.stringify({comment}), {
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

//update comment text
/**
 * 
 * In HTTP, PUT replaces an entire resource, 
 * while PATCH applies partial updates to a resource, making it more efficient for minor changes
 * 
 */
export async function PATCH(request: Request,{params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const { text } = await request.json();
    const index = comments.findIndex((comment) => comment.id === parseInt(id));
  comments[index].text = text;
  return Response.json(comments[index]);
    
}

export async function DELETE(request: Request,{params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const index = comments.findIndex((comment) => comment.id === parseInt(id));
    if (index > -1) {
        comments.splice(index, 1);
        return Response.json(comments);
    } else {
        return new Response(JSON.stringify({ message: 'Comment not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        })
    }
    
}