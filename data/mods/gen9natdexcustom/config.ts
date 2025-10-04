export const ModConfig = {
	// Restricted limit per team
	maxRestricted: 1, // Hard cap of both; if 1, use either or.
	maxUber: 1,
	maxAG: 0,
	// Team size
	uberTeamSize: 5,
	agTeamSize: 4,

	// Other
	megaWhenUbersAG: true, // Allows the use of Mega Stones if an Uber is on the team
	maxMechanics: -1, // Limits the amount of battle mechanics; Includes: Gems, Mega, Z-moves, Tera, Uber -1 if any.
	// todo: make rule for this.

	// Doubles
	doublesMaxRestricted: 0,
	doublesMaxUber: 0,
	doublesMaxAG: 0,

	doublesUberTeamSize: 6,
	doublesUberAGTeamSize: 4,
	doubleMegaWhenUbersAG: true,
	doubleMaxMechanics: -1,
};
