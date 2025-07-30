import type { ModPatch } from "../server/custom-endpoints/modpatch";

export function setMove(dex: ModdedDex, modPatch: undefined | ModPatch, speciesId: string, moveId: string, learnMethods: string[] = ["9L1"]) {
	dex.modData("Learnsets", speciesId).learnset.set(moveId, learnMethods);

	if (!modPatch) return;
	if (modPatch && !modPatch.learnsets.has(speciesId)) {
		modPatch.learnsets.set(speciesId, {});
	}
	modPatch.learnsets.get(speciesId).learnset.set(moveId, learnMethods);
}
