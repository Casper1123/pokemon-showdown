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
		accuracy: 100,
		pp: 5,
		gen: 9,
		isNonstandard: undefined,
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
	},
	floatyfall: {
		inherit: true,
		gen: 9,
		isNonstandard: null,
	},
	roaroftime: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, cantusetwice: 1 },
		self: undefined,
		desc: "Cannot be used consecutively.",
		shortDesc: "Cannot be used consecutively.",
	},
	eruption: {
		inherit: true,
		secondary: {},
		hasSheerForce: true,
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
	spacialrend: {
		inherit: true,
		accuracy: 85,
		basePower: 120,
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

	// Custom moves:
	desertsong: {
		num: -50,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Desert Song",
		pp: 10,
		priority: 0,
		onBasePower() {
			if (!this.field.isWeather('sandstorm')) {
				this.debug('Desert Song Sandstorm boost');
				return this.chainModify([6144, 4096]);
			}
		},
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
		desc: "1.5x power in Sand. Sets sand if inactive.",
		shortDesc: "1.5x power in Sand. Sets sand if inactive.",
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
	},
	neutronray: {
		num: -51,
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
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Power Gem', target);
			this.add('-anim', source, 'Power Gem', target);
		},
		target: "normal",
		type: "Dark",
		contestType: "Cool",
		desc: "Phys if Atk > SpA. 30% chance to: Suppress Ability, Paralyze, Drowsy, Confusion or Flinch.",
		shortDesc: "Phys if Atk > SpA. 30% to inflict a disruptive effect.",
	},
	shadowflame: {
		num: -52,
		accuracy: 100,
		basePower: 70,
		type: "Ghost",
		category: "Special",
		name: "Shadowflame",
		desc: "30% chance to burn.",
		shortDesc: "30% chance to burn.",
		target: "normal",
		pp: 15,
		priority: 0,
		gen: 9,
		flags: { protect: 1, mirror: 1 },
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Shadow Ball', target);
			this.add('-anim', source, 'Will-O-Wisp', target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
	},
	timestop: {
		num: -53,
		gen: 9,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Time Stop",
		shortDesc: "Protects user. If hit, heals 25%. Switches out.",
		desc: "The user is protected from most attacks made by other Pokemon during this turn. If the user is hit by an attack while protected, it restores 25% of its maximum HP. At the end of the turn, the user is forced to switch out.",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'timestop',
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect', '[silent]');
				this.add('-message', `${target.name} encases itself in a crystal made of stopped time.`);
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}

				if (target.hp < target.maxhp) {
					const healAmount = Math.ceil(target.maxhp / 4);
					target.heal(healAmount);
					this.add('-heal', target, target.getHealth, '[from] move: Time Stop', '[silent]');
					this.add('-message', `The energy sustains ${target.name} inside the chrysalis.`);
					// Chrysalis (according to oxford)
					// a transitional state.
					// "she emerged from the chrysalis of self-conscious adolescence"
				}

				return this.NOT_FAIL;
			},
			onEnd(target) {
				target.switchFlag = 'timestop' as ID;
				this.add('-message', `${target.name} fades into the future.`);
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
};
