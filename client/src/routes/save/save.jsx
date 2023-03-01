export async function saveAction({ request }) {
  console.log("saveAction");
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  console.log(update);
  const response = await fetch("/api/updatePage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(update),
  });
  const data = await response.json();
  console.log(data);
  return data;
}
