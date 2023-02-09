const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    showModal: function (pokemon) {
      let modalBody = document.querySelector(".modal-body");
      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerHTML = "";
      modalBody.innerHTML = "";

      let nameElement = document.createElement("h5");
      nameElement.innerHTML = pokemon.name;

      let imageElement = document.createElement("img");
      imageElement.classList.add("modal-img");
      imageElement.src = pokemon.imageUrl;

      let heightElement = document.createElement("p");
      heightElement.innerHTML = "height: " + pokemon.height;

      let typesElement = document.createElement("p");
      typesElement.innerHTML = "types: " + pokemon.types;

      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(typesElement);
    },
    showDetails: function (pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        let modal = document.querySelector(".modal");
        let name = document.querySelector(".modal-name");
        let height = document.querySelector(".modal-height");
        let image = document.querySelector(".modal-image");
        let closeButton = document.querySelector(".modal-close");
        let modalContainer = document.querySelector(".modal-container");
        modalContainer.style.display = "block";

        closeButton.addEventListener("click", function () {
          modalContainer.style.display = "none";
        });
        name.innerText = pokemon.name;
        height.innerText = pokemon.height;
        image.src = pokemon.imageUrl;
      });
    },
    addListItem: function (pokemon) {
      let list = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("my-button");
      button.addEventListener("click", function () {
        pokemonRepository.showModal(pokemon);
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
