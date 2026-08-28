function getTerm(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth() 返回 0-11,所以 +1
  const year = date.getFullYear();

  if (month >= 1 && month <= 4) return `Winter ${year}`;
  if (month >= 5 && month <= 8) return `Spring ${year}`;
  return `Fall ${year}`;
}

export function groupByTerm(issues) {
  const groups = {};
  issues.forEach((issue) => {
    const term = getTerm(issue.date);
    if (!groups[term]) groups[term] = [];
    groups[term].push(issue);
  });
  return groups;
}


export const newsletterIssues = [
  {
    title: "Tariffs and the New Trade Order",
    date: "Aug 10, 2026",
    author: "Research Team",
    excerpt: "Global trade patterns are shifting as new tariff regimes reshape supply chains. This week we look at what the latest round of trade policy changes means for consumers and producers alike.",
  },
  {
    title: "Inside the Bank of Canada's Rate Decision",
    date: "Aug 3, 2026",
    author: "Research Team",
    excerpt: "The Bank of Canada held rates steady this week, but the accompanying statement hinted at a more cautious outlook. We break down what the central bank is watching closely.",
  },
  {
    title: "Tech Layoffs: A Labor Market Signal?",
    date: "Jul 27, 2026",
    author: "Research Team",
    excerpt: "A fresh wave of layoffs across the tech sector has reignited debate about the health of the labor market. Is this a sector-specific correction or a broader warning sign?",
  },
  {
    title: "Housing Affordability: A Waterloo Case Study",
    date: "Jul 20, 2026",
    author: "Research Team",
    excerpt: "Student housing costs near campus have climbed sharply in recent years. We examine the local factors driving this trend and how it compares to national housing data.",
  },
  {
    title: "The Rise of Private Credit Markets",
    date: "Jul 13, 2026",
    author: "Research Team",
    excerpt: "As banks pull back from certain lending categories, private credit funds have stepped in to fill the gap. What does this mean for borrowers and for financial stability?",
  },
  {
    title: "Understanding Yield Curve Inversions",
    date: "Jul 6, 2026",
    author: "Research Team",
    excerpt: "The yield curve has been a closely watched recession indicator for decades. This week, a primer on what it means and why economists pay such close attention to it.",
  },
  {
    title: "Spring Term Market Recap",
    date: "Jun 15, 2026",
    author: "Research Team",
    excerpt: "As the spring term winds down, we look back at the biggest market-moving stories of the past four months and what they mean heading into summer.",
  },
  {
    title: "Winter Term in Review: Rates, Recession Fears, and Rebounds",
    date: "Apr 10, 2026",
    author: "Research Team",
    excerpt: "The winter term saw significant volatility across major indices. We recap the key macroeconomic events that shaped markets over the past several months.",
  },
  {
    title: "The Fed's Balancing Act",
    date: "Feb 18, 2026",
    author: "Research Team",
    excerpt: "With inflation cooling but growth concerns rising, the Federal Reserve faces a delicate balancing act. This week we examine the policy tools at their disposal.",
  },
  {
    title: "Fall Term Wrap-Up: A Volatile Quarter",
    date: "Dec 8, 2025",
    author: "Research Team",
    excerpt: "As the fall term comes to a close, we look back at a quarter marked by unexpected volatility across equity and bond markets alike.",
  },
];