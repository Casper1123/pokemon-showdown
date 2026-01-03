import { Dex } from '../../../sim/dex';
import { setMove } from '../../../utilities/mod_alter';

/**
 * A function to apply movepool changes. Works like the script in 'mods/vaporemons'
 * just outside of the scripts.ts file to allow us to easily inject a patch object to track changes applied to the mod.
 * @param data
 */
export function applyChanges(data: ModdedDex): void {
	// Very shoddy script for adding Hidden Power to mons that don't get it (gen8, gen9)
	// Add Hidden Power to all Pokémon introduced after gen7, because the move was dexited in gen8. Might be risky with Regieleki :/
	const dex = Dex.mod('gen9natdexcustom');
	for (const species of dex.species.all()) {
		// Hidden power for everyone gen8+
		if (species.gen >= 8) {
			const id = species.id;
			if (!data.data.Learnsets[id]) {
				continue;
			} else if (!data.data.Learnsets[id].learnset) {
				data.data.Learnsets[id].learnset = {};
			}
			setMove(data, id, 'hiddenpower');
		}
		// tera blast for everyone
		if (species.gen < 9) {
			const id = species.id;
			if (!data.data.Learnsets[id]) {
				continue;
			} else if (!data.data.Learnsets[id].learnset) {
				data.data.Learnsets[id].learnset = {};
			}
			setMove(data, id, 'terablast');
		}
	}

	// region Gen1
	setMove(data, 'pidgeot', 'zapcannon');
	setMove(data, 'pidgeot', 'thunder');
	setMove(data, 'pidgeot', 'inferno');
	setMove(data, 'pidgeot', 'focusblast');
	setMove(data, 'moltresgalar', 'roost');
	// endregion
	// region Gen2
	setMove(data, 'ampharos', 'dracometeor');
	setMove(data, 'ampharos', 'tailglow');
	setMove(data, 'ampharos', 'thunderclap');
	setMove(data, 'ampharos', 'paraboliccharge');
	setMove(data, 'typhlosion', 'earthpower');
	setMove(data, 'typhlosionhisui', 'shadowflame');
	setMove(data, 'celebi', 'timestop');
	setMove(data, 'suicune', 'mistyexplosion');
	setMove(data, 'suicune', 'mistball');
	setMove(data, 'suicune', 'strangesteam');
	setMove(data, 'suicune', 'mistyterrain');
	setMove(data, 'suicune', 'recover');
	setMove(data, 'steelix', 'coil');
	setMove(data, 'raikou', 'tailwind');
	setMove(data, 'houndoom', 'fierywrath');
	setMove(data, 'politoed', 'recover');
	setMove(data, 'crobat', 'gunkshot');
	// endregion
	// region Gen3
	setMove(data, 'absol', 'lightofruin');
	setMove(data, 'absol', 'spiritbreak');
	setMove(data, 'absol', 'partingshot');
	setMove(data, 'flygon', 'desertsong'); // Custom signature move.
	setMove(data, 'flygon', 'nastyplot');
	setMove(data, 'aggron', 'hornleech');
	setMove(data, 'aggron', 'slackoff');
	setMove(data, 'manectric', 'icebeam');
	setMove(data, 'manectric', 'paraboliccharge');
	setMove(data, 'sceptile', 'dracometeor');
	setMove(data, 'sceptile', 'chloroblast');
	setMove(data, 'sceptile', 'nastyplot');
	setMove(data, 'deoxys', 'bodypress');
	setMove(data, 'metagross', 'swordsdance');
	setMove(data, 'altaria', 'explosion');
	setMove(data, 'altaria', 'doubleedge');
	setMove(data, 'altaria', 'smellingsalts');
	setMove(data, 'altaria', 'calmmind');
	setMove(data, 'altaria', 'drainingkiss');
	setMove(data, 'camerupt', 'sandsearstorm');
	setMove(data, 'sharpedo', 'swordsdance');
	setMove(data, 'banette', 'poltergheist');
	setMove(data, 'banette', 'shadowforce');
	setMove(data, 'banette', 'stalk');
	setMove(data, 'latias', 'moonblast');
	// endregion
	// region Gen4
	setMove(data, 'hippowdon', 'spikes');
	setMove(data, 'hippowdon', 'knockoff');
	setMove(data, 'empoleon', 'auroraveil');
	setMove(data, 'empoleon', 'reflect');
	setMove(data, 'empoleon', 'lightscreen');
	setMove(data, 'shaymin', 'sparklyswirl');
	setMove(data, 'shaymin', 'lightofruin');
	setMove(data, 'shaymin', 'floralhealing');
	setMove(data, 'glaceon', 'glaciate');
	setMove(data, 'toxicroak', 'jetpunch');
	setMove(data, 'toxicroak', 'machpunch');
	setMove(data, 'toxicroak', 'liquidation');
	setMove(data, 'toxicroak', 'uturn');
	setMove(data, 'rotomheat', 'heatwave');
	setMove(data, 'rotom', 'recover');
	setMove(data, 'rotomheat', 'recover');
	setMove(data, 'rotommow', 'recover');
	setMove(data, 'rotomwash', 'recover');
	setMove(data, 'rotomfan', 'recover');
	setMove(data, 'rotomfrost', 'recover');
	setMove(data, 'rotomheat', 'firepledge');
	setMove(data, 'rotomheat', 'inferno');
	setMove(data, 'rotommow', 'grasspledge');
	setMove(data, 'rotommow', 'magicalleaf');
	setMove(data, 'rotommow', 'grassknot');
	setMove(data, 'rotomwash', 'waterpledge');
	setMove(data, 'rotomwash', 'muddywater');
	setMove(data, 'rotomwash', 'scald');
	setMove(data, 'rotomwash', 'brine');
	setMove(data, 'rotomfan', 'tailwind');
	setMove(data, 'rotomfan', 'aircutter');
	setMove(data, 'rotomfrost', 'glaciate');
	setMove(data, 'rotomfrost', 'freezedry');
	setMove(data, 'rotomfrost', 'icywind');
	setMove(data, 'palkia', 'originpulse');
	setMove(data, 'palkia', 'hyperspacehole');
	setMove(data, 'giratina', 'roost');
	setMove(data, 'giratina', 'spikes');
	setMove(data, 'giratina', 'toxicspikes');
	setMove(data, 'giratina', 'stealthrock');
	setMove(data, 'giratina', 'sandstorm');
	setMove(data, 'giratina', 'hail');
	setMove(data, 'giratina', 'snowscape');
	setMove(data, 'giratina', 'grassyterrain');
	setMove(data, 'giratina', 'electricterrain');
	setMove(data, 'giratina', 'psychicterrain');
	setMove(data, 'giratina', 'mistyterrain');
	setMove(data, 'giratina', 'fairylock');
	setMove(data, 'giratina', 'iondeluge');
	setMove(data, 'giratina', 'magicroom');
	setMove(data, 'giratina', 'mudsport');
	setMove(data, 'giratina', 'wonderroom');
	setMove(data, 'giratina', 'trickroom');
	setMove(data, 'giratina', 'watersport');
	setMove(data, 'giratina', 'recover');
	setMove(data, 'giratina', 'stalk');
	setMove(data, 'gallade', 'crosspoison');
	setMove(data, 'drapion', 'wickedblow');
	// endregion
	// region Gen5
	setMove(data, 'serperior', 'mudshot');
	setMove(data, 'conkeldurr', 'steamroller');
	setMove(data, 'conkeldurr', 'fakeout');
	setMove(data, 'conkeldurr', 'meteormash');
	setMove(data, 'scolipede', 'collisioncourse');
	setMove(data, 'haxorus', 'dragonrush');
	setMove(data, 'durant', 'highhorsepower');
	setMove(data, 'durant', 'stealthrock');
	setMove(data, 'gigalith', 'diamondstorm');
	setMove(data, 'gigalith', 'shoreup');
	setMove(data, 'gigalith', 'trickroom');
	setMove(data, 'boldore', 'diamondstorm');
	setMove(data, 'boldore', 'shoreup');
	setMove(data, 'boldore', 'trickroom');
	setMove(data, 'roggenrola', 'diamondstorm');
	setMove(data, 'roggenrola', 'shoreup');
	setMove(data, 'roggenrola', 'trickroom');
	setMove(data, 'boldore', 'diamondstorm');
	setMove(data, 'boldore', 'shoreup');
	setMove(data, 'boldore', 'trickroom');
	setMove(data, 'cobalion', 'secretsword');
	setMove(data, 'cobalion', 'nastyplot');
	setMove(data, 'virizion', 'secretsword');
	setMove(data, 'virizion', 'nastyplot');
	setMove(data, 'terrakion', 'accelerock');
	setMove(data, 'swanna', 'wavecrash');
	setMove(data, 'samurott', 'shellsmash');
	setMove(data, 'samurott', 'sacredsword');
	setMove(data, 'samurott', 'secretsword');
	setMove(data, 'samurott', 'closecombat');
	setMove(data, 'samurott', 'wavecrash');
	setMove(data, 'reuniclus', 'teleport');
	setMove(data, 'reuniclus', 'aurasphere');
	setMove(data, 'reuniclus', 'vacuumwave');
	setMove(data, 'krookodile', 'swordsdance');
	setMove(data, 'cofagrigus', 'strengthsap');
	setMove(data, 'zoroark', 'vacuumwave');
	setMove(data, 'zoroarkhisui', 'vacuumwave');
	setMove(data, 'zoroarkhisui', 'vacuumwave');
	setMove(data, 'chandelure', 'shadowflame');
	setMove(data, 'chandelure', 'blueflare');
	setMove(data, 'chandelure', 'burnup');
	setMove(data, 'chandelure', 'mindblown');
	setMove(data, 'chandelure', 'searingshot');
	setMove(data, 'audino', 'followme');
	setMove(data, 'audino', 'teleport');
	setMove(data, 'audino', 'nuzzle');
	setMove(data, 'beartic', 'iceshard');
	setMove(data, 'musharna', 'wideguard');
	setMove(data, 'kyuremwhite', 'glaciate');
	setMove(data, 'kyuremblack', 'glaciate');
	setMove(data, 'victini', 'psychocut');
	setMove(data, 'basculegion', 'shadowfang');
	setMove(data, 'basculegionf', 'shadowfang');
	setMove(data, 'leavanny', 'bulletpunch');
	setMove(data, 'leavanny', 'needlethrow');
	setMove(data, 'leavanny', 'weavegarments');
	setMove(data, 'leavanny', 'assurance');
	setMove(data, 'leavanny', 'closecombat');
	setMove(data, 'leavanny', 'dualchop');
	setMove(data, 'leavanny', 'upperhand');
	setMove(data, 'leavanny', 'quickguard');

	// endregion
	// region Gen6
	// endregion
	// region Gen7
	setMove(data, 'necrozma', 'neutronray'); // Custom signature move. ensure not usable by merged forms.
	setMove(data, 'minior', 'accelerock');
	setMove(data, 'minior', 'hurricane');
	setMove(data, 'minior', 'airslash');
	setMove(data, 'golisopod', 'uturn');
	setMove(data, 'tapubulu', 'spiritbreak');
	setMove(data, 'tapubulu', 'playrough');
	// endregion
	// region Gen8
	setMove(data, 'wooloo', 'bodypress');
	setMove(data, 'dubwool', 'megahorn');
	setMove(data, 'dubwool', 'hornleech');
	setMove(data, 'wooloo', 'tickle');
	setMove(data, 'wooloo', 'yawn');
	setMove(data, 'wooloo', 'headcharge');
	setMove(data, 'wooloo', 'slackoff');
	setMove(data, 'wooloo', 'nuzzle');
	setMove(data, 'wooloo', 'headsmash');
	setMove(data, 'wooloo', 'grassyglide');
	setMove(data, 'wooloo', 'trailblaze');
	setMove(data, 'wooloo', 'collisioncourse');
	setMove(data, 'wooloo', 'quickguard');
	setMove(data, 'wooloo', 'headlongrush');
	setMove(data, 'wooloo', 'stompingtantrum');
	setMove(data, 'wooloo', 'lunge');
	setMove(data, 'wooloo', 'steamroller');
	setMove(data, 'wooloo', 'bite');
	setMove(data, 'wooloo', 'crunch');
	setMove(data, 'wooloo', 'pursuit');
	setMove(data, 'wooloo', 'faketears');
	setMove(data, 'wooloo', 'quash');
	setMove(data, 'wooloo', 'ironhead');
	setMove(data, 'wooloo', 'steelroller');
	setMove(data, 'wooloo', 'playrough');
	setMove(data, 'wooloo', 'babydolleyes');
	setMove(data, 'wooloo', 'tearfullook');
	setMove(data, 'wooloo', 'amnesia');
	setMove(data, 'dubwool', 'tickle');
	setMove(data, 'dubwool', 'yawn');
	setMove(data, 'dubwool', 'headcharge');
	setMove(data, 'dubwool', 'slackoff');
	setMove(data, 'dubwool', 'nuzzle');
	setMove(data, 'dubwool', 'headsmash');
	setMove(data, 'dubwool', 'grassyglide');
	setMove(data, 'dubwool', 'trailblaze');
	setMove(data, 'dubwool', 'collisioncourse');
	setMove(data, 'dubwool', 'quickguard');
	setMove(data, 'dubwool', 'headlongrush');
	setMove(data, 'dubwool', 'stompingtantrum');
	setMove(data, 'dubwool', 'lunge');
	setMove(data, 'dubwool', 'steamroller');
	setMove(data, 'dubwool', 'bite');
	setMove(data, 'dubwool', 'crunch');
	setMove(data, 'dubwool', 'pursuit');
	setMove(data, 'dubwool', 'faketears');
	setMove(data, 'dubwool', 'quash');
	setMove(data, 'dubwool', 'ironhead');
	setMove(data, 'dubwool', 'steelroller');
	setMove(data, 'dubwool', 'playrough');
	setMove(data, 'dubwool', 'babydolleyes');
	setMove(data, 'dubwool', 'tearfullook');
	setMove(data, 'dubwool', 'amnesia');
	// endregion
	// region Gen9
	setMove(data, 'slitherwing', 'victorydance');
	// endregion
}
