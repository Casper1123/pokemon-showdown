import { ModConfig } from './config';

function isAgSet(dex: ModdedDex, set: PokemonSet): boolean {
	const species = dex.species.get(set.species);
	const item = set.item ? dex.items.get(set.item) : null;
	const itemId = item?.id || '';

	const megaAgCombos = new Set([
		'gengarite',
	]);

	if (megaAgCombos.has(itemId)) return true;

	return species.tier === 'AG';
}

function isUberSet(dex: ModdedDex, set: PokemonSet): boolean {
	const species = dex.species.get(set.species);
	const item = set.item ? dex.items.get(set.item) : null;
	const ability = set.ability ? dex.abilities.get(set.ability) : null;

	const id = species.id;
	const baseSpecies = species.baseSpecies || species.name;
	const itemId = item?.id || '';
	const abilityId = ability?.id || '';

	const megaUberCombos = new Set([
		'alakazite',
		'blastoisinite',
		'blazikenite',
		'kangaskhanite',
		'lucarionite',
		'metagrossite',
		'salamencite',
	]);

	if (baseSpecies === 'Rayquaza') {
		return true;
	}

	if (
		(baseSpecies === 'Zacian' && itemId === 'rustedsword') ||
		(baseSpecies === 'Zamazenta' && itemId === 'rustedshield') ||
		(id === 'ogerponhearthflamemask') ||
		(megaUberCombos.has(itemId)) ||
		(id.startsWith('zygarde') && abilityId === 'powerconstruct')
	) {
		return true;
	}

	return species.tier === 'Uber';
}

// The list of formats is stored in config/formats.js
export const Rulesets: import('../../../sim/dex-formats').FormatDataTable = {
	// Custom Rulesets
	///////////////////////////////////////////////////////////////////
	gen9customubersag: {
		effectType: 'ValidatorRule',
		name: 'gen9natdexcustom UbersAg',
		desc: 'Implements custom behaviour regarding the Ubers and AG mons during team validation. Made for NationalDex formats for singles.',
		onValidateTeam(team, format, teamHas) {
			const dex = this.dex;
			let uberCount = 0;
			let agCount = 0;

			for (const set of team) {
				if (isUberSet(dex, set)) {
					uberCount++;
				} else if (isAgSet(dex, set)) {
					agCount++;
				}
			}

			const problems: string[] = [];

			if (uberCount > ModConfig.maxUber) {
				problems.push(`You may only use up to ${ModConfig.maxUber} Uber-tier Pokémon (you have ${uberCount}).`);
			}

			if (agCount > ModConfig.maxAG) {
				problems.push(`You may only use up to ${ModConfig.maxAG} AG-tier Pokémon (you have ${agCount}).`);
			}

			if (uberCount + agCount > ModConfig.maxRestricted) {
				problems.push(`You may not use more than ${ModConfig.maxRestricted} Pokémon from the Uber or AG tiers combined (you have ${uberCount + agCount}).`);
			}

			if (uberCount > 0 && team.length > ModConfig.uberTeamSize) {
				problems.push(`Teams with Uber-tier Pokémon may only have up to ${ModConfig.uberTeamSize} total Pokémon (you have ${team.length}).`);
			}
			if (agCount > 0 && team.length > ModConfig.agTeamSize) {
				problems.push(`Teams with AG-tier Pokémon may only have up to ${ModConfig.agTeamSize} total Pokémon (you have ${team.length}).`);
			}

			return problems.length ? problems : undefined;
		},
	},

	gen9custommegaray: {
		effectType: 'Rule',
		name: 'gen9natdexcustom megaray',
		desc: 'Rayquaza can only Mega Evolve if its player has few enough pokémon for an AG team.',

		onBegin() {
			this.add('rule', 'Rayquaza can only Mega Evolve if its player has few enough pokémon for an AG team.');

			for (const side of this.sides) {
				const playerRayquaza = side.pokemon.find(p => p.species.id === 'rayquaza');
				if (!playerRayquaza) continue;
				if (side.pokemon.length > ModConfig.agTeamSize) {
					this.add('-message', `${side.name}'s Rayquaza cannot Mega Evolve because the team contains too many Pokémon for an AG to be legal.`);
					playerRayquaza.canMegaEvo = null;
					if (!this.ruleTable.has('terastalclause')) {
						playerRayquaza.canTerastallize = this.actions.canTerastallize(playerRayquaza);
					}
				}
			}
		},
	},
};
