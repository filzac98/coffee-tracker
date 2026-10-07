// Server Components run inside Docker and reach the backend by its service name.
// The browser runs outside Docker and uses the published port on localhost.
export const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL ?? "http://localhost:3000"
    : "http://localhost:3000";
