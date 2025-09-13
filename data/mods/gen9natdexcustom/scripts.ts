import { applyChanges } from "./learnset_changes";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	gen: 9,
	init() {
		applyChanges(this);
	},
	pokemon: {
		isGrounded(negateImmunity) {
			if ('gravity' in this.battle.field.pseudoWeather ||
				'spatialdistortions' in this.battle.field.pseudoWeather) return true;
			return super.isGrounded(negateImmunity);
		},
		ignoringAbility() {
			if (this.abilityState.suppressed) return true;
			return super.ignoringAbility();
		},
	},
};
