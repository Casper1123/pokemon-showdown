import { applyChanges } from "./learnset_changes";
import { allFieldAbilities, protectedPseudoWeathers } from "../../conditions";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	gen: 9,
	init() {
		applyChanges(this);
	},
	pokemon: {
		isGrounded(negateImmunity) {
			if ('gravity' in this.battle.field.pseudoWeather ||
				'spacialdistortion' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !(this.hasType('???') && 'roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		ignoringAbility() {
			if (this.abilityState.suppressed) return true;

			if (this.battle.gen >= 5 && !this.isActive) return true;

			// Certain Abilities won't activate while Transformed, even if they ordinarily couldn't be suppressed (e.g. Disguise)
			if (this.getAbility().flags['notransform'] && this.transformed) return true;
			if (this.getAbility().flags['cantsuppress']) return false;
			if (this.volatiles['gastroacid']) return true;

			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityState.ending && !this.volatiles['commanding']) {
					return true;
				}
			}
			return false;
		},
		setAbility(ability, source, isFromFormeChange, isTransform) {
			if (!this.hp) return false;
			if (typeof ability === 'string') ability = this.battle.dex.abilities.get(ability);
			const oldAbility = this.ability;
			if (!isFromFormeChange) {
				if (ability.flags['cantsuppress'] || this.getAbility().flags['cantsuppress']) return false;
			}
			if (!isFromFormeChange && !isTransform) {
				const setAbilityEvent = this.battle.runEvent('SetAbility', this, source, this.battle.effect, ability);
				if (!setAbilityEvent) return setAbilityEvent;
			}
			this.battle.singleEvent('End', this.battle.dex.abilities.get(oldAbility), this.abilityState, this, source);
			if (this.battle.effect && this.battle.effect.effectType === 'Move' && !isFromFormeChange) {
				this.battle.add('-endability', this, this.battle.dex.abilities.get(oldAbility),
					`[from] move: ${this.battle.dex.moves.get(this.battle.effect.id)}`);
			}
			this.ability = ability.id;
			this.abilityState = this.battle.initEffectState({ id: ability.id, target: this });

			// Check if Absolute Distortion should suppress this ability
			if (this.battle.field.pseudoWeather['absolutedistortion'] || this.battle.field.pseudoWeather['Absolute Distortion']) {
				if (allFieldAbilities.includes(ability.id) && !protectedPseudoWeathers.includes(ability.id)) {
					this.abilityState.suppressed = true; // IMPORTANT: Has to happen before the singleEvent call below, otherwise newly aquired abilities from mega and such will start.
				}
			}
			if (ability.id && this.battle.gen > 3 &&
				(!isTransform || oldAbility !== ability.id || this.battle.gen <= 4)) {
				this.battle.singleEvent('Start', ability, this.abilityState, this, source);
			}
			return oldAbility;
		},
	},
};
