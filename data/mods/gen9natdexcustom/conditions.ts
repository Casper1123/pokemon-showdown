import { type ModdedConditionData } from "../../../sim/dex-conditions";

const weatherAbilities = ['desolateland', 'primordialsea', 'deltastream',
	'drizzle', 'sandstream', 'snowwarning', 'drought', 'orichalcumpulse'];
const terrainAbilities = ['psychicsurge', 'mistysurge', 'grassysurge', 'electricsurge', 'hadronengine'];
const allFieldAbilities = [...weatherAbilities, ...terrainAbilities];
const protectedPseudoWeathers = ['chronaldistortions', 'spacialdistortions', 'absolutedistortions'];
const hazards = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];

const chronalDistortionsExceptions = ['fakeout', 'futuresight', 'doomdesire', 'thunderclap', 'suckerpunch'];

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

				if (target.fainted) {
					this.add('-message', `A fragment of a ${distortion.moveData.name} from the past disintegrates in the distance.`);
					continue;
				}
				this.add('-message', `A fragment of a ${distortion.moveData.name} from the past hits ${target.name}!`);
				try {
					this.actions.tryMoveHit(target, distortion.source, distortion.moveData as ActiveMove);
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
	chronaldistortion: {
		name: 'Chronal Distortion',
		duration: 0,
		onFieldStart(target, source) {
			this.add('-fieldstart', 'Chronal Distortion', `[of] ${source}`, '[silent]');
			this.add('-message', `Time seems to slow down and accelerate everywhere at the same time, ${source.name} is distorting the flow of time on the battlefield!`);
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.category !== 'Status' && !chronalDistortionsExceptions.includes(move.id)) {
				return this.chainModify(0.8);
			}
		},
		onAfterMove(source, target, move) {
			// FIXME: If move failed, do not queue. Currently queues when it hits protect or, for example, is a failed sucker.
			// FIXME: Mimic move should not go through protect.
			if (move.category === 'Status' || chronalDistortionsExceptions.includes(move.id) || !target) return;

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
			this.add('-fieldend', 'Chronal Distortion');
			this.add('-message', 'The flow of time returns to normal.');
		},
	},

	spacialdistortion: {
		name: "Spacial Distortion",
		duration: 0,
		onFieldStart(target, source) {
			this.add('-fieldstart', 'Spacial Distortion', `[of] ${source}`, '[silent]');
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
				if (pokemon.hasAbility('spacialdistortion')) {
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
				this.effectState.persistTurns = 2;
				this.add('-message', 'Space turns the tides against the distortion ...');
			} else {
				this.effectState.persistTurns--;
				if (this.effectState.persistTurns <= 0) {
					this.field.removePseudoWeather('spacialdistortion');
					return;
				}
				this.add('-message', `Space is winning its fight against the distortion ... (${this.effectState.persistTurns} turn${this.effectState.persistTurns === 1 ? '' : 's'})`);
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
				this.add('cant', pokemon, 'ability: Spacial Distortion', move);
				return false;
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Spacial Distortion');
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

	absolutedistortion: {
		name: "Absolute Distortion",
		duration: 0,
		onFieldStart(target, source) {
			this.add('-fieldstart', 'Absolute Distortion', `[of] ${source}`);
			this.add('-message', `${source.name} drags everything into the Distortion World!`);

			for (const pokemon of this.getAllActive()) {
				if (allFieldAbilities.includes(pokemon.getAbility().id)) {
					pokemon.abilityState.suppressed = true;
				}
			}

			this.field.clearWeather();
			this.field.clearTerrain();
			for (const pseudoWeather of Object.keys(this.field.pseudoWeather)) {
				if (!protectedPseudoWeathers.includes(pseudoWeather)) {
					this.field.removePseudoWeather(pseudoWeather);
				}
			}
			for (const side of this.sides) {
				for (const hazard of hazards) {
					side.removeSideCondition(hazard);
				}
			}
		},
		onTryMove(attacker, defender, move) {
			if (attacker.hasAbility('absolutedistortion') && !attacker.abilityState.suppressed) return;
			if (move.category === 'Status' && (
				move.weather || move.terrain || move.pseudoWeather ||
				(move.sideCondition && hazards.includes(move.sideCondition))
			)) {
				this.add('-fail', attacker, move, '[from] Absolute Distortion');
				this.add('-message', 'You do not own this realm.'); // Todo: Randomize flavour text from a small pool.
				return false;
			}
		},
		onSwitchIn(pokemon) {
			const allowedDistortions = ['chronaldistortions', 'spacialdistortions', 'absolutedistortion'];

			if (allFieldAbilities.includes(pokemon.getAbility().id) && !allowedDistortions.includes(pokemon.getAbility().id)) {
				pokemon.abilityState.suppressed = true;
				this.add('-message', `${pokemon.name} cannot use ${pokemon.getAbility().name}, this realm's master forbids it.`);
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Absolute Distortion');
			this.add('-message', `The Distortion World fades from the surrounding, everything emerges back to normal reality.`);

			const sortedActive = this.getAllActive();
			this.speedSort(sortedActive);

			for (const pokemon of sortedActive) {
				if (pokemon.fainted) continue;
				if (['chronaldistortions', 'spacialdistortions', 'absolutedistortion'].includes(pokemon.getAbility().id)) continue;
				if (pokemon.volatiles['gastroacid']) continue;
				const ability = pokemon.getAbility();

				if (allFieldAbilities.includes(ability.id)) {
					if (pokemon.abilityState.suppressed) {
						pokemon.abilityState.suppressed = false;
					}
					this.singleEvent('Start', ability, pokemon.abilityState, pokemon);
				}
			}
		},
	},
};
