
# 🚀 Next.js Tutorial

## 📁 Folder Structure
```bash
client      /app            page.jsx or page.tsx      "use client"
server      /app/api        route.js or route.ts      "use server"
```

---

## ** 'use client' client Components can not be async function **


## 1🚏 **Routing System**
- Routing  
- Nested Routes  
- Dynamic Routes  
- Nested Dynamic Routes  
- Catch-all Segments  
- Not Found Page  
- File Colocation  
- Private Folders  
- Route Groups  

### 1.1 📌 Dynamic Route Segment
```bash
/comments/[id]  ➝  Dynamic route segment
```

### 1.2 🌀 Catch-all & Optional Catch-all Segments

- **Catch-all**  
- slug is an object of array {slug: []}
```bash
/comments/[...slug] ➝ /comments/a/b/c
// slug = ["a", "b", "c"]
```

```bash
app/shop/[...slug]/page.js
```
| Route | Example URL | Params |
|-------|-------------|--------|
| `/shop/[...slug]` | `/shop/a` | `{ slug: ['a'] }` |
| `/shop/[...slug]` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |

- **Optional Catch-all**

```bash
app/shop/[[...slug]]/page.js
```
| Route | Example URL | Params |
|-------|-------------|--------|
| `/shop/[[...slug]]` | `/shop` | `{ slug: undefined }` |
| `/shop/[[...slug]]` | `/shop/a` | `{ slug: ['a'] }` |

### 1.3 🗂️ Group Routes
```bash
(auth)      ➝   Group folder
  └ login   ➝   /login
  └ signup  ➝   /signup
```

### 1.4 🔒 Private Folders
```bash
_folder ➝ Not routable
Used to store UI logic or internal files
```

### 1.5 🧩 Parallel Routes
```text
@slotName ➝ Parallel routes using named slots
```

### 1.6 🧭 Intercepting Routes
| Pattern | Description |
|---------|-------------|
| `(.)`folder | Intercepts same level |
| `(..)`folder | One level above |
| `(..)(..)`folder | Two levels above |
| `(...)`folder | Intercepts from root |

---


---
## 2. 📑 Special Files
### 2.1 📁 Files in a Route
| File | Description |
|------|-------------|
| `layout.js` | Shared UI and state |
| `template.js` | Similar to layout.tsx but re-renders on navigation. |
| `error.js` | Catches and handles rendering errors within its segment. |
| `loading.js` | Shown during suspenseful data fetching/loading states.|
| `not-found.js` | 404 error UI |
| `page.js` / `page.tsx` | 	Defines the content of a route (required for a route to exist). |



### 2.2 🔄 Component Hierarchy
```text
Route
    layout.tsx
  └─ template.tsx
       └─ error.tsx (React Error Boundary)
            └─ loading.tsx (React Suspense Boundary)
                 └─ not-found.tsx
                      └─ page.tsx

```


## 🔁 Rendering Behavior

| File            | Renders on Nav?         | Handles Errors?     | Suspense Support | Required         |
|-----------------|--------------------------|----------------------|------------------|------------------|
| `layout.tsx`    | ❌ (once, persistent)     | ❌                   | ✅               | ✅ (in root)      |
| `template.tsx`  | ✅ (each time)            | ❌                   | ✅               | ❌                |
| `page.tsx`      | ✅                        | ❌                   | ✅               | ✅                |
| `error.tsx`     | ✅ (on error)             | ✅                   | ❌               | ❌                |
| `loading.tsx`   | ✅ (on loading)           | ❌                   | ✅               | ❌                |
| `not-found.tsx` | ✅ (on 404)               | ✅ (`notFound()`)    | ❌               | ❌                |




![2025-04-06_152421](https://github.com/user-attachments/assets/75c863f6-e828-426e-b4bd-97c428612214)


### 2.3 ✅ Page Requirements
- `page.js` is **required**
- Must `export default` a React component


## 3🧱 **Layouts & Metadata**
- Layouts  
- Nested Layouts  
- Multiple Root Layouts  
- Routing Metadata  
- title Metadata  

---
#### 3.1 What is a Layout?
- A layout is UI shared between pages
- Must default export a component that takes `children`
- RouteLayout is generated automatically, and apply to all pages 

#### 3.2 Nested Layouts
- Layout in a route folder applies to all child routes
```bash
/products/[id] ➝ Uses root layout + productIdLayout()
```

#### 3.3 Multiple Root Layouts
- Group routes like `(auth)` and `(marketing)` can have their own root layout


#### 3.4 Routing Metadata 
- powerful feature that allows defining various metadata for each page
- Two ways to handle metadata in layout or page
-  1. export a static metadata object
-  2. export  generateMetadata() a function to dynamic generate metadata


**Static Metadata**
```ts
export const metadata = {
  title: 'My Page',
};
```
<details>
<summary> <code> **Dynamic Metadata**</code> </summary>

```ts
type Props = {
  params: Promise<{ productId: string }>
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = (await params).productId;
  return {
    title: `Product ${id}`,
  };
};
```
</details>

#### Metadata Rules:
- 1) layout metadata apply to all children page, metadata defined in page is more specific only apply to that page
- 2) flows top-down order starting from the root level
- 3) when metadata exists in multiple places along a route , they merge together with page metadata override layout metadata for matching properties
- 4) Specificity: page metadata > layout metadata > parent metadata > root metadata

#### How to solve this error:
> **❗ Error:** `You are attempting to export "generateMetadata" from a component marked with "use client", which is disallowed`

- 1) create a client component 'use client' and export 
- 2) import the client component in page.tsx  and export metadata in page.tsx  


### Title Metadata object


<details>
<summary> <code>In Layout file </code> </summary>

```ts
export const metadata: Metadata ={
  title:{
    default:"nextjs tutorial",   //fallback
    template:"%s | tutorial",     //dynamic
    absolute:"",                  //hardcoded can pass from children
  },
  description :"nextjs tutorial "
};     

```
</details>

<details>
<summary> <code>In  Child component  </code> </summary>

```ts
export const metadata: metadata ={
    title:{
        absolute: "Blog",
    }
}

```
</details>

#### 1. default (specific 1 )
- This sets the default title for the page or layout.
- If no dynamic title is provided via a template, this is what shows up.
### 2. template  (specific 10 )
- This defines how dynamic titles should be rendered.
- %s is a placeholder for the dynamic part.

### 3. absolute (specific 100 )
- This allows you to override everything and set a completely fixed title.
- If absolute is defined, it ignores default and template.



---


## 🔗4. **Navigation**
- Linking Component Navigation  
- Active Links  
- params and searchParams  
- Navigating Programmatically  
- Templates  

### 4.1 Link Component Navigation 
- Link  extends the <a> element and it's the primary way to navigate 

```ts
import Link from 'next/link'

<Link href="/blog">Blog</Link>     //static link

<Link href=`/blog/${id}`>Blog</Link>     //dynamic link
```

### 4.2 Active links

<details>
<summary> <code>active linkes </code> </summary>

```ts
//active link
import { usePathname } from "next/navigation";
const pathName = usePathname();
{navLinks.map((link) => {
          const isActive =
            pathName === link.href ||
            (pathName.startsWith(link.href) && link.href !== "/");
          return (
            <Link key={link.name} href={link.href} className={isActive ?"font-bold mr-4":"text-blue-300"}>
              {link.name}
            </Link>
          );
        })}

```

</details>

### 4.3 Params and searchParams
- 1. params is a promise that resolves to an object containing the dynamic route parameters (like id)
- 2. searchParams is a promise that resolves to an object containing the query parameters(like filters and sorting)
- 3. page.tsx has access to both params and searchParams, 
- 4. layout.tsx only has acceess to params 

<details>
<summary><code>Params and searchParams</code></summary>

```ts
const  NewsArticle = async ({params, searchParams}:{
    params: Promise <{articleId: string}>;
    searchParams: Promise<{lang?:"en"|"fr"|"es"}>
}) => {
    const {articleId} = await params;
    const {lang ="en"} = await searchParams;
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

```
</details>


<details>
<summary><code>use hook Params and searchParams</code></summary>

```ts
'use client'
import {use} from 'react'
const  NewsArticle =  ({params, searchParams}:{
    params: Promise <{articleId: string}>;
    searchParams: Promise<{lang?:"en"|"fr"|"es"}>
}) => {
    const {articleId} = use(params) ;
    const {lang ="en"} = use(searchParams) ;
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

```
</details>


### 4.4  Navigating Programmatically

<details>
<summary> <code> useRouter -history stack</code></summary>

```ts
'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
const OrderProduct = () => {
    const router = useRouter();
    const handleClick =() =>{
        router.replace('/')        //replace route in history stack
        // router.push('/')            //add route to history stack
        // router.back()                //route previous page
        // router.refresh()             //refresh same page
    }
  return (
    <div>
        <h1>Order Product</h1>
        <button onClick ={handleClick} className="border-2 cursor-pointer"> Place order</button>
      
    </div>
  )
}

export default OrderProduct


```

</details>


<details>
<summary> <code> redirect()</code></summary>

```ts
import {redirect} from 'next/navigation'
const OrderProduct = () => {
    const router = useRouter();
    const handleClick =() =>{
       redirect('/')
    }
  return (
    <div>
        <h1>Order Product</h1>
        <button onClick ={handleClick} className="border-2 cursor-pointer"> Place order</button>
      
    </div>
  )
}

export default OrderProduct

```
</details>


### 4.5 Templates

#### 1. What are templates?
-  Templates are similar to layouts also share UI between multiple pages render children components
- When a user navigatese between routes sharing a template 
- a new template component instance is mounted
- DOM elements are recreated
- state is cleared
- effects are re-synchronized

---

## 5. ⏳ **Loading & Error UI**
- Loading UI  -Loading()
- Error Handling  -ErrorBoundary()
- Recovering from Errors  -reset || reload
- Handling Errors in Nested Routes  
- Handling Errors in Layouts  
- Handling Global Errors  


### 5.2 Error
- ⚠️ Remember: error.tsx must be a Client Component (include 'use client' at the top).

- It automatically wraps route segments and their nested children in error boundary

- can create custome error UIs for specific segments using file-sys hierarchy
- It isolates errors to affected segments while keeping the rest of app functional

- It enables you to attemp to recover from an error without requiring a full page reload
---

<details>
<summary> <code>error page </code> </summary>

```ts
'use client'

import { useEffect } from 'react'

type ErrorProps = {
  error: Error
  reset: () => void
}
//reset is a function that can be called to reset the error boundary state and try rendering the children again
//error is the error that was thrown in the child component
export default function Error({ error, reset }: ErrorProps) {

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}


'use client'
import {useRouter} from 'next/navigation'
import {startTransition} from 'react'

type ErrorProps = {
  error: Error
  reset: () => void
}
//reset is a function that can be called to reset the error boundary state and try rendering the children again
//error is the error that was thrown in the child component
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const router = useRouter()
  //startTransition is used to mark the state update as a transition, which allows React to optimize rendering
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })}

    return(
   
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={reload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}


```

</details>


### 5.4 Handling Errors in Nested Routes

- Errors always bubble up to find the closest parent error boundary
- error file handles errors not just for its folder, but for all the nested children segments below it too

### 5.5 Handling Errors in Layouts 

- Error file can not catch the error from the layout file at the same level
- The parent error file will handle the error

### 5.6 Handling global errors

- Since the error file can not catch the error from the layout, what about the root layout?
- global-error.tsx in root directory will handle it


```txt
app
  └─  rootlayout.tsx    -- if an error in rootlayout
  └─  rooterror.tsx     --handle errors in all children routes 
  └─ global-error.tsx   -- handle errors in root

```

- Global error needs to  work in production mode
- global-error requires html and body tags to be rendered
``` bs
npm run build
npm run start
```



## 6. 🔀 **Advanced Routing**
- Parallel Routes  
- Unmatched Routes  
- Conditional Routes  
- Intercepting Routes  
- Parallel Intercepting Routes 

### 6.1 Parallel Routes
```txt
complex-dashboard        rul: /complex-dashboard
  └─  @login 
        └─page.tsx
  └─  @notifications 
      └─achived        rul: /complex-dashboard/achived
  └─  @revenue
        └─default.tsx   //fallback when not match url
        └─page.tsx
  └─  @users
        └─default.tsx
        └─page.tsx
  └─ page.tsx
  └─ default.tsx
  └─ layout.tsx


```


#### Use cases
- Dashboards with multiple sections
- Split-view interfaces
- multi-pane layouts
- complex admin interfaces

#### How are parallel Routes better than components

- 1. Each slot can have its own (independent route handling) loading, error, and layout...
     ![2025-04-06_231034](https://github.com/user-attachments/assets/10e0cf00-98e9-452b-bfe8-31c9c705ac76)
- 2. Each slot can have its route sub-navigation
  ![2025-04-06_231125](https://github.com/user-attachments/assets/d4c0fbc3-cb85-42a1-8776-c8da6d7220cf)

### 6.2 Unmatched Routes 
- /complex-dashboard

<img src="https://github.com/user-attachments/assets/778bdc36-1cce-4ca3-ac3f-58dcc7c7ca21" alt="description" width="400" height="350" />


- Navigate from the UI   /complex-dashboard/archived
- When navigating through the UI, nextjs keeps showing whatever was in the unmatched slots before

<img src="https://github.com/user-attachments/assets/53a3e65a-4a15-406f-af90-3cffb5337703" alt="description" width="400" height="350" />

-  /complex-dashboard/archived page reload ->use fallback default.tsx
- next.js looks for a 'default.tsx' file in each unmatched slot. This file is critical as it serves as a fallback to render content when the framework cannot retrieve a slot's active state from the current URL

  <img src="https://github.com/user-attachments/assets/d6445412-79e0-4a97-abdb-796af95ddfaf" alt="description" width="400" height="350" />

### 6.3 Conditional Routes 
- using ternory or logical operations to render slots
- e.g. login? (a) :(b)         login &&(a)


### 6.4 Intercepting Routes  
- Intercepting routes is an advanced routing mechanism that allows you to load a route from another part of your app within the current layout

- It's useful when you want to display new content while keeping your user in the same context
| Pattern | Description |
|---------|-------------|
| `(.)`folder | Intercepts same level |
| `(..)`folder | One level above |
| `(..)(..)`folder | Two levels above |
| `(...)`folder | Intercepts from root |
|`(../../..)`| – Multiple levels up|

### This is particularly useful for:

- Modals (e.g., opening a login modal from any page while preserving the background content).

- Parallel UI (e.g., expanding a photo gallery in-place without leaving the feed).

- Dynamic overlays (e.g., quick previews, side panels).

### 6.5 Parallel Intercepting Routes

```
// File structure
/photo-feed
├── @modal
│   └── (..)[id]
│         └── page.tsx       // Intercepted modal view (click on image)
├── [id]
│     └── page.tsx          // Full-page view 
|     
└── page.tsx               // Page with links to photo modal
```

# Next.js Intercepting Routes Behavior

## Core Principle
- **Direct URL Visit**: Displays the original full page
- **Link from Sibling Path**: Displays content in a modal/overlay

## Behavior Table

| Access Method        | Displays             | URL Example | Use Case                     |
|----------------------|----------------------|-------------|------------------------------|
| Direct URL Visit     | Original full page   | `/photo-feed/1`  | User types URL or refreshes   |
| Link from Sibling    | Modal/Overlay        | `/photo-feed/1`  | In-context interactions      |

## How Next.js Decides Rendering
1. **Direct Access** → Bypasses `@modal`, renders `/photo-feed/[id]/page.tsx`  
2. **Intercepted Access** → Looks for matching `(..)` in `@modal`, renders slot content  


## 7. 🧩 **Route Handlers & API**
- Route Handlers                /api/comments/route.ts
- GET Request                    export async function GET() 
- POST Request                   export async function POST() 
- Dynamic Route Handlers        /[id]
- PATCH Request  
- DELETE Request  
- URL Query Parameters          
- Headers in Route Handlers  
- Cookies in Route Handlers  
- Redirects in Route Handlers    //redirect("/api/v2/users"); 
- Caching in Route Handlers  


<details> 
<summary> <code> URL Query Parameters    </code> </summary>

```ts
// query?=
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;
  return Response.json(filteredComments);
}

```
</details>


<details> 
<summary> <code>  Headers in Route Handlers     </code> </summary>

```ts
const requestHeaders = new Headers(request.headers);
//headers
  console.log(requestHeaders.get("Authorization"));

  const headersList = await headers();
  console.log(headersList.get("Authorization"));

//cookies
  const theme = request.cookies.get("theme");
  console.log(theme);

//set cookies
  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");
  console.log(cookieStore.get("resultsPerPage"));


```
</details>
 

### 7.8 Headers in Route Handlers  
- profile/api

- Headers can be grouped according to their contexts:

- 1. Request headers :Contain more information about the resource to be fetched, or about the client requesting the resource.

- 2. Response headers
Hold additional information about the response, like its location or about the server providing it.

```ts
return new Response("<h1>Profile API data</h1>", {
    //response headers
    headers: {
      "Content-Type": "text/html", 
      "Set-Cookie": `theme=dark`,
    },
  });

```

- 3. Representation headers
Contain information about the body of the resource, like its MIME type, or encoding/compression applied.

- 4. Payload headers
Contain representation-independent information about payload data, including content length and the encoding used for transport.


### Cookies in Route Handlers 
what are cookies?
Cookies are small pieces of data (key-value pairs) stored on a user's device (client-side) by websites.
# Cookies: Client-Side Key-Value Storage

## Core Functions
- **Session Management**  
  Example: Keep users logged in across website navigation
- **Personalization**  
  Example: Remember language/theme preferences
- **Tracking**  
  Example: User behavior analytics (e.g., Google Analytics)

## Technical Characteristics
| Feature          | Description |
|-----------------|-------------|
| **Storage**     | Client-side, sent via `Cookie` header |
| **Scope**       | Domain/path restricted |
| **Lifetime**    | Session (browser close) / Persistent (set expiry) |

## Common Cookie Types
| Type               | Purpose                     | Example Value        |
|--------------------|-----------------------------|----------------------|
| Authentication     | Verify user sessions        | `session_id=abc123` |
| Preferences        | Store user settings         | `lang=en_US`        |
| Tracking           | Cross-site activity monitoring | `_ga=GA1.2.3.4`   |
| Security           | Prevent CSRF attacks        | `csrf_token=xYz789` |

## Security Attributes
```http
Set-Cookie: 
  id=a3fWa; 
  Expires=Wed, 21 Oct 2025 07:28:00 GMT;
  Secure; 
  HttpOnly; 
  SameSite=Lax
```

 
- Caching in Route Handlers  
route handlers are not cached by default but you can opt into caching while using the GET method and only GET method

```ts
export const dynamic = "force-static";  //force to use cached static response
export const revalidate = 10;      //after build, revalidate evey 10 second

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
```
---

## 8. 🛡️ **Middleware & Security**
# 🧩 Middleware in Next.js

Middleware allows you to run code **before a request is completed**. It's useful for things like authentication, redirects, logging, and more.


## 📍 What Is Middleware?

Middleware acts like a request interceptor. It runs **before rendering a page or hitting an API route**, letting you:

- Check authentication or session
- Redirect users
- Rewrite URLs
- Add headers or cookies
- Log requests
- Perform A/B testing or feature flags


## 🗂️ Where Do You Put Middleware?

You create a file called: middleware.ts

This should go in the **root directory** of your project (next to your `app/` or `pages/` folder).

---

## 🧪 Basic Example

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (!request.cookies.get('token') && url.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // Allow the request to continue
}
```

🎯 Target Specific Routes

Middleware lets you specify paths where it should be active, using:

Custom matcher config
Conditional statements (if)

```ts
export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};
//This will only apply middleware to routes under /dashboard and /settings.

```

📁 Recommended Folder Structure for multiple middlewares

```text

middleware.ts         //root middle ware, import the middleware logic from  lib/middleware/index.ts
lib/
└── middleware/
    ├── auth.ts
    ├── logging.ts
    ├── redirect.ts
    └── index.ts            //compose middleware logic
```
🚀 Root Middleware File
``` ts

import type { NextRequest } from 'next/server';
import { runMiddlewares } from './lib/middleware';

export function middleware(request: NextRequest) {
  return runMiddlewares(request);
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'], // Adjust as needed
};

```


---

## 9. 🧑‍🎨 **Rendering Techniques**
- Rendering  
- Client-side Rendering (CSR)   
- Server-side Rendering (SSR)  
- Suspense SSR  
- Static Rendering  
- Dynamic Rendering  （ISR）

- React Server Components            //default, server side logic, such as data fetching
- Client Components                  // for interacting with user, forms, buttons events 
- Rendering Lifecycle in RSCs        



## ✅ Rendering Methods Overview

| Rendering Method   | Analogy                                 | When Page is Generated       | Initial Speed | Is Data Fresh? | Best Use Case                     |
|--------------------|------------------------------------------|-------------------------------|----------------|----------------|-----------------------------------|
| **CSR**            | 🧑‍🍳 Raw ingredients + recipe to cook yourself | On the client (after JS loads) | ❌ Slow        | ✅ Fresh        | Highly interactive SPA            |
| **SSR**            | 👨‍🍳 Kitchen cooks and delivers hot meal   | On each request (server-side) | ✅ Fast        | ✅ Fresh        | Dynamic pages, auth-required data |
| **SSG**            | 🏭 Factory pre-cooked meals               | At build time (pre-rendered)  | ⚡️ Very fast  | ❌ Stale        | Blogs, documentation              |
| **ISR**            | 🏭 Pre-cooked + chef periodically updates | Build time + background regen | ✅ Fast        | ✅ Fairly fresh | Product listings, news            |
| **Suspense SSR**   | 🍽 Appetizer first, main dish later       | SSR + Lazy component loading  | ✅ Partial fast| ✅ Fresh        | Smooth UX with partial hydration  |



## 🎨 Flow Diagram (Rendered)

```
          ┌────────────┐
          │ User requests │
          └────┬───────┘
               │
    ┌──────────▼──────────┐
    │ Choose Render Method │
    └──────────┬──────────┘
               │
 ┌─────────────▼─────────────┐
 │      Restaurant Analogy    │
 └───────────────────────────┘

   🍳 CSR: raw materials delivered to user
   🍛 SSR: hot meal cooked on-demand by server
   🥡 SSG: pre-cooked factory meal, ready to eat
   🔄 ISR: factory meal + background refresh
   🍽 Suspense SSR: appetizer first, then main
```



## 🧠 What HTML Does the Client Receive?

### 9.1. **CSR** - Client-side Rendering, bed for SEO and slow, heavy computation on client side.

```html
<div id="__next"></div>
<script src="/main.js"></script>
```

> No content until JS loads and executes.



### 9.2. **SSR** - Server-side Rendering better SEO and direct access to server-side resources, improved security

```html
<div id="__next">
  <h1>Post Title</h1>
  <p>Loaded from server</p>
</div>
```

> Full HTML content is sent, interactive once hydrated.



### 9.3. **SSG** - Static Site Generation - generated on build

```html
<div id="__next">
  <h1>Static Blog Post</h1>
  <p>Content from build time</p>
</div>
```

> Very fast, but data may be outdated.



### 9.4. **ISR** - Incremental Static Regeneration

```html
<div id="__next">
  <h1>Old Product Details</h1>
</div>
```

> First load gets cached page, server refreshes in the background.



### 9.5. **Suspense SSR** - Partial Streaming

```html
<div id="__next">
  <h1>Page Title</h1>
  <Suspense fallback="Loading...">
    Loading...
  </Suspense>
</div>
```

> Partial render with progressive loading for slow components.



## ✨ Recap Mnemonic

```
CSR: Raw food at home
SSR: Cooked and served hot
SSG: Pre-packed frozen meal
ISR: Pre-cooked + background refresh
Suspense SSR: Eat while more dishes come
```



## 9.7💧 What is Hydration in Next.js?

**Hydration** is the process where the browser takes over a server-rendered (or statically rendered) HTML page and makes it interactive by attaching JavaScript event handlers.

### 🧪 Analogy:
Imagine you receive a beautifully plated meal (HTML), but it's just plastic food. **Hydration** is when the chef comes in and swaps it with real hot food (interactive JavaScript-powered content).

### 🔄 When Does Hydration Happen?
- After the HTML is loaded by the browser
- When React reattaches event listeners and makes the page interactive

### ⚙️ How It Relates to Rendering:
| Rendering Type | Requires Hydration? | Why?                                     |
|----------------|---------------------|------------------------------------------|
| **CSR**        | ✅ Yes              | JS renders everything on client          |
| **SSR**        | ✅ Yes              | HTML sent, needs JS to become interactive|
| **SSG**        | ✅ Yes              | Static HTML needs JS interactivity       |
| **ISR**        | ✅ Yes              | Same as SSG with updates                 |
| **Suspense SSR**| ✅ Yes              | Streams content, then hydrates chunks    |

### 🧠 Visualization:

```txt
Step 1: Server/Static HTML
<div id="__next">
  <button>Click me</button>
</div>

Step 2: Hydration (JS attaches handlers)
document.querySelector("button").addEventListener("click", ...)
```

Without hydration, even though the button is visible, clicking it won’t do anything!



- React Server Components            
server components are rendered exclusively on the server
- Client Components   
rendered once on the server and then on the client

- Rendering lifecycle

## 10.⚙️ **Rendering Strategies**
- Server Rendering strategies
- Static Rendering
- Dynamic Rendering
- generateStaticParams()  generate some params static at build  
- DynamicParams           
- Streaming  

### 10.1 Server Rendering strategies:
 - Static Rendering: generate html when building - default prerender once when build and serve   after build you can find .html in .next/app/
 - Dynamic Rendering: generate personalized data (cookie, profile) available at request time and not ahead of time during prerendering.
 Nextjs automatically switches to dynamic rendering for an route while detects dynamic functions / dynamic API
   - 1. cookies()
   - 2. headers()
   - 3. connection()
   - 4. draftMode()
   - 5. searchParams prop
   - 6. after()
- Streaming <Suspense>
Allows for progressive UI rendering from server
Breaks down into smaller chunks and streamed to the client when ready

### 10.2 GenerateStaticParams
generateStaticParams() function
- works alongside dynamic route segments
- to generate static routes during build tiem
- instead on demand at request time

<details>

<summary> <code> **Code Sample**</code> </summary>

``` ts
//books/1   books/2 books/3 are static rendered at build
export async function generateStaticParams() {
    return [{bookId: '1'}, {bookId: '2'}, {bookId: '3'}]
}

export default async function BookPage({params,}:{params: Promise<{bookId: string}>;})  {
  
  const bookId = await params
    return (
    <div>
        <h1 className='text-4xl font-bold'>Book Page</h1>
        <p className='text-2xl'>Book ID: {bookId.bookId}</p>
        
      
    </div>
  )
}

```
</details>


- Multiple static Params

books/[genre]/[bookId]

``` text
Books
  └─ genres
       └─ book
```
```ts
export async function generateStaticParams() {
    return [{genre:"novle", bookId: '1'}, {genre:"fiction", bookId: '2'}, {genere："mystery", bookId: '3'}]
}
```


### 10.3 DynamicParams
control what happens when a dynamic segment is visited that was not generated with generateStaticParams() 

- true  statically render pages on demand not included in generateStaticParams() 
- false  return 404

```ts
export const dnamicParams = false;
```
 

### 10.4 Streaming

```ts
<Suspense fallback={<p>Loading...</p>}>
<Product /> 
</Suspense>

```

---


## 11.🧩 **Composition & Code Strategy**
- Server and Client Composition Patterns  
- Server-only Code  
- Third Party Packages  
- Context Providers  
- Client-only Code  
- Client Component Placement  
- Interleaving Server and Client Components 




## 11.1. 🌐 Server and Client Composition Patterns

### 💡 What are Server and Client Components?
- **Server Component**: Default type in Next.js, rendered on the server. Ideal for fetching data, rendering HTML, and offloading logic from the client.
- **Client Component**: Declared with `"use client"` directive. Runs on the browser, handles UI interactivity, state, event listeners.

### ✅ Composition Rule
- ✅ Server Components **can include** Client Components. 
  - Server components need to wrap Client Components('use client'), import the component, and put the client logic in a seperate compoent
  - In the compoent tree,  all children  components under a  client component must be client components
- ❌ Client Components **cannot include** Server Components.



## 11.2. 🔒 Server-only Code  

server-only Package

```bs
npm install server-only
```

### ✅ Use in Server Components only:
- Database access (Prisma, MongoDB)
- File system operations (fs)
- Environment variables
- Backend services (Auth, Redis)

### ❌ DO NOT include in Client Components:
- Anything with `process.env`
- `fs`, `path`, Node.js-only modules

### Example:
```tsx
// can only run on server, can not run on client 
import "server-only"
import { getServerSession } from "next-auth";

export default async function ServerComponent() {
  const session = await getServerSession();
  return <div>{session?.user?.name}</div>;
}
```



## 11.3. 📦 Third Party Packages 

### Package Usage Strategy:
| Package Type        | Use in Client | Use in Server | Example              |
|---------------------|---------------|---------------|----------------------|
| UI/DOM Libraries    | ✅            | ❌            | Chart.js, Leaflet    |   must put 'use client'
| Utility Libraries   | ✅            | ✅            | Lodash, Day.js       |
| Server-side Libs    | ❌            | ✅            | Prisma, Bcrypt, fs   |
| Hybrid Libraries    | ✅ if safe     | ✅            | Axios, Zod           |

> ✅ **Pro tip**: Check if a package uses `window`, `document`, or Node-specific APIs before using it.
 



## 11.4. 🌐 Context Providers  must be **Client Components** 

### ⚙️ Strategy:
- Global contexts like `ThemeProvider`, `I18nProvider` can be in **Server Components**.
- Stateful contexts like `AuthProvider`, `SocketProvider` must be **Client Components** (because they rely on browser APIs).

### Example:
```tsx
// layout.tsx (Server Component)
import ThemeProvider from './ThemeProvider';

export default function Layout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// AuthLayout.tsx (Client Component)
"use client";
import AuthProvider from './AuthProvider';

export default function AuthLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
```

---

## 11.5. 🧠 Client-only Code   - only run on client component

client-only package:

```tsx
import `"client-only"` 

```


## 11.6. 🔄 Interleaving Server and Client Components



### 🔄 Server vs Client Component Nesting

| ✅ Valid Nesting   | ✅/❌ Allowed? | 💡 How to Do It                                                                 |
|--------------------|---------------|---------------------------------------------------------------------------------|
| Server ➝ Server    | ✅ Yes         | Directly import and use                                                        |
| Server ➝ Client    | ✅ Yes         | Directly import and use                                                        |
| Client ➝ Client    | ✅ Yes         | Directly import and use                                                        |
| Client ➝ Server    | ❌ No          | ❗ Use **inverted pattern** — render Server in parent Server and pass as prop  |


### 🛠️ Workaround: Using Server Component in a Client Component

Since `Client ➝ Server` is not allowed directly, the workaround is:

### ✅ Server ➝ Client ➝ Server (via `children` prop)

### Example

```tsx
// ✅ ServerComponent.tsx
export default async function ServerComponent() {
  return <div>Server Data</div>;
}

// ✅ ClientWrapper.tsx
"use client";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <div className="border p-4">Client Layout: {children}</div>;
}


// page.tsx (server)
import ServerComponent from "./ServerComponent";
import ClientWrapper from "./ClientWrapper";

export default function Page() {
  return (
    <ClientWrapper>
      <ServerComponent />
    </ClientWrapper>
  );
}

```

---

## 13.📡 **Data Fetching and Mutation**
- Data Fetching  
- Fetching Data in Client Components  
- Fetching Data with Server Components  
- Loading and Error States   error.tsx   loading.tsx
- Sequential Data Fetching  
- Parallel Data Fetching  
- Fetching From a Database  


### 13.5 Sequential Data Fetching:
When one fetch depends on another:
e.g.
 fetch all posts
 .then fetch author using userId for each post

 ```ts
 <Suspense
        fallback={
          <div className="text-sm text-gray-500">Loading author...</div>
        }
      >
        <AuthorDetail userId={post.userId} />
  </Suspense>

 ```

### 13.6 Parallel Data Fetching

Fetching data side by side, the data do not depend on each other

albums/userId
posts/userId

``` ts
    const postsData = getUserPosts(userId);
    const albumsData = getUserAlbums(userId);
  
    const [posts, albums] = await Promise.all([postsData, albumsData]);
```


### 13.7 Fetching From a Database  
tools:  SQLite Prisma
Prisma: is a tool to talk to your db
- install and init:
```shell
npm install prisma -D                  
npx prisma init --datasource-provider sqlite
```
- config prisma /prisma/schema.prisma

- migration : migration refers to the process of changing the database schema
3 Things  this command  does:
1. install @prisma/client package
2. generate prisma client
3. execute migration
```shell
npx prisma migrate dev --name init
```

### 13.8 Data mutations:
CRUD 

---

## 14.✍️ **Forms & Server Actions**

- Forms with Server Actions  
- useFormStatus Hook  
- useActionState Hook  
- Separating Server Actions  - keep db logic in server
- useFormStatus vs useActionState  
- Update Server Action  
- Delete Server Action  
- Optimistic Updates with useOptimistic Hook  
- Form Component  

### 14.1 Server Action

**Server Actions** 

- **Server Actions** are asynchronous functions executed on the server.
- They can be called in both **Server and Client Components** to handle form submissions and data mutations.
- **Use Server Actions** when you:
  - Need to perform secure database operations.
  - Want to reduce API boilerplate code.
  - Need progressive enhancement for forms.
  - Want to optimise for performance

 **benefits of Server Actions** :

- **Simplified code**: Server Actions eliminate the need for separate API routes or client-side state management for form data, dramatically simplifying your code.
- **Improved security**: By keeping sensitive operations server-side, Server Actions enhance security and protect against potential threats.
- **Better performance**: With less JavaScript running on the client, Server Actions lead to faster load times and improved core web vitals.
- **Progressive enhancement**: Forms continue to work even if JavaScript fails in the browser, making your apps more accessible and resilient.


### 14.2 useFormStatus Hook 
Hook gives status of last form submission
```ts
const status = useFormStatus()
```
- pending: A boolean indicating if the parent <form> is currently submitting.
- data: An object containing the form's submission data.
- method: The HTTP method used (either 'get' or 'post').
- action: A reference to the function passed to the parent <form> as its onSubmit prop.

### 14.3 useActionState
A React hook that allows to update state based on the result of a form action
It is hellpful for handling form validation and error messages.

### 14.7 useOptimistic
It helps you immediately reflect changes in the UI while waiting for the real data update from the server. This gives your app a snappier and more responsive feel, especially for things like:

Deleting an item

Updating a value

Reordering a list
---

## 15. 🔐 **Authentication **
- Authentication  
- Clerk Setup  
- Sign in and Sign out  
- Profile Settings  
- Conditional UI Rendering  
- Protecting Routes  
- Read Session and User Data  
- Role Based Access Control  
- Customizing Clerk Components  

---

## 16.🚀 **Deployment**
- Deploying Next.js Apps  

---


