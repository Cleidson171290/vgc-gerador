import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
// O Render fornecerá a porta através de uma variável de ambiente.
// Usamos 3001 como fallback para o ambiente local.
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// A lógica de geração de time permanece a mesma...
const VGC_LOGIC = {
  pokemonData: {
    restricted: [
      {
        name: "miraidon",
        moves: [
          "Electro Drift",
          "Draco Meteor",
          "Volt Switch",
          "Dazzling Gleam",
          "Protect",
        ],
        items: ["Choice Specs", "Life Orb", "Assault Vest"],
        abilities: ["Hadron Engine"],
        teraTypes: ["electric", "dragon", "fairy"],
        builds: [
          {
            nature: "Timid",
            evs: { spa: 252, spe: 252, hp: 4 },
            ivs: { atk: 0 },
          },
        ],
      },
      {
        name: "koraidon",
        moves: [
          "Collision Course",
          "Flare Blitz",
          "Drain Punch",
          "U-turn",
          "Protect",
        ],
        items: ["Choice Scarf", "Choice Band", "Clear Amulet"],
        abilities: ["Orichalcum Pulse"],
        teraTypes: ["fire", "fighting", "dragon"],
        builds: [{ nature: "Jolly", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "calyrex-shadow-rider",
        apiName: "calyrex-shadow",
        types: ["psychic", "ghost"],
        moves: [
          "Astral Barrage",
          "Psyshock",
          "Draining Kiss",
          "Protect",
          "Nasty Plot",
        ],
        items: ["Focus Sash", "Life Orb"],
        abilities: ["As One (Spectrier)"],
        teraTypes: ["ghost", "normal", "fairy"],
        builds: [
          {
            nature: "Timid",
            evs: { spa: 252, spe: 252, hp: 4 },
            ivs: { atk: 0 },
          },
        ],
      },
      {
        name: "calyrex-ice-rider",
        apiName: "calyrex-ice",
        types: ["psychic", "ice"],
        moves: [
          "Glacial Lance",
          "High Horsepower",
          "Trick Room",
          "Protect",
          "Swords Dance",
        ],
        items: ["Clear Amulet", "Assault Vest"],
        abilities: ["As One (Glastrier)"],
        teraTypes: ["water", "fire", "ground"],
        builds: [
          {
            nature: "Brave",
            evs: { hp: 252, atk: 252, spd: 4 },
            ivs: { spe: 0 },
          },
        ],
      },
      {
        name: "kyogre",
        moves: [
          "Water Spout",
          "Origin Pulse",
          "Ice Beam",
          "Thunder",
          "Protect",
        ],
        items: ["Choice Scarf", "Mystic Water"],
        abilities: ["Drizzle"],
        teraTypes: ["water", "electric", "ice"],
        builds: [{ nature: "Modest", evs: { spa: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "groudon",
        moves: [
          "Precipice Blades",
          "Heat Crash",
          "Swords Dance",
          "Protect",
          "Rock Slide",
        ],
        items: ["Clear Amulet", "Life Orb"],
        abilities: ["Drought"],
        teraTypes: ["fire", "ground", "grass"],
        builds: [{ nature: "Adamant", evs: { hp: 252, atk: 252, spd: 4 } }],
      },
    ],
    common: [
      {
        name: "incineroar",
        moves: ["Fake Out", "Parting Shot", "Flare Blitz", "Knock Off"],
        items: ["Sitrus Berry", "Safety Goggles"],
        abilities: ["Intimidate"],
        teraTypes: ["grass", "dark", "ghost"],
        builds: [{ nature: "Careful", evs: { hp: 244, spd: 252, def: 12 } }],
      },
      {
        name: "rillaboom",
        moves: ["Grassy Glide", "Fake Out", "U-turn", "Wood Hammer"],
        items: ["Assault Vest", "Miracle Seed"],
        abilities: ["Grassy Surge"],
        teraTypes: ["grass", "fire", "normal"],
        builds: [{ nature: "Adamant", evs: { hp: 252, atk: 252, spd: 4 } }],
      },
      {
        name: "urshifu-rapid-strike",
        moves: ["Surging Strikes", "Close Combat", "Aqua Jet", "Detect"],
        items: ["Mystic Water", "Focus Sash"],
        abilities: ["Unseen Fist"],
        teraTypes: ["water", "dark", "fighting"],
        builds: [{ nature: "Jolly", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "amoonguss",
        moves: ["Spore", "Rage Powder", "Pollen Puff", "Protect"],
        items: ["Rocky Helmet", "Mental Herb"],
        abilities: ["Regenerator"],
        teraTypes: ["water", "dark", "fire"],
        builds: [
          {
            nature: "Relaxed",
            evs: { hp: 252, def: 252, spd: 4 },
            ivs: { atk: 0, spe: 0 },
          },
        ],
      },
      {
        name: "flutter-mane",
        moves: ["Moonblast", "Shadow Ball", "Icy Wind", "Protect"],
        items: ["Focus Sash", "Booster Energy"],
        abilities: ["Protosynthesis"],
        teraTypes: ["fairy", "stellar", "fire"],
        builds: [
          {
            nature: "Timid",
            evs: { spa: 252, spe: 252, hp: 4 },
            ivs: { atk: 0 },
          },
        ],
      },
      {
        name: "chien-pao",
        moves: ["Sucker Punch", "Icicle Crash", "Sacred Sword", "Protect"],
        items: ["Focus Sash", "Life Orb"],
        abilities: ["Sword of Ruin"],
        teraTypes: ["ghost", "dark", "electric"],
        builds: [{ nature: "Jolly", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "iron-hands",
        moves: ["Fake Out", "Drain Punch", "Wild Charge", "Heavy Slam"],
        items: ["Assault Vest", "Sitrus Berry"],
        abilities: ["Quark Drive"],
        teraTypes: ["fire", "grass", "water"],
        builds: [{ nature: "Adamant", evs: { hp: 212, atk: 252, spd: 44 } }],
      },
      {
        name: "tornadus-incarnate",
        moves: ["Bleakwind Storm", "Tailwind", "Protect", "Taunt"],
        items: ["Covert Cloak", "Mental Herb"],
        abilities: ["Prankster"],
        teraTypes: ["ghost", "steel", "flying"],
        builds: [{ nature: "Timid", evs: { spa: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "ogerpon-wellspring-mask",
        apiName: "ogerpon-wellspring-mask",
        types: ["grass", "water"],
        moves: ["Ivy Cudgel", "Follow Me", "Spiky Shield", "Horn Leech"],
        items: ["Wellspring Mask"],
        abilities: ["Water Absorb"],
        teraTypes: ["water"],
        builds: [{ nature: "Jolly", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "ogerpon-cornerstone-mask",
        apiName: "ogerpon-cornerstone-mask",
        types: ["grass", "rock"],
        moves: ["Ivy Cudgel", "Follow Me", "Spiky Shield", "Power Whip"],
        items: ["Cornerstone Mask"],
        abilities: ["Sturdy"],
        teraTypes: ["rock"],
        builds: [{ nature: "Jolly", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "ogerpon-hearthflame-mask",
        apiName: "ogerpon-hearthflame-mask",
        types: ["grass", "fire"],
        moves: ["Ivy Cudgel", "Follow Me", "Spiky Shield", "Flare Blitz"],
        items: ["Hearthflame Mask"],
        abilities: ["Mold Breaker"],
        teraTypes: ["fire"],
        builds: [{ nature: "Jolly", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "landorus-therian",
        moves: ["Stomping Tantrum", "U-turn", "Rock Slide", "Protect"],
        items: ["Assault Vest", "Choice Scarf"],
        abilities: ["Intimidate"],
        teraTypes: ["steel", "flying", "water"],
        builds: [{ nature: "Adamant", evs: { atk: 252, spe: 252, hp: 4 } }],
      },
      {
        name: "farigiraf",
        moves: ["Trick Room", "Psychic", "Hyper Voice", "Helping Hand"],
        items: ["Sitrus Berry", "Mental Herb"],
        abilities: ["Armor Tail"],
        teraTypes: ["fairy", "steel", "normal"],
        builds: [
          {
            nature: "Quiet",
            evs: { hp: 252, spa: 252, def: 4 },
            ivs: { atk: 0, spe: 0 },
          },
        ],
      },
      {
        name: "dondozo",
        moves: ["Wave Crash", "Order Up", "Curse", "Protect"],
        items: ["Leftovers", "Sitrus Berry"],
        abilities: ["Unaware"],
        teraTypes: ["grass", "steel", "dragon"],
        builds: [{ nature: "Careful", evs: { hp: 252, spd: 252, def: 4 } }],
      },
      {
        name: "archaludon",
        moves: ["Electro Shot", "Draco Meteor", "Flash Cannon", "Body Press"],
        items: ["Assault Vest", "Power Herb"],
        abilities: ["Stamina"],
        teraTypes: ["grass", "flying", "steel"],
        builds: [
          {
            nature: "Modest",
            evs: { hp: 252, spa: 252, spd: 4 },
            ivs: { atk: 0 },
          },
        ],
      },
    ],
  },

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  async generateTeam() {
    const { restricted, common } = this.pokemonData;
    const selectedRestricted = this.shuffleArray([...restricted]).slice(0, 1);
    const selectedCommon = this.shuffleArray([...common]).slice(0, 5);
    const teamPool = [...selectedRestricted, ...selectedCommon];

    let availableItems = teamPool.flatMap((p) => p.items);
    let uniqueItems = [...new Set(availableItems)];
    this.shuffleArray(uniqueItems);

    const teamWithItems = teamPool.map((p) => ({
      ...p,
      assignedItem: uniqueItems.pop() || "Leftovers",
    }));

    const promises = teamWithItems.map(async (pokemon) => {
      try {
        const apiNameToFetch = pokemon.apiName || pokemon.name;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${apiNameToFetch}`
        );
        if (!response.ok)
          throw new Error(`Pokémon não encontrado: ${apiNameToFetch}`);
        const data = await response.json();

        const selectedMoves = this.shuffleArray([...pokemon.moves]).slice(0, 4);
        const teraType = this.shuffleArray([...pokemon.teraTypes])[0];
        const selectedBuild = this.shuffleArray([...pokemon.builds])[0];
        const finalTypes = pokemon.types || data.types.map((t) => t.type.name);
        const displayName = pokemon.name
          .replace(/-mask$/, "")
          .replace(/-rider$/, "")
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          id: data.id,
          name: displayName,
          sprite: data.sprites.front_default,
          types: finalTypes,
          ability: this.shuffleArray(pokemon.abilities)[0],
          item: pokemon.assignedItem,
          moves: selectedMoves,
          teraType: teraType,
          ...selectedBuild,
        };
      } catch (error) {
        console.error("Erro ao buscar dados da PokéAPI:", error);
        return null;
      }
    });

    return (await Promise.all(promises)).filter((p) => p !== null);
  },
};

// Endpoint da API para gerar o time
app.get("/api/generate-team", async (req, res) => {
  try {
    const team = await VGC_LOGIC.generateTeam();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Falha ao gerar o time." });
  }
});

app.listen(port, () => {
  console.log(`Servidor back-end rodando na porta ${port}`);
});
