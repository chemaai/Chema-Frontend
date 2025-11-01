export default async function handler(request, response) {
  try {
    return response.status(200).json({ message: "✅ Chema API online" });
  } catch (error) {
    console.error("API error:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
