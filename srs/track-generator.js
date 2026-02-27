// Copy and paste this entire script into your browser console (e.g., Chrome DevTools Console)

(function () {
	// --- Configuration ---

	// The intervals (gaps) between activities
	// Teach -> Rev 1: +2 days
	// Rev 1 -> Rev 2: +4 days (e.g. Day 3 to 7)
	// Rev 2 -> Rev 3: +8 days (e.g. Day 7 to 15)
	// Rev 3 -> Rev 4: +15 days (e.g. Day 15 to 30)
	// Rev 4 -> Rev 5: +15 days (e.g. Day 30 to 45)
	const GAPS = [2, 5, 8, 15, 15];

	const ACTIVITIES = ["Fluency Booster 1", "Fluency Booster 2", "Fluency Booster 3", "Fluency Booster 4", "Fluency Booster 5"];

	// --- Input Data ---

	// 1. Topic Knowledge Status
	// You can modify these lists to change the inputs
	const strongTopics = [];
	const weakTopics = [
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

	// 2. Priority List: Determines the order (Weak first, then Strong)
	const priorityList = [...weakTopics, ...strongTopics];

	// --- Logic ---

	function getStatus(topicName) {
		if (strongTopics.includes(topicName)) return "Strong";
		if (weakTopics.includes(topicName)) return "Weak";
		return "Neutral";
	}

	function generateTrack() {
		console.log("--- Study Plan Overview ---");
		console.log(`Total Topics: ${priorityList.length}`);
		console.log(`Priority Order: ${priorityList.join(" -> ")}`);
		console.log("\n--- Generating Daily Schedule (One Activity Per Day) ---\n");

		const schedule = [];
		const occupiedDays = new Set();
		let lastTeachDay = 0; // Track when the last topic started to ensure sequential starts

		// Greedy Algorithm: Place all activities for Topic 1, then Topic 2, etc.
		priorityList.forEach((topicName) => {
			const status = getStatus(topicName);
			let currentDay = lastTeachDay + 1;

			// 1. Place 'Teach' Activity
			// Find the first available day starting from (lastTeachDay + 1)
			while (occupiedDays.has(currentDay)) {
				currentDay++;
			}

			// Place Teach
			schedule.push({ day: currentDay, topicName, activity: "Teach", status });
			occupiedDays.add(currentDay);
			lastTeachDay = currentDay; // Update global tracker

			let previousActivityDay = currentDay;

			// 2. Place Revision Activities
			GAPS.forEach((gap, index) => {
				// For Strong topics, only allow Rev 1 (index 0)
				// For Weak topics, allow all revisions
				if (status === "Strong" && index > 0) {
					return;
				}

				let targetDay = previousActivityDay + gap;

				// Find first available day at or after targetDay
				while (occupiedDays.has(targetDay)) {
					targetDay++;
				}

				const activity = ACTIVITIES[index];
				if (!activity) return;

				schedule.push({
					day: targetDay,
					topicName,
					activity,
					status,
				});
				occupiedDays.add(targetDay);
				previousActivityDay = targetDay; // Next gap is relative to THIS activity
			});
		});

		// Sort the full schedule by Day
		schedule.sort((a, b) => a.day - b.day);

		// Renumber days to be continuous (1 to Total Activities)
		// This ensures there are no gaps and exactly one activity per day from Day 1 to Day 60
		const finalSchedule = schedule.map((item, index) => ({
			...item,
			day: index + 1,
		}));

		// Print Output
		finalSchedule.forEach((item) => {
			// Format: Day X: Topic Y: Activity (Status)
			console.log(
				`Day ${item.day}: ${item.topicName}: ${item.activity} (${item.status})`,
			);
		});

		// Also return the data in case they want to inspect it
		return finalSchedule;
	}

	// --- Execute ---
	generateTrack();
})();