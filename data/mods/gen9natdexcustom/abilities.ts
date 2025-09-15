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
	chronaldistortion: {
		name: "Chronal Distortion",
		desc: "While on the field, moves hit for 0.8x damage. In 2 turns, it hits again for 0.4x damage, without altering ally stats.",
		shortDesc: "While active: Moves hit for .8x and .4x in 2 turns.",
		onStart(source) {
			this.add('-ability', source, 'Chronal Distortion');
			this.field.addPseudoWeather('chronaldistortion', source);
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather['chronaldistortion']?.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('chronaldistortion')) {
					this.field.pseudoWeather['chronaldistortion'].source = target;
					this.add('-message', `${target.name} maintains the distortion!`);
					return;
				}
			}
			this.field.removePseudoWeather('chronaldistortion');
		},
	},
	spatialdistortion: {
		name: "Spatial Distortion",
		desc: "Sets Gravity. After leaving the battlefield, the effect will remain for 2 turns.",
		shortDesc: "Sets Gravity. Lingers for 2 turns.",
		onStart(source) {
			this.add('-ability', source, 'Spatial Distortion');
			this.field.addPseudoWeather('spatialdistortion', source);
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather['spatialdistortion']?.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('spatialdistortion')) {
					this.field.pseudoWeather['spatialdistortion'].source = target;
					this.add('-message', `${target.name} maintains the distortion!`);
					return;
				}
			}
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
