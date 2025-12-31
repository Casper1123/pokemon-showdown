// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: import('../sim/dex-formats').FormatList = [
	{
		section: "Custom formats",
	},
	// Custom
	///////////////////////////////////////////////////////////////////
	{
		name: "[Gen 9] National Dex Custom",
		desc: "A custom edited version of Gen9's National Dex format.",
		mod: 'gen9natdexcustom',
		ruleset: ['Standard NatDex', 'gen9natdexcustom UbersAg', 'gen9natdexcustom megaray', 'Terastal Clause', 'Illusory Nicknames', '+move:lightofruin'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
		unbanlist: [],
	},
	{
		name: "[Gen 9] National Dex Custom Doubles",
		desc: "A VGC-styled doubles variant of National Dex Custom.",
		mod: 'gen9natdexcustom',
		gameType: "doubles",
		ruleset: ["Team Preview", // 'Illusory Nicknames', Does not work with Open Team Sheets// Custom  'gen9natdexcustom UbersAg', 'gen9natdexcustom megaray',
			'Dynamax Clause', 'Natdex Mod', '+move:lightofruin', // Natdex
			'Open Team Sheets', 'Item Clause = 1', 'Cancel Mod', 'Species Clause', 'Nickname Clause', 'Adjust Level = 50', 'Picked Team Size = Auto', 'Mega Rayquaza Clause', 'Best Of = 3'], // VGC
		banlist: ['Shedinja', 'Assist'],
		unbanlist: ['Greninja-Bond'], // 'Mythical', 'Restricted Legendary',
	},
	// National Dex
	///////////////////////////////////////////////////////////////////
	{
		section: "Official formats",
	},
	{
		name: "[Gen 9] National Dex",
		mod: 'gen9',
		ruleset: ['Standard NatDex', 'Terastal Clause'],
		banlist: [
			'ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Last Respects', 'Shed Tail',
		],
	},
	{
		name: "[Gen 9] Anything Goes",
		mod: 'gen9',
		ruleset: ['Standard AG'],
	},
	{
		name: "[Gen 8] National Dex",
		mod: 'gen8',
		ruleset: ['Standard NatDex', 'Dynamax Clause'],
		banlist: ['ND Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Razor Fang', 'Quick Claw', 'Baton Pass'],
	},
	// S/V
	///////////////////////////////////////////////////////////////////
	{
		name: "[Gen 9] Random Battle",
		desc: `Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.`,
		mod: 'gen9',
		team: 'random',
		bestOfDefault: true,
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod'],
	},
	{
		name: "[Gen 9] OU",
		mod: 'gen9',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Doubles OU",
		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Evasion Abilities Clause'],
		banlist: ['DUber', 'Shadow Tag'],
	},
];
