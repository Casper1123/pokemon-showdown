import { ModConfig } from './config';

function isAgSet(dex: ModdedDex, set: PokemonSet, doubles: boolean): boolean {
	const species = dex.species.get(set.species);
	const item = set.item ? dex.items.get(set.item) : null;
	const itemId = item?.id || '';

	const megaAgCombos = new Set([
		'gengarite',
	]);

	if (megaAgCombos.has(itemId)) return true;

	let tier = species.natDexTier;
	if (doubles && species.natDexDoublesOverride) tier = species.natDexDoublesOverride;
	return tier === 'AG';
}

function isUberSet(dex: ModdedDex, set: PokemonSet, doubles: boolean): boolean {
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

	if ( // Todo: figure out a way to split this into doubles and singles, because Hearthflame *might* be fine.
		(baseSpecies === 'Zacian' && itemId === 'rustedsword') ||
		(baseSpecies === 'Zamazenta' && itemId === 'rustedshield') ||
		(id === 'ogerponhearthflamemask') ||
		(megaUberCombos.has(itemId)) ||
		(id.startsWith('zygarde') && abilityId === 'powerconstruct') ||
		(species.name === 'Dragapult' && set.item.endsWith('ium Z')) ||
		(species.id === 'zygarde' && (set.moves.includes('thousandarrows') || set.moves.includes('thousandwaves')))
	) {
		return true;
	}

	let tier = species.natDexTier;
	if (doubles && species.natDexDoublesOverride) tier = species.natDexDoublesOverride;
	return tier === 'Uber' || tier === 'MOD Uber' || tier === '(Uber)';
}

// The list of formats is stored in config/formats.js
export const Rulesets: import('../../../sim/dex-formats').FormatDataTable = {
	// Custom Rulesets
	///////////////////////////////////////////////////////////////////
	gen9natdexcustomubersag: {
		effectType: 'ValidatorRule',
		name: 'gen9natdexcustom UbersAg',
		desc: 'Implements custom behaviour regarding the Ubers and AG mons during team validation. Made for NationalDex formats for singles.',
		onValidateTeam(team, format, teamHas) {
			const dex = this.dex;
			let uberCount = 0;
			let agCount = 0;

			const isDoubles = this.format.gameType === 'doubles';

			for (const set of team) {
				if (isUberSet(dex, set, isDoubles)) {
					uberCount++;
				} else if (isAgSet(dex, set, isDoubles)) {
					agCount++;
				}
			}

			const problems: string[] = [];

			if (uberCount > (isDoubles ? ModConfig.doublesMaxUber : ModConfig.maxUber)) {
				problems.push(`You may only use up to ${ModConfig.maxUber} Uber-tier Pokémon (you have ${uberCount}).`);
			}

			if (agCount > (isDoubles ? ModConfig.doublesMaxAG : ModConfig.maxAG)) {
				problems.push(`You may only use up to ${ModConfig.maxAG} AG-tier Pokémon (you have ${agCount}).`);
			}

			if (uberCount + agCount > (isDoubles ? ModConfig.doublesMaxRestricted : ModConfig.maxRestricted)) {
				problems.push(`You may not use more than ${ModConfig.maxRestricted} Pokémon from the Uber or AG tiers combined (you have ${uberCount + agCount}).`);
			}

			if (uberCount > 0 && team.length > (isDoubles ? ModConfig.doublesUberTeamSize : ModConfig.uberTeamSize)) {
				problems.push(`Teams with Uber-tier Pokémon may only have up to ${ModConfig.uberTeamSize} total Pokémon (you have ${team.length}).`);
			}
			if (agCount > 0 && team.length > (isDoubles ? ModConfig.doublesAGTeamSize : ModConfig.agTeamSize)) {
				problems.push(`Teams with AG-tier Pokémon may only have up to ${ModConfig.agTeamSize} total Pokémon (you have ${team.length}).`);
			}

			return problems.length ? problems : undefined;
		},
	},

	gen9natdexcustommegaray: {
		effectType: 'Rule',
		name: 'gen9natdexcustom megaray',
		desc: 'Rayquaza can only Mega Evolve if its player has few enough pokémon for an AG team.',

		onBegin() {
			this.add('rule', 'Rayquaza can only Mega Evolve if its player has few enough pokémon for an AG team.');
			const isDoubles = this.format.gameType === 'doubles';

			for (const side of this.sides) {
				const playerRayquaza = side.pokemon.find(p => p.species.id === 'rayquaza');
				if (!playerRayquaza) continue;
				if (side.pokemon.length > (isDoubles ? ModConfig.doublesAGTeamSize : ModConfig.agTeamSize)) {
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
