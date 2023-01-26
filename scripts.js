let pokemonList = [
  { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, type: ["fire", "earth"] },
  { name: "Pikachu", height: 0.4, type: ["lightning", "earth"] },
];
let names = "";
for (i = 0; i < pokemonList.length; i++) {
  names +=
    pokemonList[i].name + " " + " (height: " + pokemonList[i].height + ")";

  if (pokemonList[i].height > 0.6) {
    names += " -wow thats big! ";
  }
  names += "<br>";
}
document.write(names);
