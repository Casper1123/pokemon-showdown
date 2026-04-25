import { hazards, rooms, toIdLocal } from "../../conditions";

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
		desc: 'Deals damage and has a 15% chance to flinch the target.',
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
				let timer = 5;
				if (this.format.gameType !== 'doubles') timer += 1;
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
					timer += 2;
				}
				return timer;
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
		shortDesc: "Goes last. For 5 (singles: 6) turns, turn order is reversed.",
		desc: "-7 priority. For 5 (singles: 6) turns, speed inside priority brackets is reversed (slow before fast).",
	},
	sparklyswirl: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		pp: 5,
		gen: 9,
		isNonstandard: undefined,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Quiver Dance', target);
			this.add('-anim', source, 'Moonblast', target);
		},
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
		shortDesc: "Snow 5 turns, Ice: 1.5x Def, 1.2x I-STAB, better speed.",
	},
	lightofruin: {
		inherit: true,
		gen: 9,
		isNonstandard: null,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Luster Purge', target);
		},
	},
	eruption: {
		inherit: true,
		secondary: {},
	},
	freezeshock: {
		inherit: true,
		accuracy: 100,
		shortDesc: "Raises Atk by 1, hits turn 2. Snow: no charge.",
		desc: "Raises Atk by 1, hits turn 2. Snow: no charge.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ atk: 1 }, attacker, attacker, move);
			if (['snowscape', 'hail'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	iceburn: {
		inherit: true,
		accuracy: 100,
		shortDesc: "Raises SpA by 1, hits turn 2. Snow: no charge.",
		desc: "Raises SpA by 1, hits turn 2. Snow: no charge.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ spa: 1 }, attacker, attacker, move);
			if (['snowscape', 'hail'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	glaciate: {
		inherit: true,
		desc: "100% chance to lower the foe(s) Speed by 2.",
		shortDesc: "100% chance to lower the foe(s) Speed by 2.",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
	},
	coreenforcer: {
		inherit: true,
		category: "Physical",
	},
	darkvoid: {
		inherit: true,
		accuracy: 80,
	},
	roaroftime: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, cantusetwice: 1 },
		self: undefined,
		desc: "Cannot be used consecutively. 100BP & ends Rooms if Origin of Time.",
		shortDesc: "Cannot be used consecutively. 100BP & ends Rooms if Origin of Time Dialga-Origin.",
		basePowerCallback(source, target, move) {
			if (source.species.id === 'dialgaorigin' && source.ability === 'originofspace') {
				this.debug('100 bp for originoftime');
				return 100;
			}
			return move.basePower;
		},
		onAfterMove(source, target, move) {
			if (source.species.id === 'dialgaorigin' && source.ability === 'originoftime') {
				for (const pseudoWeather of Object.keys(this.field.pseudoWeather)) {
					if (rooms.includes(toIdLocal(pseudoWeather))) { // Only delete rooms, as specified in the conditions var.
						this.field.removePseudoWeather(pseudoWeather);
					}
				}
			}
		},
	},
	spacialrend: {
		desc: "High crit ratio. 100:100 and ends field effects when Origin of Space.",
		shortDesc: "High crit ratio. 100:100 when Origin of Space Palkia-Origin and ends all non-Room field effects.",
		inherit: true,
		accuracy: 85,
		basePower: 120,
		basePowerCallback(source, target, move) {
			if (source.species.id === 'palkiaorigin' && source.ability === 'originofspace') {
				this.debug('100 bp for originofspace');
				return 100;
			}
			return move.basePower;
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'palkiaorigin' && source.ability === 'originofspace') {
				this.debug('85 --> 100 bp for originofspace');
				return 100;
			}
			return move.accuracy;
		},
		onAfterMove(source, target, move) {
			if (source.species.id === 'palkiaorigin' && source.ability === 'originofspace') {
				// Delete side effects, delete field effects.
				// Note that Distortions are Field effects.
				// Does not clear Rooms, by design.
				// Nor does it remove Hazards. Might change this in the future?
				this.field.clearWeather();
				this.field.clearTerrain();
				for (const pseudoWeather of Object.keys(this.field.pseudoWeather)) {
					if (!rooms.includes(toIdLocal(pseudoWeather))) {
						this.field.removePseudoWeather(pseudoWeather);
					}
				}
				for (const side of this.sides) {
					for (const condition in side.sideConditions) {
						if (hazards.includes(condition)) {
							continue;
						}
						side.removeSideCondition(condition);
					}
				}
			}
		},
	},
	thunderwave: {
		inherit: true,
		desc: "Paralyzes target. Electric types can't miss.",
		shortDesc: "Paralyzes target. Electric types can't miss.",
		onPrepareHit(target, source, move) {
			if (source.hasType('Electric')) source.addVolatile('thunderwave');
		},
		condition: {
			noCopy: true,
			duration: 1,
			onSourceInvulnerabilityPriority: 1,
			onSourceInvulnerability(target, source, move) {
				if (move && source === this.effectState.target) return 0;
			},
			onSourceAccuracy(accuracy, target, source, move) {
				if (move && source === this.effectState.target) return true;
			},
		},
	},
	willowisp: {
		inherit: true,
		desc: "Burns target. Fire types can't miss.",
		shortDesc: "Burns target. Fire types can't miss.",
		onPrepareHit(target, source, move) {
			if (source.hasType('Fire')) source.addVolatile('willowisp');
		},
		condition: {
			noCopy: true,
			duration: 1,
			onSourceInvulnerabilityPriority: 1,
			onSourceInvulnerability(target, source, move) {
				if (move && source === this.effectState.target) return 0;
			},
			onSourceAccuracy(accuracy, target, source, move) {
				if (move && source === this.effectState.target) return true;
			},
		},
	},
	shadowclaw: {
		inherit: true,
		basePower: 80,
	},

	// Custom moves allowed
	desertsong: {
		inherit: true,
		isNonstandard: null,
	},
	neutronray: {
		inherit: true,
		isNonstandard: null,
	},
	shadowflame: {
		inherit: true,
		isNonstandard: null,
	},
	timestop: {
		inherit: true,
		isNonstandard: null,
	},
	stalk: {
		inherit: true,
		isNonstandard: null,
	},
	shadowfangs: {
		inherit: true,
		isNonstandard: null,
	},
	needlethrow: {
		inherit: true,
		isNonstandard: null,
	},
	weavegarments: {
		inherit: true,
		isNonstandard: null,
	},
};
