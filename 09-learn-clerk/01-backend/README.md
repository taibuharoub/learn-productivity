# Nodejs/ExpressJS

Quickly add authentication and user management to your Node.js application.

## Set up Clerk Node.js

### 1. Create a Clerk application

### 2. Install @clerk/clerk-sdk-node

```bash
npm install @clerk/clerk-sdk-node
```

### 3. Set environment variables

## Available methods

All resource operations are mounted as sub-APIs on the clerkClient object. To access the resource operations, you must first instantiate a clerkClient instance.

[See](https://clerk.com/docs/references/nodejs/available-methods)

## Multi-session applications

If Clerk is running in multi-session mode, it's important to ensure your frontend sends the Session ID that is making the request.

Our middleware will look for a query string parameter named `_clerk_session_id`. If this parameter is not found, the middleware will instead choose the last active session, which may be subject to race conditions and should not be relied on for authenticating actions.

## Connect/Express middlewares

> Handling requests with Node.js and Express

### Node.js and Connect/Express Middleware

The Clerk Node SDK offers two authentication middlewares specifically for Express and Connect/Express compatible frameworks such as Gatsby and Fastify.

#### 1. ClerkExpressWithAuth()

`ClerkExpressWithAuth()` is a lax middleware that returns an empty auth object when an unauthenticated request is made.

#### 2. ClerkExpressRequireAuth()

`ClerkExpressRequireAuth()` is a strict middleware that raises an error when an unauthenticated request is made.

## Error handling

Node SDK functions throw errors (`ClerkAPIResponseError`) when something goes wrong. You'll need to catch them in a try/catch block and handle them gracefully.