const { error } = require("console");
const fs = require("fs");

async function generateJsonDB() {

  try {
    // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
  const pokelist = await fetch(pokemonApiURL).then((res)=>res.json()) ;
  console.log(pokelist);
  const payload=[];

    for (let index = 0; index < pokelist.results.length; index++) {
      const pokemon = pokelist.results[index];
      const detail = await fetch(pokemon.url).then((res)=>res.json());
      const species = await fetch(detail.species.url).then((res)=>res.json());
      const evo = await fetch(species.evolution_chain.url).then((res)=>res.json());
      
      const evolutionChains=[evo.chain.species.name];
      let evolveTo = evo.chain.evolves_to[0];
      while (evolveTo) {
        evolutionChains.push(evolveTo.species.name);
        evolveTo = evolveTo.evolves_to[0];
      }
      const item = {
        id: detail.id,
        name: pokemon.name,
        types:detail.types.map((ab)=>ab.type.name),
        abilities:detail.abilities.map((ab)=> ab.ability.name),
        height:detail.height,
        weight:detail.weight,
        cries:detail.cries,
        evolutionChains: evolutionChains
      };
      payload.push(item);
      console.log(detail);      
    }
    console.log(payload);
    fs.writeFileSync(
      "./db.json",
      JSON.stringify({pokemon:payload}, null, 2),
      "utf-8"
    );

  } catch (error) {
    console.error(error)
  }
  
}

generateJsonDB();
