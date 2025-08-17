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

	// Custom moves:
	desertsong: {
		num: -4,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Desert Song",
		pp: 10,
		priority: 0,
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
		isNonstandard: "Custom",
		desc: "Sets Sandstorm weather effect on hit.",
		shortDesc: "Sets Sandstorm on hit.",
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
	},
};
// todo: figure out how to export anything but the functions. Also, be able to appropriately update the description text.
// trickroom: {
//	inherit: true,
//		condition: {
//		duration: 6, // Only change here, but full redefinition is required. How will this fit into JSON?
//			durationCallback(source, effect) {
//			if (source?.hasAbility('persistent')) {
//				this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
//				return 7;
//			}
//			return 5;
//		},
//		onFieldStart(target, source) {
//			if (source?.hasAbility('persistent')) {
//				this.add('-fieldstart', 'move: Trick Room', `[of] ${source}`, '[persistent]');
//			} else {
//				this.add('-fieldstart', 'move: Trick Room', `[of] ${source}`);
//			}
//		},
//		onFieldRestart(target, source) {
//			this.field.removePseudoWeather('trickroom');
//		},
//		// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
//		onFieldResidualOrder: 27,
//			onFieldResidualSubOrder: 1,
//			onFieldEnd() {
//			this.add('-fieldend', 'move: Trick Room');
//		},
//	},
// },
