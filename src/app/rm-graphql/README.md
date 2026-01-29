Para la consulta compleja utilicé una query GraphQL que obtiene el detalle de un episodio
a partir de su ID. En esta query solicité únicamente los campos necesarios del episodio
(nombre, código y fecha de emisión) y aproveché la relación entre episodios y personajes
para obtener el listado de personajes asociados. De cada personaje solicité su nombre,
estado, especie e imagen, permitiendo mostrar la información completa en el modal sin
 realizar múltiples peticiones adicionales.