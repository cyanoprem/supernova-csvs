const fs = require("fs");

// Read IDs file
const idsRaw = fs.readFileSync("srs/title-scenario-ids.md", "utf8").trim().split("\n");
const idMap = {};
idsRaw.forEach(line => {
  const parts = line.split("\t");
  if (parts.length >= 2) {
    idMap[parts[0].trim()] = parts[1].trim();
  }
});

// 15 concepts in order
const concepts = [
  "Basic Greeting and Meeting Etiquette",
  "Group Discussion - Expressing Opinion",
  "Talk about Strengths",
  "Describing People and Places",
  "Group Discussion - Disagreeing Politely",
  "Talking about Daily Routines",
  "Group Discussion - Agreeing with Others",
  "Talk about Weaknesses",
  "Group Discussion - Giving Examples",
  "Sharing Personal Information Clearly",
  "Group Discussion - Adding to Someone's Point",
  "Talking about Hobbies and Interests",
  "Group Discussion - Asking for Clarification",
  "Tell Me About Yourself - Professional Introduction",
  "Group Discussion - Concluding a Discussion",
];

// For each concept, find the Translate pre and post IDs
const jsons = concepts.map(concept => {
  // Special case for Professional Introduction
  const translateKey = concept === "Tell Me About Yourself - Professional Introduction"
    ? "Translate: Professional Introduction"
    : "Translate: " + concept;
  const translatePostKey = translateKey + "!";

  const preId = idMap[translateKey];
  const postId = idMap[translatePostKey];

  if (!preId || !postId) {
    console.error("MISSING ID for:", concept, "pre:", translateKey, "->", preId, "post:", translatePostKey, "->", postId);
  }

  return {
    data: {
      evaluation_config: {
        evaluationPromptId: "ebfade07-516b-4760-9991-3f465d53f115",
        evaluationType: "CANDO"
      },
      vars: {
        concept: concept
      },
      roleplay_prompt_id: "7deb4075-c026-43fe-906c-5439d404bd9c",
      dry_run: false,
      scenario_ids: [preId, postId]
    }
  };
});

// Write all JSONs to file, one after another
const output = jsons.map(j => JSON.stringify(j, null, 2)).join("\n\n");
fs.writeFileSync("srs/add-eval.md", output + "\n");
console.log("Generated", jsons.length, "JSON blocks");
