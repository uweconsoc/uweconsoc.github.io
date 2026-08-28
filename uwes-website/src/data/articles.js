function getTerm(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month >= 1 && month <= 4) return `Winter ${year}`;
  if (month >= 5 && month <= 8) return `Spring ${year}`;
  return `Fall ${year}`;
}

export function groupByTerm(articles) {
  const groups = {};
  articles.forEach((article) => {
    const term = getTerm(article.date);
    if (!groups[term]) groups[term] = [];
    groups[term].push(article);
  });
  return groups;
}

export const researchArticles = [
  {
    title: "Modeling Inflation Expectations in Post-Pandemic Markets",
    date: "Aug 12, 2026",
    author: "Research Team",
    excerpt: "Consumer inflation expectations have remained stubbornly elevated even as headline inflation cools. This piece examines the gap between survey-based and market-based measures.",
  },
  {
    title: "The Economics of University Housing Shortages",
    date: "Aug 5, 2026",
    author: "Research Team",
    excerpt: "Waterloo's student housing market illustrates broader supply-side constraints facing Canadian cities. We model the effects of zoning restrictions on rental affordability.",
  },
  {
    title: "ESG Investing: Signal or Noise?",
    date: "Jul 29, 2026",
    author: "Research Team",
    excerpt: "As ESG funds attract record inflows, questions remain about whether ESG scores meaningfully predict long-term financial performance or simply reflect sector composition.",
  },
  {
    title: "Behavioral Biases in Retail Investing",
    date: "Jul 22, 2026",
    author: "Research Team",
    excerpt: "The rise of retail trading platforms has brought behavioral finance concepts into sharp focus. We review evidence on overconfidence and herding among retail investors.",
  },
  {
    title: "Trade Policy and Supply Chain Resilience",
    date: "Jul 15, 2026",
    author: "Research Team",
    excerpt: "Firms are increasingly prioritizing supply chain resilience over cost minimization. This article explores the economic trade-offs of reshoring and diversification strategies.",
  },
  {
    title: "Currency Pegs Under Pressure",
    date: "Jul 8, 2026",
    author: "Research Team",
    excerpt: "Several emerging market currencies have faced renewed pressure this year. We analyze the conditions that make fixed exchange rate regimes vulnerable to speculative attacks.",
  },
  {
    title: "The Productivity Paradox Revisited",
    date: "Jun 10, 2026",
    author: "Research Team",
    excerpt: "Despite rapid technological advancement, productivity growth has remained sluggish across advanced economies. We revisit long-standing explanations for this paradox.",
  },
  {
    title: "Winter Term Research Highlights",
    date: "Apr 5, 2026",
    author: "Research Team",
    excerpt: "A roundup of the research team's key findings from the winter term, spanning topics from monetary policy to labor economics.",
  },
  {
    title: "Sovereign Debt Sustainability in a Higher-Rate World",
    date: "Feb 12, 2026",
    author: "Research Team",
    excerpt: "Rising global interest rates have renewed concerns about debt sustainability in both advanced and emerging economies. We examine the mechanics of debt dynamics under stress.",
  },
  {
    title: "Fall Term Research Highlights",
    date: "Dec 2, 2025",
    author: "Research Team",
    excerpt: "A look back at the research team's fall term output, covering topics in trade, labor markets, and financial regulation.",
  },
];