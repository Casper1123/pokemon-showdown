import type { ModPatch } from "../server/custom-endpoints/modpatch";

export function setMove(dex: ModdedDex, modPatch: undefined | ModPatch, speciesId: Lowercase<string>, moveId: Lowercase<string>, learnMethods: string[] = ["9L1"]) {
	if (dex) {
		try {
			dex.modData("Learnsets", speciesId).learnset.set(moveId, learnMethods);
		} catch (err) {} // This does not work if we pass in an empty ModdedDex, required for creating our custom Cache files.
	}

	if (!modPatch) return;
	if (!(speciesId in modPatch.learnsets)) {
		modPatch.learnsets[speciesId] = {};
	}
	modPatch.learnsets[speciesId][moveId] = learnMethods;
}
