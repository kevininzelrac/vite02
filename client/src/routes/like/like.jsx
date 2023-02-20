export async function likeAction({ request }) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const response = await fetch("/api/likeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      });
      const data = await response.json();
      return data;
    }
    case "DELETE": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const response = await fetch("/api/unlikeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      });
      const data = await response.json();
      return data;
    }
  }
}
