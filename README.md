
# 🚀 Next.js Tutorial

## 📁 Folder Structure
```bash
client      /app            page.jsx or page.tsx      "use client"
server      /app/api        route.js or route.ts      "use server"
```

---


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
```bash
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
| `template.js` | Per-navigation rendering |
| `error.js` | React error boundary |
| `loading.js` | Suspense fallback |
| `not-found.js` | 404 error UI |
| `page.js` / `page.tsx` | Required route component |

### 2.2 🔄 Component Hierarchy
```text
Route
    └ layout.js
    └ template.js
    └ error.js
    └ loading.js
    └ not-found.js
    └ page.js
```

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


### 3.4 Routing Metadata 
- powerful feature that allows defining various metadata for each page
- 2 ways to handle metadata in layout or page
- 1.export a static metadata object
- 2. export  generateMetadata() a function to dynamic generate metadata


**Static Metadata**
```ts
export const metadata = {
  title: 'My Page',
};
```

**Dynamic Metadata**
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

##### Metadata Rules:
- 1) layout metadata apply to all its pages, page is specific to that page
- 2) flows top-down order starting from the root level
- 3) when metadata exists in multiple places along a route , they merge together with page metadata override layout metadata for matching properties
- 4) Specificity: page metadata > layout metadata >parent metadata >root metadata

## How to solve this error:
> **❗ Error:** `You are attempting to export "generateMetadata" from a component marked with "use client", which is disallowed`

- 1) create a client component 'use client' and export 
- 2) import the client component in page.tsx  and export metadata in page.tsx   

---


### 🔗 **Navigation**
- Linking Component Navigation  
- Active Links  
- params and searchParams  
- Navigating Programmatically  
- Templates  

---

### ⏳ **Loading & Error UI**
- Loading UI  
- Error Handling  
- Recovering from Errors  
- Handling Errors in Nested Routes  
- Handling Errors in Layouts  
- Handling Global Errors  

---

### 🔀 **Advanced Routing**
- Parallel Routes  
- Unmatched Routes  
- Conditional Routes  
- Intercepting Routes  
- Parallel Intercepting Routes  

---

### 🧩 **Route Handlers & API**
- Route Handlers  
- GET Request  
- POST Request  
- Dynamic Route Handlers  
- PATCH Request  
- DELETE Request  
- URL Query Parameters  
- Headers in Route Handlers  
- Cookies in Route Handlers  
- Redirects in Route Handlers  
- Caching in Route Handlers  

---

### 🛡️ **Middleware & Security**
- Middleware  

---

### 🧑‍🎨 **Rendering Techniques**
- Rendering  
- Client-side Rendering (CSR)  
- Server-side Rendering (SSR)  
- Suspense SSR  
- React Server Components  
- Server and Client Components  
- Rendering Lifecycle in RSCs  
- Static Rendering  
- Dynamic Rendering  

---

### ⚙️ **Params & Streaming**
- generateStaticParams  
- dynamicParams  
- Streaming  

---

### 🧩 **Composition & Code Strategy**
- Server and Client Composition Patterns  
- Server-only Code  
- Third Party Packages  
- Context Providers  

---

### 💻 **Client Components**
- Client-only Code  
- Client Component Placement  
- Interleaving Server and Client Components  

---

### 📡 **Data Fetching**
- Data Fetching  
- Fetching Data in Client Components  
- Fetching Data with Server Components  
- Loading and Error States  
- Sequential Data Fetching  
- Parallel Data Fetching  
- Fetching From a Database  

---

### ✍️ **Forms & Server Actions**
- Data Mutations  
- Forms with Server Actions  
- useFormStatus Hook  
- useActionState Hook  
- Separating Server Actions  
- useFormStatus vs useActionState  
- Update Server Action  
- Delete Server Action  
- Optimistic Updates with useOptimistic Hook  
- Form Component  

---

### 🔐 **Authentication (Clerk)**
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

### 🚀 **Deployment**
- Deploying Next.js Apps  

---




## 1. 📂 File System-Based Routing

comments/[id]  ➝  Dynamic route segment
```
### 1.1 📌 Dynamic Route Segment
```bash
/
### 1.2 🌀 Catch-all & Optional Catch-all Segments

- **Catch-all**  
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
```bash
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

## 2. 📑 Special Files

### 2.1 📁 Files in a Route
| File | Description |
|------|-------------|
| `layout.js` | Shared UI and state |
| `template.js` | Per-navigation rendering |
| `error.js` | React error boundary |
| `loading.js` | Suspense fallback |
| `not-found.js` | 404 error UI |
| `page.js` / `page.tsx` | Required route component |

### 2.2 🔄 Component Hierarchy
```text
layout.js
  └ template.js
    └ error.js
      └ loading.js
        └ not-found.js
          └ page.js
```

### 2.3 ✅ Page Requirements
- `page.js` is **required**
- Must `export default` a React component

### 2.4 🧱 Layouts

#### a) What is a Layout?
- A layout is UI shared between pages
- Must default export a component that takes `children`

#### b) Nesting
- Layout in a route folder applies to all child routes
```bash
/products/[id] ➝ Uses root layout + productIdLayout()
```

#### c) Multiple Root Layouts
- Group routes like `(auth)` and `(marketing)` can have their own root layout

---

## 3. 🧠 Routing Metadata

### 3.1 Defining Metadata

**Static Metadata**
```ts
export const metadata = {
  title: 'My Page',
};
```

**Dynamic Metadata**
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

> **❗ Error:** `You are attempting to export "generateMetadata" from a component marked with "use client", which is disallowed`

### 3.2 ✅ How to Solve:
1. Move dynamic logic to a **client component** (`"use client"`).
2. Import the client component in `page.tsx`.
3. Export `generateMetadata` from **server component only**.

### 3.3 Metadata Rules

1. **Layout metadata** applies to all pages inside the layout.
2. Metadata flows **top-down** from root.
3. Metadata **merges**, with the following precedence:
    - Page metadata > Layout metadata > Parent layout > Root layout
4. Cannot use `generateMetadata` in `"use client"` components.

---

