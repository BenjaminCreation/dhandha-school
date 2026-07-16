export async function onRequest(context) {
  try {
    const { request, env } = context;
    
    // Check if BACKEND_WORKER_URL is set
    if (!env.BACKEND_WORKER_URL) {
      return new Response(JSON.stringify({ success: false, error: "BACKEND_WORKER_URL not set" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const url = new URL(request.url);
    const path = url.pathname.replace("/api", "");
    const backendUrl = `${env.BACKEND_WORKER_URL}${path}${url.search}`;
    console.log(`Proxying ${request.method} ${request.url} to ${backendUrl}`);

    // Create a new request with the same method, headers, and body
    const newRequest = new Request(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "manual",
    });

    // Forward the request to the backend worker
    const response = await fetch(newRequest);
    console.log(`Backend response status: ${response.status}`);
    return response;
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
