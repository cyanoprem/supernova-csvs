const fs = require("fs");
const lines = fs.readFileSync("srs/VET - Phase II - Topics - phase 2 - track.csv", "utf8").trim().split("\n");
const header = lines[0];
const rows = lines.slice(1);

// Extract topic name from activity title
function getTopicName(title) {
  let t = title;
  if (t.startsWith("Translate: ")) t = t.replace("Translate: ", "");
  if (t.endsWith("!")) t = t.slice(0, -1);
  t = t.replace(": Learn", "").replace(/: Fluency Booster \d+/, "");
  return t.trim();
}

// Generate activity subtext based on activity type
function getActivitySubtext(title) {
  const topic = getTopicName(title);

  if (title.startsWith("Translate: ") && title.endsWith("!")) {
    return "Test your " + topic.toLowerCase() + " skills";
  } else if (title.startsWith("Translate: ")) {
    return "Check your understanding of " + topic.toLowerCase();
  } else if (title.includes(": Learn")) {
    return "Learn phrases and expressions for " + topic.toLowerCase();
  } else if (title.includes(": Fluency Booster")) {
    const num = title.match(/Fluency Booster (\d+)/)[1];
    const verbs = {
      "1": "Practice",
      "2": "Strengthen",
      "3": "Sharpen",
      "4": "Polish",
      "5": "Master",
    };
    return (verbs[num] || "Practice") + " your " + topic.toLowerCase() + " skills";
  }
  return "";
}

// Group rows by week, preserving order
const weekOrder = [];
const weeks = {};
rows.forEach((row) => {
  const cols = row.split(",");
  const week = cols[1];
  if (!weeks[week]) {
    weeks[week] = [];
    weekOrder.push(week);
  }
  weeks[week].push(row);
});

// Section descriptions per week
const weekDescriptions = {
  "Week 14": "Learn greetings and start expressing your opinions confidently",
  "Week 15": "Describe people and places while building on your strengths",
  "Week 16": "Learn to disagree politely and talk about daily routines",
  "Week 17": "Boost your fluency in greetings and expressing opinions",
  "Week 18": "Learn to agree with others and talk about your weaknesses",
  "Week 19": "Learn to give examples and review your discussion skills",
  "Week 20": "Share personal information and review earlier topics",
  "Week 21": "Strengthen your fluency across multiple speaking topics",
  "Week 22": "Learn to add to discussions and deepen your review",
  "Week 23": "Explore hobbies and interests while mastering earlier skills",
  "Week 24": "Test your progress in giving examples and sharing information",
  "Week 25": "Learn to ask for clarification and introduce yourself professionally",
  "Week 26": "Build fluency in clarification and professional introductions",
  "Week 27": "Learn to conclude discussions and continue your review",
  "Week 28": "Test your progress in hobbies, clarification, and introductions",
  "Week 29": "Final review of group discussion and personal expression skills",
  "Week 30": "Master all remaining topics and complete your fluency journey",
};

// Build output
const outputRows = [header];

weekOrder.forEach((week) => {
  const weekRows = weeks[week];
  weekRows.forEach((row, idx) => {
    const cols = row.split(",");
    const activityTitle = cols[6];

    // Section description only on first row of each week
    if (idx === 0 && weekDescriptions[week]) {
      cols[2] = weekDescriptions[week]; // section_description
      cols[3] = weekDescriptions[week]; // section_subtext
    }

    // Activity subtext for every row (except Week 31 placeholder)
    if (week !== "Week 31" && activityTitle) {
      cols[10] = getActivitySubtext(activityTitle);
    }

    outputRows.push(cols.join(","));
  });
});

fs.writeFileSync(
  "srs/VET - Phase II - Topics - phase 2 - track.csv",
  outputRows.join("\n") + "\n"
);
console.log("Done. Total rows:", outputRows.length - 1);
