
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([6144, 4096]); // 6144/4095 = 1.5. This is the power boost.
				}
			}
		},
		desc: "This Pokemon's Ground/Rock/Steel attacks do 1.5x in Sandstorm; immunity to it.",
		shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.5x in Sandstorm; immunity to it.",
	},
	// Custom abilities allowed
	chronaldistortion: {
		inherit: true,
		isNonstandard: null,
	},
	spacialdistortion: {
		inherit: true,
		isNonstandard: null,
	},
	absolutedistortion: {
		inherit: true,
		isNonstandard: null,
	},
	apexpredator: {
		inherit: true,
		isNonstandard: null,
	},
};
