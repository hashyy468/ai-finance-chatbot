const RULES = {
  Food: ['restaurant', 'starbucks', 'pizza', 'burger', 'grocery'],
  Transport: ['uber', 'lyft', 'bus', 'train', 'metro', 'fuel'],
  Shopping: ['amazon', 'flipkart', 'mall', 'clothing'],
  Utilities: ['electric', 'water', 'internet', 'rent'],
  Entertainment: ['netflix', 'movie', 'concert', 'spotify']
};

const categorizeByRule = (description) => {
  const text = description.toLowerCase();

  for (const category in RULES) {
    for (const keyword of RULES[category]) {
      if (text.includes(keyword)) {
        return category;
      }
    }
  }

  return null; // trigger AI fallback
};

module.exports = { categorizeByRule };
