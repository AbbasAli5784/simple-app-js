const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    showDetails: function (pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
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
    loadList: function () {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            pokemonRepository.add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: function (pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types;
        })
        .catch(function (e) {
          console.error(e);
        });
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll();
});
