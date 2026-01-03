export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([6144, 4096]); // 6144/4095 = 1.5. This is the power boost.
				}
			}
		},
		desc: "This Pokemon's Ground/Rock/Steel attacks do 1.5x in Sandstorm; immunity to it.",
		shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.5x in Sandstorm; immunity to it.",
	},
	// Custom abilities allowed
	chronaldistortion: {
		inherit: true,
		isNonstandard: null,
	},
	spacialdistortion: {
		inherit: true,
		isNonstandard: null,
	},
	absolutedistortion: {
		inherit: true,
		isNonstandard: null,
	},
	apexpredator: {
		inherit: true,
		isNonstandard: null,
	},
	frolicking: {
		inherit: true,
		isNonstandard: null,
	},
	shieldsdown: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Minior' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'protect') return;
			const targetForme = (move.id === 'protect' ? 'Minior' : 'Minior-Meteor');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		onSetStatus(status, target, source, effect) {
			if (target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Shields Down",
		rating: 4,
		num: 176,
		desc: "Transforms into Meteor-form when using an attacking move. Use Protect to transform back. Immune to Status.",
		shortDesc: "Stance Change with Protect. Immune to Status.",
	},
	teravolt: {
		inherit: true,
		onStart(pokemon) {
			this.field.setTerrain('electricterrain');
			this.add('-ability', pokemon, 'Teravolt');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onModifyAccuracyPriority: 5,
		onModifyAccuracy(relayVar, target, source, move) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Teravolt accuracy boost');
				return this.chainModify(1.2);
			}
		},
		desc: "Mold breaker + On switch-in, summons Electric Terrain. 1.2x accuracy if active.",
		shortDesc: "Mold breaker + On switch-in, summons Electric Terrain. 1.2x accuracy if active.",
		rating: 4,
	},
	turboblaze: {
		inherit: true,
		onStart(pokemon) {
			this.field.setWeather('sunnyday');
			this.add('-ability', pokemon, 'Turboblaze');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onModifyAccuracyPriority: 5,
		onModifyAccuracy(relayVar, target, source, move) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				this.debug('Teravolt accuracy boost');
				return this.chainModify(1.2);
			}
		},
		rating: 4,
		desc: "Mold breaker + On switch-in, summons Harsh Sun. 1.2x accuracy if active.",
		shortDesc: "Mold breaker + On switch-in, summons Harsh Sun. 1.2x accuracy if active.",
	},
};
