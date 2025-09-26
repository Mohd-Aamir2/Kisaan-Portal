import fetch from "node-fetch";

export const getMarketPrices = async (req, res) => {
  const { district } = req.params;
  const API_KEY = process.env.API_KEY; 

  try {
    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[district]=${district}&limit=200`
    );

    if (!response.ok) {
      return res.status(response.status).json({ message: "Error fetching API data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
