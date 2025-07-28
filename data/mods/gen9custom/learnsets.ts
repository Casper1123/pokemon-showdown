import type { ModdedLearnsetData } from "../../../sim/dex-species";

export const Learnsets: { [speciesid: string]: ModdedLearnsetData } = {
	zekrom: {
		inherit: true,
		learnset: {
			geomancy: ["9L1"],
			dracometeor: ["9L1"]
		},
	}
};
