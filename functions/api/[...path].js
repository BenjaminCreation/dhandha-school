export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");
  const backendUrl = `${env.BACKEND_WORKER_URL}${path}${url.search}`;

  // Create a new request with the same method, headers, and body
  const newRequest = new Request(backendUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: "manual",
  });

  // Forward the request to the backend worker
  return await fetch(newRequest);
}
