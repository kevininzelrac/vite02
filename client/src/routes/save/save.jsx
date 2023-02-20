export async function saveAction({ request }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  const response = await fetch("/api/updatepage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(update),
  });
  const data = await response.json();
  return data;
}
