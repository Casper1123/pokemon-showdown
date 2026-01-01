export function setMove(dex: ModdedDex, speciesId: Lowercase<string>, moveId: Lowercase<string>, learnMethods: string[] = ["9L1"]) {
	dex.modData("Learnsets", speciesId).learnset[moveId] = learnMethods;
}
