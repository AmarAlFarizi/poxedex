let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Navbar Component
function Navbar() {
  return React.createElement(
    "nav",
    { className: "flex justify-between items-center p-4 bg-base-100 shadow-md rounded-full backdrop-blur-md bg-white/30 drop-shadow-lg sticky top-0 z-10" },
    React.createElement(
      "h1",
      { className: "text-2xl font-bold text-primary ml-4" },
      "Pokédex"
    ),
    React.createElement(
      "div",
      { className: "flex space-x-4 mr-4" },
      React.createElement(
        "a",
        { href: "#home", className: "text-primary hover:text-secondary" },
        "Home"
      ),
      React.createElement(
        "a",
        { href: "#card-section", className: "text-primary hover:text-secondary" },
        "About"
      ),
      React.createElement(
        "a",
        { href: "#card-section", className: "text-primary hover:text-secondary" },
        "List"
      )
    )
  );
}

//Hero Component
function Hero() {
  return React.createElement(
    "section",
    {
      className: "flex flex-col md:flex-row items-center justify-between m-8 p-8 bg-base-200",
    },
    // Left column
    React.createElement(
      "div",
      { className: "md:w-1/2 text-center md:text-left" },
      React.createElement(
        "h1",
        { className: "text-4xl font-bold mb-4 text-primary" },
        "Welcome to the Pokédex"
      ),
      React.createElement(
        "p",
        { className: "mb-4 text-lg text-secondary" },
        "Explore the world of Pokémon and learn about their types, abilities, evolutions, and more."
      ),
      React.createElement(
        "button",
        {
          className: "btn btn-primary text-stone-50",
          onClick: () => {
            const cardSection = document.getElementById("card-section");
            if (cardSection) {
              cardSection.scrollIntoView({ behavior: "smooth" });
            }
          },
        },
        "Explore All"
      )
    ),
    // Right column
    React.createElement(
      "div",
      { className: "md:w-1/2 mt-8 md:mt-0 flex justify-center" },
      React.createElement("img", {
        src: "./asset/bg-pokemon.png", 
        alt: "Pokemon",
        className: "w-full h-auto max-w-md",
      })
    )
  );
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { id:"card-section",
      className: "card w-64 shadow-xl m-4 bg-base-100 " },
    React.createElement("img", { src: props.image, alt: props.name }),
    React.createElement("p", { className: "text-xs badge badge badge-outline text-stone-50 ml-4 mb-4 rounded-full" }, null, `${props.id}`),
    React.createElement("p", { className: "text-2xl font-semibold text-stone-50 ml-4" }, props.name),
    React.createElement("div", {className:"flex flex-wrap justify-center mt-4 p-4 space-x-2"},
    React.createElement("p",{className:"btn btn-outline btn-secondary btn-sm rounded-full text-xs "}, null, ` ${props.types}`),
    React.createElement("p",{className:"btn btn-outline btn-sm rounded-full text-xs",}, null, ` Read More `),
    ),
    
    
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        height:pokemon.height,
        weight:pokemon.weight,
        cries:pokemon.cries,
        evolutionChains: pokemon.evolutionChains,
        abilities:pokemon.abilities,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap navbar , header and list
function App() {
  return React.createElement(
    "div",
    null,
    React.createElement(Navbar, null),
    React.createElement(Hero, null),
    React.createElement(
      "header",
      { className: "text-center mt-4 p-8" },
      React.createElement(
        "h1",
        { className: "text-3xl font-bold" },
        "Pokédex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
