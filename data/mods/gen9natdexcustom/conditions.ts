import { type ModdedConditionData } from "../../../sim/dex-conditions";

export const Conditions: { [k: string]: ModdedConditionData } = {
	gem: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem boost');
			return this.chainModify(1.5);
		},
	},
	snowscape: {
		inherit: true,
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.hasType('Ice') && move.type === 'Ice') {
				this.debug('Snowscape Ice boost');
				return this.chainModify(1.2);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Ice')) {
				if (this.field.pseudoWeather.trickroom) {
					this.debug('Snowscape Ice speed reduction in Trick Room');
					return this.chainModify(0.8);
				} else {
					this.debug('Snowscape Ice speed boost');
					return this.chainModify(1.2);
				}
			}
		},
	},
};
