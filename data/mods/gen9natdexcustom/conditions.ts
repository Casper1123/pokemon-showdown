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

	// Custom
	distortedmove: {
		name: 'Distorted Move',
		onStart(target, source, sourceEffect) {
			if (!this.effectState.moves) {
				this.effectState.moves = [];
			}
		},
		onRestart(target, source, sourceEffect) {
			return true;
		},
		onResidualOrder: 3,
		onResidual(target) {
			if (!this.effectState.moves || this.effectState.moves.length === 0) {
				target.side.removeSlotCondition(target, 'distortedmove');
				return;
			}

			// @ts-expect-error
			const readyMoves = this.effectState.moves.filter(moveData => {
				try {
					moveData.duration--;
					return moveData.duration <= 0;
				} catch (e) {
					console.debug(e, "during distorted move readymoves filtering");
					return false;
				}
			});

			// @ts-expect-error
			this.effectState.moves = this.effectState.moves.filter(moveData => moveData.duration > 0);

			for (const distortion of readyMoves) {
				// @ts-expect-error
				if (this.effectState.moves.filter(moveData => moveData.moveData.name === distortion.name).length === 0) {
					this.add('-end', target, `move: ${distortion.moveData.name}`, '[silent]');
				}

				let actualTarget = target;
				if (target.fainted) {
					const adjacentTargets = target.adjacentFoes().filter(pokemon => !pokemon.fainted);
					const aliveTargets = target.foes().filter(pokemon => !pokemon.fainted);
					if (adjacentTargets.length > 0) {
						actualTarget = this.sample(adjacentTargets);
					} else if (aliveTargets.length > 0) {
						actualTarget = this.sample(aliveTargets);
					} else {
						this.add('-message', `A fragment of a ${distortion.moveData.name} from the past disintegrates in the distance.`);
						continue;
					}
				}
				this.add('-message', `A fragment of a ${distortion.moveData.name} from the past hits ${actualTarget.name}!`);
				try {
					this.actions.tryMoveHit(actualTarget, distortion.source, distortion.moveData as ActiveMove);
				} catch (e) {
					console.debug(e, "in move execution.");
					this.add('-message', `A fragment of a ${distortion.moveData.name} from the past.. fizzles due to an internal server error! THE HORROR!`);
				}
			}

			// Remove condition if empty.
			if (this.effectState.moves.length === 0) {
				target.side.removeSlotCondition(target, 'distortedmove');
			}
		},
	},
	chronaldistortions: {
		name: 'Chronal Distortions',
		duration: 0,
		onFieldStart(target, source) {
			this.add('-fieldstart', 'Chronal Distortions', `[of] ${source}`, '[silent]');
			this.add('-message', `Time seems to slow down and accelerate everywhere at the same time, ${source.name} is distorting the flow of time on the battlefield!`);
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.category !== 'Status' && move.id !== 'fakeout' && move.id !== 'futuresight' &&
				move.id !== 'doomdesire') {
				return this.chainModify(0.8);
			}
		},
		onAfterMove(source, target, move) {
			if (move.category === 'Status' || move.id === 'fakeout' || move.id === 'futuresight' ||
				move.id === 'doomdesire' || !target) return;

			if (!target.side.addSlotCondition(target, 'distortedmove')) {
				target.side.addSlotCondition(target, 'distortedmove');
			}

			const slotCondition = target.side.slotConditions[target.position]['distortedmove'];
			if (!slotCondition.moves) {
				slotCondition.moves = [];
			}

			slotCondition.moves.push({
				duration: 3,
				move: move.id,
				source,
				moveData: {
					...move,
					basePower: Math.floor(move.basePower * 0.4),
					selfBoost: null,
				},
			});

			this.add('-start', target, `move: ${move.name}`, '[future]', '[silent]');
			this.add('-message', `${source.name}'s ${move.name} is scattered through time.`);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Chronal Distortions');
			this.add('-message', 'The flow of time returns to normal.');
		},
	},

	spatialdistortions: {
		name: "Spatial Distortions",
		duration: 0,
		onFieldStart(target, source) {
			this.add('-fieldstart', 'Spatial Distortions', `[of] ${source}`);
			this.add('-message', `Space looks to be crashing in on itself, fighting back violently; ${source.name} is distorting the space on the battlefield!`);
			this.effectState.abilityActive = true;
			this.effectState.persistTurns = 0;
		},
		onFieldRestart(target, source) {
			this.effectState.abilityActive = true;
			this.effectState.persistTurns = 0;
		},
		onFieldResidualOrder: 27,
		onFieldResidual() {
			let hasAbilityUser = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('spatialdistortions')) {
					hasAbilityUser = true;
					break;
				}
			}

			if (hasAbilityUser) {
				this.effectState.abilityActive = true;
				this.effectState.persistTurns = 0;
				this.add('-message', 'Space crashes in on itself, fighting an endless struggle.');
			} else if (this.effectState.abilityActive) {
				this.effectState.abilityActive = false;
				this.effectState.persistTurns = 1;
				this.add('-message', 'Space turns the tides against the distortion ...');
			} else {
				this.effectState.persistTurns--;
				if (this.effectState.persistTurns <= 0) {
					this.field.removePseudoWeather('spatialdistortions');
					this.add('-message', 'Space rests back in a state of normalcy.');
					return;
				}
				this.add('-message', `Space is winning its fight against the distortion ... (${this.effectState.persistTurns} turn${this.effectState.persistTurns === 1 ? '\'' : 's'})`);
			}
		},
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			return this.chainModify([6840, 4096]); // 1.67x accuracy
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onBeforeMovePriority: 6,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['gravity'] && !move.isZ) {
				this.add('cant', pokemon, 'ability: Spatial Distortions', move);
				return false;
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Spatial Distortions');
			this.add('-message', 'Space returns to a state of normalcy.');
			// Remove grounding effects when field ends, just in case. They're not supposed to be on but SOMEHOW
			const activePokemon = this.getAllActive();
			for (const pokemon of activePokemon) {
				if (pokemon.volatiles['magnetrise']) {
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					delete pokemon.volatiles['telekinesis'];
				}
			}
		},
	},

	entropicdistortions: {
		name: "Entropic Distortions",
		duration: 0,
	}, // Todo: disable Abilities & Items?
};
