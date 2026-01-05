import { applyChanges } from "./learnset_changes";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	gen: 9,
	init() {
		applyChanges(this);
	},
};
