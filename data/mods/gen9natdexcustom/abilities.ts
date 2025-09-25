import {hazards} from "./conditions";

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
		num: -4,
		rating: 3,
		flags: {},
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
	spacialdistortion: {
		num: -5,
		rating: 3,
		flags: {},
		name: "Spacial Distortion",
		desc: "Sets Gravity. After leaving the battlefield, the effect will remain for 2 turns.",
		shortDesc: "Sets Gravity. Lingers for 2 turns.",
		onStart(source) {
			this.add('-ability', source, 'Spacial Distortion');
			this.field.addPseudoWeather('spacialdistortion', source);
		},
		onEnd(pokemon) {
			if (this.field.pseudoWeather['spacialdistortion']?.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('spacialdistortion')) {
					this.field.pseudoWeather['spacialdistortion'].source = target;
					this.add('-message', `${target.name} maintains the distortion!`);
					return;
				}
			}
		},
	},
	absolutedistortion: {
		num: -6,
		rating: 3,
		flags: {},
		name: "Absolute Distortion",
		desc: "Plunge the battlefield into the Distortion World, where Weather, Terrain, Pseudoweather and Hazards are yours to rule.",
		shortDesc: "Removes field effects and Hazards, and restricts setting them.",
		onStart(source) {
			this.add('-ability', source, 'Absolute Distortion');
			this.field.addPseudoWeather('absolutedistortion', source);
			for (const condition of hazards) {
				if (source.side.removeSideCondition(condition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(condition).name, '[from] ability: Absolute Distortion', `[of] ${source}`);
				}
			}
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
	apexpredator: {
		num: -7,
		rating: 3,
		flags: {},
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} spots its prey.`);
			this.add('-ability', pokemon, 'Apex Predator');

			// @ts-expect-error Cannot set type bc of the annoying init script.
			function getFirstAvailableMove(battle) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.pp > 0 && !moveSlot.disabled) {
						return battle.dex.getActiveMove(moveSlot.id);
					}
				}
				return null;
			}

			// @ts-expect-error
			function getPreferredTarget(battle, move) {
				if (move.target === 'self' || move.target === 'allies') {
					return pokemon;
				}

				const sourceLoc = pokemon.getLocOf(pokemon);
				const opposingLoc = -sourceLoc;

				const directOpponent = battle.getTarget(pokemon, move, opposingLoc);
				if (directOpponent && !directOpponent.fainted) {
					return directOpponent;
				}

				return battle.getRandomTarget(pokemon, move);
			}

			const firstMove = getFirstAvailableMove(this);
			if (!firstMove) { return; }

			const target = getPreferredTarget(this, firstMove);
			this.add('-message', `${pokemon.name} has found its prey.`);
			this.actions.useMove(firstMove, pokemon, { target });
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-message', `${target.name} does not care about your feeble attempt to scare it.`);
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Apex Predator', `[of] ${target}`);
			}
		},
		name: "Apex Predator",
		desc: "On switch-in, uses first move in moveset. Immune to Intimidate",
		shortDesc: "On switch-in, uses first move in moveset. Immune to Intimidate",
	},
};
