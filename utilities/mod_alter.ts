import type { ModPatch } from "../server/custom-endpoints/modpatch";

export function setMove(dex: ModdedDex, modPatch: undefined | ModPatch, speciesId: string, moveId: string, learnMethods: string[] = ["9L1"]) {
	if (dex) {
		try {
			dex.modData("Learnsets", speciesId).learnset.set(moveId, learnMethods);
		} catch (err) {} // This does not work if we pass in an empty ModdedDex, required for creating our custom Cache files.
	}

	if (!modPatch) return;
	if (!modPatch.learnsets.has(speciesId)) {
		modPatch.learnsets.set(speciesId, new Map<string, string[]>());
	}
	// For some reason, WebStorm says that the .get result may be undefined
	// Which is false, because we fix that up above.
	// Man this suck for OOP huh.
	// @ts-expect-error
	modPatch.learnsets.get(speciesId).set(moveId, learnMethods);
}
