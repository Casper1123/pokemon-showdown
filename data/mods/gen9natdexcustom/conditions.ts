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
	originofspace: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			// Grass Pledge / Swamp
			if (pokemon.side.sideConditions['grasspledge']) {
				return this.chainModify(0.5); // 1/4 -> 1/8 = factor 0.5
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			// Quaking moves fail when amplified
			if (move.type === 'Grass' && attacker.isGrounded() && this.field.isTerrain('grassyterrain')) {
				this.debug('amplified grassy terrain boost');
				return this.chainModify([15, 13]);
			}
			if (move.type === 'Psychic' && attacker.isGrounded() && this.field.isTerrain('psychicterrain')) {
				this.debug('amplified psychic terrain boost');
				return this.chainModify([15, 13]);
			}
			if (move.type === 'Electric' && attacker.isGrounded() && this.field.isTerrain('electricterrain')) {
				this.debug('amplified electric terrain boost');
				return this.chainModify([15, 13]);
			}
			if (move.type === 'Ice' && attacker.hasType('Ice') && this.field.isWeather('snowscape')) {
				this.debug('amplified snowscape weather boost');
				return this.chainModify(1);
			}
		},
	},
};
