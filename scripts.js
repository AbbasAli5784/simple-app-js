//old code below!

/*let message = " ";
pokemonList.forEach(function (user) {
  if (user.height > 0.6) {
    message = ":wow thats big!";
  } else {
    message = " ";
  }
  document.write(user.name + " " + user.height + " " + message + "<br>");
});*/
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, type: ["fire", "earth"] },
    { name: "Pikachu", height: 0.4, type: ["lightning", "earth"] },
  ];
  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      let result = "";
      pokemonList.forEach(function (pokemon) {
        let message = "";
        if (pokemon.height > 0.7) {
          message = "wow thats big!";
        }
        result += pokemon.name + " " + pokemon.height + " " + message + "<br>";
      });
      return result;
    },
  };
})();
pokemonRepository.add({ name: "Squirtle", height: 0.9, type: ["water"] });

document.write(pokemonRepository.getAll());
