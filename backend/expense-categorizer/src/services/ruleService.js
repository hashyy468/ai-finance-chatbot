const RULES = {
  Food: ["restaurant", "starbucks", "pizza", "burger", "zomato", "swiggy", "cafe", "mcdonald"],
  Transport: ["uber", "ola", "lyft", "bus", "train", "metro", "fuel", "petrol"],
  Shopping: ["amazon", "flipkart", "mall", "clothing", "shoes"],
  Utilities: ["electric", "electricity", "water", "internet", "wifi", "rent", "bill"],
  Entertainment: ["netflix", "spotify", "movie", "concert", "prime"]
};

const categorizeByRule = (description) => {
  const text = description.toLowerCase();

  for (const category in RULES) {
    for (const keyword of RULES[category]) {
      if (text.includes(keyword)) {
        return {
          category,
          confidence: 0.92, // ✅ normalized
          method: "rule"
        };
      }
    }
  }
  return null;
};

module.exports = { categorizeByRule };
