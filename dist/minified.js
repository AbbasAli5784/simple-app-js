const pokemonRepository = (function () {
  let t = [];
  return {
    add: function (o) {
      t.push(o);
    },
    showModal: function (t) {
      let o = $(".modal-body"),
        e = $(".modal-title");
      o.empty(), e.empty();
      let n = $("<h5>Pokemon: " + t.name + "</h5>"),
        i = $("<p>Height:" + t.height + "</p>"),
        a = $("<p>Type:" + t.types + "</p>"),
        p = $('<img class = "modal-img" style = "width:40%">').attr(
          "src",
          t.imageUrl
        );
      e.append(n), o.append(i), o.append(a), o.append(p);
    },
    showDetails: function (t) {
      pokemonRepository.loadDetails(t).then(function () {
        pokemonRepository.showModal(t);
      });
    },
    addListItem: function (t) {
      let o = $(".pokemon-list"),
        e = $("<li > </li>"),
        n = $(
          '<button type = "button" class = "pokemon-button btn btn-primary list-group-item" data-toggle= "modal" data-target="#exampleModal"> </button>'
        )
          .text(t.name)
          .addClass("my-button")
          .click(function () {
            pokemonRepository.showDetails(t);
          });
      e.addClass("group-list-item"), e.append(n), o.append(e);
    },
    getAll: function () {
      t.forEach(function (t) {
        pokemonRepository.addListItem(t);
      });
    },
    loadList: function () {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            let o = { name: t.name, detailsUrl: t.url };
            pokemonRepository.add(o);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: function (t) {
      return fetch(t.detailsUrl)
        .then(function (t) {
          return t.json();
        })
        .then(function (o) {
          (t.imageUrl = o.sprites.front_default),
            (t.height = o.height),
            (t.types = o.types.map((t) => t.type.name));
        })
        .catch(function (t) {
          console.error(t);
        });
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll();
});
