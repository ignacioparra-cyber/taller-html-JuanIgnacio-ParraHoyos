# POKEXPLORER

POKEEXPLORER es una mini aplicación web que se encarga de consumir una API de Pokémon (PokéAPI), permitiendo a los usuarios buscar un Pokémon y ver atributos de este, tales como: tipo, altura, peso, habilidades y estadísticas como vida, ataque, defensa y velocidad.

La aplicación también permite filtrar los Pokémon según su tipo:

* Fuego
* Agua
* Planta
* Eléctrico
* Veneno

También cuenta con la opción "Todos", que muestra los primeros 20 Pokémon obtenidos desde la API.

## Arquitectura de la aplicación

La aplicación está organizada de la siguiente manera:

Taller-html
  |
  |--- public/
  |      Contiene el contenido multimedia (imágenes).
  |
  |--- index.css
  |      Contiene los estilos y la presentación visual de la aplicación.
  |
  |--- index.html
  |      Contiene la estructura de la página, como secciones, botones e inputs.
  |
  |--- index.js
         Contiene las funciones y la lógica que permiten realizar las consultas a PokéAPI.
