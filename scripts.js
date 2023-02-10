const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    showModal: function (pokemon) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      modalBody.empty();
      modalTitle.empty();

      let name = $("<h5>" + "Pokemon:" + " " + pokemon.name + "</h5>");
      let height = $("<p>" + "Height:" + pokemon.height + "</p>");
      let type = $("<p>" + "Type:" + pokemon.types + "</p>");
      let image = $('<img class = "modal-img" style = "width:40%">').attr(
        "src",
        pokemon.imageUrl
      );

      modalTitle.append(name);
      modalBody.append(height);
      modalBody.append(type);
      modalBody.append(image);

      showModal();
    },
    showDetails: function (pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        pokemonRepository.showModal(pokemon);
      });
    },
    addListItem: function (pokemon) {
      let list = $(".pokemon-list");
      let listItem = $("<li > </li>");
      let button = $(
        '<button type = "button" class = "pokemon-button btn btn-primary list-group-item" data-toggle= "modal" data-target="#exampleModal"> </button>'
      )
        .text(pokemon.name)
        .addClass("my-button")
        .click(function () {
          pokemonRepository.showDetails(pokemon);
        });
      listItem.addClass("group-list-item");
      listItem.append(button);
      list.append(listItem);
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
          pokemon.types = details.types.map((type) => type.type.name);
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
