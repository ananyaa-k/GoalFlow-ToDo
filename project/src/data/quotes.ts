export const motivationalQuotes = [
  // Cybersecurity / Resilience
  {
    text: "Security is a process, not a product.",
    author: "Bruce Schneier",
    category: "cybersecurity"
  },
  {
    text: "Attackers think in graphs. Defenders think in lists.",
    author: "John Lambert",
    category: "cybersecurity"
  },
  {
    text: "Only amateurs attack machines; professionals target people.",
    author: "Bruce Schneier",
    category: "cybersecurity"
  },
  {
    text: "There are no secure systems — only secure engineers.",
    author: "Industry Wisdom",
    category: "cybersecurity"
  },
  
  // AI / Research / Curiosity
  {
    text: "The greatest threat of AI is thinking we fully understand it.",
    author: "AI Safety Researcher",
    category: "ai"
  },
  {
    text: "Every model is wrong, but some are useful.",
    author: "George Box",
    category: "research"
  },
  {
    text: "The most exciting phrase to hear in science is not 'Eureka', but 'That's funny...'",
    author: "Isaac Asimov",
    category: "research"
  },
  {
    text: "LLMs will fail in weird ways you haven't imagined yet. Go find those ways.",
    author: "LLM Red Team Philosophy",
    category: "ai"
  },
  
  // Consistency / Builder Mindset
  {
    text: "You are what you repeatedly do. Excellence, then, is not an act but a habit.",
    author: "Will Durant (paraphrasing Aristotle)",
    category: "consistency"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "consistency"
  },
  {
    text: "Build relentlessly. Ship relentlessly.",
    author: "Builder Ethos",
    category: "builder"
  },
  {
    text: "Research is 90% failure — be proud of documenting the 90%.",
    author: "Research Culture",
    category: "research"
  },
  
  // Additional AI Security focused
  {
    text: "In AI security, paranoia is a feature, not a bug.",
    author: "Security Mindset",
    category: "ai-security"
  },
  {
    text: "Red team today, secure tomorrow.",
    author: "Offensive Security",
    category: "ai-security"
  },
  {
    text: "Every prompt is a potential attack vector. Every response is a potential leak.",
    author: "LLM Security Principle",
    category: "ai-security"
  }
];

export const getRandomQuote = () => {
  const today = new Date().toDateString();
  const hash = today.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const index = Math.abs(hash) % motivationalQuotes.length;
  return motivationalQuotes[index];
};

export const getQuoteByCategory = (category: string) => {
  const categoryQuotes = motivationalQuotes.filter(q => q.category === category);
  if (categoryQuotes.length === 0) return getRandomQuote();
  
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  return categoryQuotes[randomIndex];
};