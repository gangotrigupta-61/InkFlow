# InkFlow ✍️  (React + Appwrite)🚀

Write_Share_Inspire ✨✨

A full-stack-ready modern blogging platform built with React, Vite, Redux Toolkit, React Router, Tailwind CSS, and Appwrite services.

This project includes ✨:

- Authentication (signup, login, logout)
- Route protection for public/private pages
- Post create, read, update, delete flows
- Rich text editing with TinyMCE
- Image upload and preview via Appwrite Storage

## 1. Tech Stack 🛠️

### Frontend Core

- React 19: UI library for component-driven development
- Vite 8: fast dev server and production bundler
- React Router DOM 7: client-side routing with nested routes
- Redux Toolkit + React Redux: global auth state management

### Forms and Content

- React Hook Form: efficient and scalable form handling
- TinyMCE React: rich text editor for post content
- html-react-parser: render stored HTML content safely into React elements

### Backend Services (BaaS)

- Appwrite SDK:
- Account service for user authentication and session handling
- Databases service for post documents
- Storage service for featured image files

### Styling and Quality

- Tailwind CSS 4 (via Vite plugin)
- ESLint 10 with React Hooks and React Refresh rules

## 2. Feature Overview 🌟

### Authentication

- Create account with email/password/name
- Login with email/password
- Get current session user on app bootstrap
- Logout by deleting active sessions
- Store auth status + user data in Redux

### Protected Routing

- Public-only pages for login/signup
- Auth-only pages for creating, editing, and listing posts
- Redirect rules based on authentication state

### Blog Management

- Create a post with:
- title
- slug
- rich text content
- status (active/inactive)
- featured image
- List posts on home and all-posts pages
- Open single post details by dynamic slug/id route
- Edit and delete author-owned posts

### Rich Content + Media

- TinyMCE editor for writing post content
- Store HTML content in database
- Parse and render HTML in post view
- Upload and preview images from Appwrite Storage

## 3. Architecture Summary 🧩

### App Flow

1. App mounts and checks current user session.
2. Redux auth slice is updated (`login` or `logout`).
3. Router renders pages and `AuthLayout` controls access.
4. Pages call Appwrite service classes for auth, documents, and files.
5. UI components stay mostly reusable (Button, Input, Select, Container, etc.).

### Project Structure

```
src/
	appwrite/
		auth.js        # Auth service wrapper (Account API)
		config.js      # Database/Storage service wrapper
	components/
		post-form/
			PostForm.jsx # Shared create/edit post form
		Header/
		Footer/
		...            # Reusable UI and auth components
	conf/
		conf.js        # Environment variable mapping
	pages/
		Home.jsx
		AllPosts.jsx
		AddPost.jsx
		EditPost.jsx
		Post.jsx
		Login.jsx
		Signup.jsx
	store/
		authslice.js   # Auth state and reducers
		store.js       # Redux store config
```

## 4. Routing Map 🧭

- `/` -> Home (public)
- `/login` -> Login (guest-only)
- `/signup` -> Signup (guest-only)
- `/all-posts` -> All posts (auth-only)
- `/add-post` -> Create post (auth-only)
- `/edit-post/:slug` -> Edit post (auth-only)
- `/post/:slug` -> Post details (public)

## 5. Environment Variables 🔐

Create a `.env` file in the project root and define:

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

These values are read in `src/conf/conf.js` and used by Appwrite service classes.

## 6. Local Development 💻

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build for production:

```
npm run build
```

Preview production build:

```
npm run preview
```

Lint code:

```
npm run lint
```

## 7. Appwrite Setup Checklist ☁️

1. Create an Appwrite project.
2. Create a database.
3. Create a collection for posts with fields like:
- `title` (string)
- `content` (string / long text)
- `featuredImage` (string)
- `status` (string)
- `userId` (string)
4. Create a storage bucket for images.
5. Configure permissions for documents/files based on your auth model.
6. Copy all generated IDs into `.env`.

## 8. Final Note 

Made with ❤️ by Gangotri!!

Open to collaboration and suggestions to improve this project further. 🤝

