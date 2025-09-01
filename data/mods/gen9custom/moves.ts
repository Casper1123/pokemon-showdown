export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	mudshot: {
		inherit: true,
		basePower: 70,
		pp: 10,
	},
	hammerarm: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
	},
	dragonrush: {
		inherit: true,
		accuracy: 90,
		secondary: { // Note: redefine secondary effect entirely else it's not overwritten correctly (inheritance depth layer)
			chance: 15,
			volatileStatus: 'flinch',
		},
	},
	submission: {
		inherit: true,
		basePower: 90,
		accuracy: 90,
		pp: 10,
	},
	trickroom: {
		inherit: true,
		condition: {
			duration: 6,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
					return 8;
				}
				return 6;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Trick Room', `[of] ${source}`, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Trick Room', `[of] ${source}`);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		shortDesc: "Goes last. For 6 turns, turn order is reversed.",
		desc: "-7 priority. For 6 turns, speed inside priority brackets is reversed (slow before fast).",
	},
	sparklyswirl: {
		inherit: true,
		basePower: 60,
		pp: 5,
	},
	razorshell: {
		inherit: true,
		basePower: 85,
	},
	powergem: {
		inherit: true,
		basePower: 90,
		pp: 10,
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "20% chance to boost SpA +1",
		shortDesc: "20% chance to boost SpA +1",
	},
	snowscape: {
		inherit: true,
		desc: "Sets snow for 5 turns. Ice: 1.5x Def, 1.2x Ice-STAB, 0.8x/1.2x spe (based on Trick Room).",
		shortDesc: "Sets snow for 5 turns. Ice: 1.5x Def, 1.2x Ice-STAB, 0.8x/1.2x spe (based on Trick Room).",
	},
	lightofruin: {
		inherit: true,
		isNonstandard: "Past",
	},

	// Custom moves:
	desertsong: {
		num: -4,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Desert Song",
		pp: 10,
		priority: 0,
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				this.field.setWeather('sandstorm');
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				this.field.setWeather('sandstorm');
			}
		},
		secondary: {}, // Boosted by Sheer Force.
		target: "allAdjacentFoes",
		type: "Ground",
		desc: "Sets Sandstorm weather effect on hit.",
		shortDesc: "Sets Sandstorm on hit.",
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
	},
	neutronray: {
		num: -5,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Neutron Ray",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 30,
			onHit(target, source) {
				// Ability Suppress, Par, Drowsy, Confusion, Flinch
				const result = this.random(5);
				switch (result) {
				case 0:
					target.trySetStatus('gastroacid', source);
					break;
				case 1:
					target.trySetStatus('par', source);
					break;
				case 2:
					target.trySetStatus('yawn', source);
					break;
				case 3:
					target.trySetStatus('confusion', source);
					break;
				case 4:
					target.trySetStatus('flinch', source);
					break;
				default:
					break;
				}
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
};
