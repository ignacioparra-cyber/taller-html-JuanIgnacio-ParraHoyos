
function Buscarpokemon() {

    let pokemon = document.getElementById("NombrePokemon").value.trim();
    const resultado = document.getElementById("demo");

    // Validar que el campo no esté vacío
    if (pokemon === "") {
        resultado.innerHTML = `
            <p>Por favor ingresa el nombre del Pokémon.</p>
        `;
        return;
    }

    resultado.innerHTML = `<p>Buscando Pokémon...</p>`;

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    fetch(url)
        .then((response) => {

            if (!response.ok) {
                throw new Error(
                    "El Pokémon " + pokemon + " no fue encontrado."
                );
            }

            return response.json();
        })

        .then((data) => {

            let tipos = data.types
                .map((tipo) => tipo.type.name)
                .join(", ");

            let habilidades = data.abilities
                .map((habilidad) => habilidad.ability.name)
                .join(", ");

            let hp = data.stats[0].base_stat;
            let ataque = data.stats[1].base_stat;
            let defensa = data.stats[2].base_stat;
            let velocidad = data.stats[5].base_stat;

            resultado.innerHTML = `

                <div class="pokemon-detalle">

                    <div>
                        <img src="${data.sprites.front_default}" 
                             alt="${data.name}">
                    </div>

                    <div>

                        

                        <h2>${data.name}</h2>

                        <p>
                            <strong>Tipo:</strong> ${tipos}
                        </p>

                        <p>
                            <strong>Altura:</strong> ${data.height / 10} m
                        </p>

                        <p>
                            <strong>Peso:</strong> ${data.weight / 10} kg
                        </p>

                        <p>
                            <strong>Habilidades:</strong> ${habilidades}
                        </p>

                        <h3>Estadísticas</h3>

                        <p>HP: ${hp}</p>
                        <p>Ataque: ${ataque}</p>
                        <p>Defensa: ${defensa}</p>
                        <p>Velocidad: ${velocidad}</p>

                    </div>

                </div>
            `;
        })

        .catch((error) => {

            resultado.innerHTML = `
                <p>${error.message}</p>
            `;

        });
}


// Listo los primeros 20 Pokémon
function ListarPokemones() {

    let url = "https://pokeapi.co/api/v2/pokemon?limit=20";
    const container = document.getElementById("PokemonGrid");

    container.innerHTML = `<p>Cargando Pokémon...</p>`;

    fetch(url)
        .then((response) => {

            if (!response.ok) {
                throw new Error(
                    "Los Pokémon no fueron encontrados."
                );
            }

            return response.json();
        })

        .then((data) => {

            const pokemones = data.results;

            container.innerHTML = "";

            pokemones.forEach((pokemon) => {

                fetch(pokemon.url)
                    .then((response) => {
                        return response.json();
                    })

                    .then((pokemdata) => {
                        CrearTarjetaPokemon(pokemdata);
                    })

                    .catch((error) => {
                        console.log(
                            "Error cargando Pokémon:",
                            error
                        );
                    });

            });
        })

        .catch((error) => {

            container.innerHTML = `
                <p>${error.message}</p>
            `;

        });
}


// Filtrar Pokémon por tipo
function FiltrarPokemon(tipo) {

    const container = document.getElementById("PokemonGrid");

    // Si selecciona todos, volvemos a mostrar los primeros 20
    if (tipo === "all") {
        ListarPokemones();
        return;
    }

    container.innerHTML = `
        <p>Cargando Pokémon de tipo ${tipo}...</p>
    `;

    let url = `https://pokeapi.co/api/v2/type/${tipo}`;

    fetch(url)
        .then((response) => {

            if (!response.ok) {
                throw new Error(
                    "No se encontraron Pokémon de este tipo."
                );
            }

            return response.json();
        })

        .then((data) => {

            container.innerHTML = "";

            // Mostrar solamente 20
            let pokemones = data.pokemon.slice(0, 20);

            pokemones.forEach((item) => {

                fetch(item.pokemon.url)
                    .then((response) => {
                        return response.json();
                    })

                    .then((pokemdata) => {
                        CrearTarjetaPokemon(pokemdata);
                    })

                    .catch((error) => {
                        console.log(
                            "Error cargando Pokémon:",
                            error
                        );
                    });

            });
        })

        .catch((error) => {

            container.innerHTML = `
                <p>${error.message}</p>
            `;

        });
}


// Crear las tarjetas
function CrearTarjetaPokemon(pokemon) {

    const container = document.getElementById("PokemonGrid");
    const card = document.createElement("div");

    card.className = "card";

    let tipos = pokemon.types
        .map((tipo) => tipo.type.name)
        .join(", ");

    card.innerHTML = `


        <img src="${pokemon.sprites.front_default}" 
             alt="${pokemon.name}">

        <h3>${pokemon.name}</h3>

        <p>
            <strong>Tipo:</strong> ${tipos}
        </p>

        <p>
            <strong>Altura:</strong> ${pokemon.height / 10} m
        </p>

        <p>
            <strong>Peso:</strong> ${pokemon.weight / 10} kg
        </p>
    `;

    container.appendChild(card);
}