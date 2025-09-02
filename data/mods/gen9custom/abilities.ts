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

	// Custom
	chronaldistortions: {
		name: "Chronal Distortions",
		desc: "While on the field, moves hit for 0.8x damage. In 2 turns, it hits again for 0.4x damage, without altering ally stats.",
		shortDesc: "While active: Moves hit for .8x and .4x in 2 turns.",
		onStart(source) {
			this.field.addPseudoWeather('chronaldistortions', source);
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather['chronaldistortions']?.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('chronaldistortions')) {
					this.field.pseudoWeather['chronaldistortions'].source = target;
					this.add('-message', `${target.name} maintains the distortion!`);
					return;
				}
			}
			this.field.removePseudoWeather('chronaldistortions');
		},
	},
};
// FIXME: Send data to client properly.
