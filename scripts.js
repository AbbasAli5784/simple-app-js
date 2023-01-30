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
    showDetails: function (pokemon) {
      console.log(pokemon.name);
    },
    addListItem: function (pokemon) {
      let list = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("my-button");
      button.addEventListener("click", function () {
        pokemonRepository.showDetails(pokemon);
      });
      listItem.appendChild(button);
      list.appendChild(listItem);
    },
    getAll: function () {
      pokemonList.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    },
  };
})();
pokemonRepository.add({ name: "Squirtle", height: 0.9, type: ["water"] });
pokemonRepository.getAll();
