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
				this.add('-end', target, 'Future Move Multiple', '[silent]');

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
		onFieldStart(target, source) {
			this.add('-fieldstart', 'Chronal Distortions', `[of] ${source}`);
			this.add('-message', `${source.name} distorts the flow of time on the battlefield!`);
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.category !== 'Status' && move.id !== 'fakeout' && move.id !== 'futuresight' && move.id !== 'doomdesire') {
				return this.chainModify(0.8);
			}
		},
		onAfterMove(source, target, move) {
			if (move.category === 'Status' || move.id === 'fakeout' || move.id === 'futuresight' || move.id === 'doomdesire' || !target) return;

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

			this.add('-start', source, `move: ${move.name}`, '[future]');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Chronal Distortions');
			this.add('-message', 'The flow of time returns to normal.');
		},
	},
};
