module.exports = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Chema test function working ✅ (CommonJS version)" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
