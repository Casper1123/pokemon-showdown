'use strict';

const assert = require('../../../test/assert');
const common = require('../../../test/common');

let battle;

describe('Chronal Distortions', () => {
	afterEach(() => {
		battle.destroy();
	});

	it('should set field condition and not expire in 5 turns', () => {
		battle = common.mod('gen9natdexcustom').createBattle([[
			{ species: 'Dialga', ability: 'chronaldistortions', moves: ['splash'] },
		], [
			{ species: 'Dialga', moves: ['splash'] },
		]]);

		battle.makeChoices('move splash', 'move splash');
		assert(battle.field.pseudoWeather['chronaldistortions']);
		for (let i = 0; i < 5; i++) {
			battle.makeChoices('move splash', 'move splash');
		}
		assert(battle.field.pseudoWeather['chronaldistortions'], 'Chronal Distortions should persist');
	});

	it('should maintain field condition when one user faints but another remains', () => {
		battle = common.mod('gen9natdexcustom').createBattle([[
			{ species: 'Dialga', ability: 'chronaldistortions', moves: ['earthpower'] },
		], [
			{ species: 'Dialga', level: 1, ability: 'chronaldistortions', moves: ['splash'] },
		]]);
		assert(battle.field.pseudoWeather['chronaldistortions'], 'Should exist.');
		battle.makeChoices('move earthpower', 'move splash');
		assert(battle.field.pseudoWeather['chronaldistortions'], 'Should maintain with remaining user');
	});

	it('should maintain field condition when one user switches but another remains', () => {
		battle = common.mod('gen9natdexcustom').createBattle([[
			{ species: 'Dialga', ability: 'chronaldistortions', moves: ['splash'] },
			{ species: 'Magikarp', ability: 'rattled', moves: ['splash'] },
		], [
			{ species: 'Dialga', ability: 'chronaldistortions', moves: ['splash'] },
		]]);
		assert(battle.field.pseudoWeather['chronaldistortions'], 'Should exist.');
		battle.makeChoices('switch 2', 'move splash');
		assert(battle.field.pseudoWeather['chronaldistortions'], 'Should maintain with remaining user');
	});

	it('Should activate the move again in 2 turns dealing damage again', () => {
		battle = common.mod('gen9natdexcustom').createBattle([[
			{ species: 'Dialga', ability: 'chronaldistortions', moves: ['dragonrage', 'splash'] },
		], [
			{ species: 'Dialga', ability: 'chronaldistortions', moves: ['dragonrage', 'splash'] },
		]]);

		const damageTaken_none = battle.p2.active[0].hp;
		battle.makeChoices('move dragonrage', 'move splash');
		const damageTaken_init = battle.p2.active[0].hp;
		battle.makeChoices('move splash', 'move splash');
		battle.makeChoices('move splash', 'move splash'); // Pass 2 turns.
		battle.makeChoices('move splash', 'move splash'); // One more just in case.
		const damageTaken_secondary = battle.p2.active[0].hp;

		assert(damageTaken_none > damageTaken_init, 'Move connected');
		assert(damageTaken_init > damageTaken_secondary, 'Move hit again.');
	});

	it('The distorted move is of the same type', () => {
		// Use psychic against a dark type, then when it hits it should not damage again.
		battle = common.mod('gen9natdexcustom').createBattle({ gameType: 'doubles' }, [[
			{ species: 'Celebi', ability: 'chronaldistortions', moves: ['psychic', 'splash'] },
			{ species: 'Celebi', ability: 'chronaldistortions', moves: ['psychic', 'splash'] },
		], [
			{ species: 'Lugia', ability: 'shellarmor', moves: ['splash'] },
			{ species: 'Yveltal', ability: 'shellarmor', moves: ['splash'] },
		]]);
		const startingHP_nonDark = battle.p2.active[0].hp;
		const startingHP_Dark = battle.p2.active[1].hp;

		battle.makeChoices('move psychic -1', 'move psychic -2', 'move splash', 'move splash');

		const mainHP_nonDark = battle.p2.active[0].hp;
		const mainHP_Dark = battle.p2.active[1].hp;

		for (let i = 0; i < 3; i++) {
			battle.makeChoices('move splash', 'move splash', 'move splash', 'move splash');
		}

		const secondaryHP_nonDark = battle.p2.active[0].hp;
		const secondaryHP_Dark = battle.p2.active[1].hp;

		assert(startingHP_nonDark > mainHP_nonDark, 'non-dark target taken damage.');
		assert(mainHP_nonDark > secondaryHP_nonDark, 'non-dark target taken damage from distortions.');

		assert(startingHP_Dark === mainHP_Dark, 'dark target not taken damage.');
		assert(mainHP_Dark === secondaryHP_Dark, 'dark target not taken damage from distortions.');
	});

	it('Should hit for less damage into targets with corresponding defensive boosts', () => {
		// Test using doubles. Make sure to set up Amnesia & Iron Defense
		battle = common.mod('gen9natdexcustom').createBattle({ gameType: 'doubles' }, [[
			{ species: 'Celebi', ability: 'chronaldistortions', moves: ['triattack', 'splash'] },
			{ species: 'Celebi', ability: 'chronaldistortions', moves: ['triattack', 'splash'] },
		], [
			{ species: 'Lugia', ability: 'stall', moves: ['splash', 'amnesia'] },
			{ species: 'Lugia', ability: 'stall', moves: ['splash', 'acidarmor'] },
		]]);
		const startingHP_1 = battle.p2.active[0].hp;
		const startingHP_2 = battle.p2.active[1].hp;

		battle.makeChoices('move triattack -1', 'move triattack -2', 'move splash', 'move splash');

		const mainHP_1 = battle.p2.active[0].hp;
		const mainHP_2 = battle.p2.active[1].hp;

		battle.makeChoices('move splash', 'move splash', 'move amnesia', 'move acidarmor');
		battle.makeChoices('move splash', 'move splash', 'move splash', 'move splash');

		const secondaryHP_1 = battle.p2.active[0].hp;
		const secondaryHP_2 = battle.p2.active[1].hp;

		assert(startingHP_1 > mainHP_1 > secondaryHP_1, 'Target took both damage instances.');
		assert(startingHP_2 > mainHP_2 > secondaryHP_2, 'Target took both damage instances.');

		// Make sure that damage taken by specially defensive is lower.
		assert(secondaryHP_1 > secondaryHP_2, 'specially defensive has higher hp');
	});

	it('Should not hit for more damage if a damage boost was obtained midway through', () => {
		// Test using doubles again. Have one of the two use a boosting move.
		const boostedDamage = [];
		const unboostedDamage = [];

		for (let i = 0; i < 100; i++) {
			battle = common.mod('gen9natdexcustom').createBattle({ gameType: 'doubles' }, [[
				{ species: 'ratata', ability: 'chronaldistortions', moves: ['tackle', 'bellydrum'] },
				{ species: 'ratata', ability: 'chronaldistortions', moves: ['tackle'] },
			], [
				{ species: 'Lugia', ability: 'stall', moves: ['splash'] },
				{ species: 'Lugia', ability: 'stall', moves: ['splash'] },
			]]);

			const startingHP_1 = battle.p2.active[0].hp;
			const startingHP_2 = battle.p2.active[1].hp;

			battle.makeChoices('move tackle -1', 'move tackle -2', 'move splash', 'move splash');
			battle.makeChoices('move bellydrum', 'move splash', 'move splash', 'move splash');
			battle.makeChoices('move splash', 'move splash', 'move splash', 'move splash');
			battle.makeChoices('move splash', 'move splash', 'move splash', 'move splash');

			const finalHP_1 = battle.p2.active[0].hp;
			const finalHP_2 = battle.p2.active[1].hp;
			boostedDamage.push(startingHP_1 - finalHP_1);
			unboostedDamage.push(startingHP_2 - finalHP_2);
			battle.destroy();
		}

		const avgDamageWithBoost = boostedDamage.reduce((a, b) => a + b) / boostedDamage.length;
		const avgDamageWithoutBoost = unboostedDamage.reduce((a, b) => a + b) / unboostedDamage.length;
		assert(Math.abs(avgDamageWithBoost - avgDamageWithoutBoost) < 5, 'Midway boosts should not affect future moves');
	});

	it('Should deal more damage if it was casted with boosted stats originally', () => {
		battle = common.mod('gen9natdexcustom').createBattle({ gameType: 'doubles' }, [[
			{ species: 'ratata', ability: 'chronaldistortions', moves: ['tackle', 'splash', 'bellydrum'] },
			{ species: 'ratata', ability: 'chronaldistortions', moves: ['tackle', 'splash'] },
		], [
			{ species: 'Lugia', ability: 'stall', moves: ['splash'] },
			{ species: 'Lugia', ability: 'stall', moves: ['splash'] },
		]]);
		const startingHP_1 = battle.p2.active[0].hp;
		const startingHP_2 = battle.p2.active[1].hp;

		battle.makeChoices('move bellydrum', 'move splash', 'move splash', 'move splash');

		assert.statStage(battle.p1.active[0], 'atk', 6, 'Belly drum attack boost');

		battle.makeChoices('move tackle -1', 'move tackle -2', 'move splash', 'move splash');
		const mainHP_1 = battle.p2.active[0].hp;
		const mainHP_2 = battle.p2.active[1].hp;
		battle.makeChoices('move splash', 'move splash', 'move splash', 'move splash');
		battle.makeChoices('move splash', 'move splash', 'move splash', 'move splash');

		const secondaryHP_1 = battle.p2.active[0].hp;
		const secondaryHP_2 = battle.p2.active[1].hp;
		const mainDamage_1 = startingHP_1 - mainHP_1;
		const mainDamage_2 = startingHP_2 - mainHP_2;

		const secondaryDamage_1 = mainHP_1 - secondaryHP_1;
		const secondaryDamage_2 = mainHP_2 - secondaryHP_2;

		assert(startingHP_1 > mainHP_1 > secondaryHP_1, 'Target took both damage instances.');
		assert(startingHP_2 > mainHP_2 > secondaryHP_2, 'Target took both damage instances.');

		// Make sure that damage taken by specially defensive is lower.
		assert(mainDamage_1 > mainDamage_2, 'belly drum main hit');
		assert(secondaryDamage_1 > secondaryDamage_2, 'belly drum secondary hit');
	});

	it('Should not pass to see if it\'s being ran.', () => { assert(false, "Intentional."); assert(true, "Intentional."); });
});

// To test:
// - Field condition is set
// - Field condition does not expire in 5 turns (like the client thinks it does)
// - Field condition is maintained if more than one user is on the field and one leaves.
// ? Moves deal 0.8x their regular power when cast
// ? > These immediate moves use the caster's stat boosts.
// -- NOTE: Assuming the ChainModify on the onBasePower covers this. Not fin-nicking with this for now.
// The used move deals damage again in 2 turns.
// > The distorted move deals 0.4x their regular power.
// > The distorted move cannot boost or lower the active pokémon's stat (testing for singles only right now) (example: Draco Meteor)
// > The distorted move does not do more damage if the user has a boost respective to their attacking type.
// > The distorted move does not do less damage if the user has it's respective attacking stat lowered.
// > The distorted move does more damage if the target has it's respective damage type defensive stat lowered.
// > The distorted move does less damage if the target has it's respective damage type defensive stat raised.
// The distorted move uses the stats of the original pokémon that used the move.
// > The distorted move does more damage if the original caster had it's respective attacking stat boosted.
// > The distorted move does less damage if the original caster had it's respective attacking stat lowered.
