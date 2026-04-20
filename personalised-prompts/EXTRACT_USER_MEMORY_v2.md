<task>
Given the conversation that took place between the user and another AI assistant and the current_memories of user, you must:
1. Analyze the conversation to identify new information using ctx_memory_extraction_rules
2. Compare this information with current_memories
3. Determine appropriate actions (add/remove/no_action) based on action_rules and ctx_memory_response_examples
4. Ensure each action determination follows dependency_rules.
</task>

<dependency_rules>
1. Memory Update Rules:
   - First identify all new information from conversation using ctx_memory_extraction_rules
   - Compare each new piece of information with current_memories
   - If new information contradicts or updates existing memory:
     * Add the new information
     * Remove the outdated information
   - If new information is completely new:
     * Only add, no removal needed
   - If new information is identical:
     * No action needed

2. Remove Dependency Rules:
   - Removal MUST only occur when:
     * There is a corresponding new memory being added
     * The new memory directly updates/corrects the old memory
     * Both memories refer to the same type of information

3. Information Priority Rules:
   - Current information takes precedence over historical
   - Explicit statements take precedence over implicit inference
   - Specific information takes precedence over general
   - Direct personal statements take precedence over indirect references

4. Action Rules:
   - You are allowed only to recommend the given types of actions:
     * "add" – add new memory if contains relevant factual information not already present
     * "remove" – delete old memory if contains wrong or irrelevant information whose correct information is added
     * "no_action" - if no relevant bio information is found or same information exists

     You are allowed only to recommend the given types of actions:

     * "add" – add new memory if contains relevant factual information not already present
     * "remove" – delete old memory in these specific cases:
          Fixed biographical facts (name, birthdate, location, job title, etc.) when contradicted by new information
          Explicitly corrected preferences or statements (e.g., "I actually prefer X, not Y")
          Factual errors that are directly corrected
          Outdated status information (e.g., old job when new job is mentioned)
          DO NOT REMOVE expanding knowledge, learning concepts, evolving motivations, or growing interests
          NOT for adding detail to existing information unless it directly contradicts
     * "no_action" - if no relevant bio information is found or same information exists
</dependency_rules>

<categories>
[
  "add",
  "remove",
  "no_action"
]
</categories>

<response_format>
{
  "thinking": "What new information was found in the conversation using ctx_memory_extraction_rules, How this new information relates to current_memories, Why specific add/remove pairs are needed or why no action is needed"
  },
  "actions": [
    {
      "action_type": "add|remove|no_action",
      "content": "memory_content",  // For add
      "id": "memory_id",           // For remove
      "reasoning": "Why this action is needed and its relationship to other actions"
    }
  ]
}
</response_format>

<instructions>
1. Process conversation using ctx_memory_extraction_rules:
   - Extract all new personal factual information
   - Organize information by type (name, location, job, etc.)

2. Compare with current_memories:
   - Match each new piece of information with existing memories
   - Identify which current memories might need updating

3. Create action pairs following ctx_memory_response_examples:
   - For each update scenario:
     * First determine what needs to be added
     * Then identify what needs to be removed
     * Verify there's a direct relationship between add/remove pairs

4. Validate actions:
   - Ensure each remove has a corresponding add
   - Verify the relationship between added and removed information
   - Check for logical consistency
</instructions>

<ctx_memory_extraction_rules>
{{ctx_memory_extraction_rules}}
</ctx_memory_extraction_rules>

<ctx_memory_response_examples>
{{ctx_memory_response_examples}}
</ctx_memory_response_examples>

current_memories: {{current_memories}}

conversation: {{conversation}}