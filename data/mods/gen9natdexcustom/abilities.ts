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
			this.add('-ability', source, 'Chronal Distortions');
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
	spatialdistortions: {
		name: "Spatial Distortions",
		desc: "Sets Gravity. After leaving the battlefield, the effect will remain for 2 turns.",
		shortDesc: "Sets Gravity. Lingers for 2 turns.",
		onStart(source) {
			this.add('-ability', source, 'Spatial Distortions');
			this.field.addPseudoWeather('spatialdistortions', source);
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather['spatialdistortions']?.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('spatialdistortions')) {
					this.field.pseudoWeather['spatialdistortions'].source = target;
					this.add('-message', `${target.name} maintains the distortion!`);
					return;
				}
			}
			this.field.removePseudoWeather('spatialdistortions');
		},
	},
	absolutedistortion: {
		name: "Absolute Distortion",
		desc: "Plunge the battlefield into the Distortion World, where Weather, Terrain, Pseudoweather and Hazards are yours to rule.",
		shortDesc: "Removes field effects and Hazards, and restricts setting them.",
		onStart(source) {
			this.add('-ability', source, 'Absolute Distortion');
			this.field.addPseudoWeather('absolutedistortion', source);
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather['absolutedistortion']?.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('absolutedistortion')) {
					this.field.pseudoWeather['absolutedistortion'].source = target;
					this.add('-message', `${target.name} upholds the dimension.`); // Todo: better flavour.
					return;
				}
			}
			this.field.removePseudoWeather('absolutedistortion');
		},
	},
};
