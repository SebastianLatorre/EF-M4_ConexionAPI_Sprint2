// Traduce ingredientes del español al inglés
const diccionarioTraduccion = {
    // Proteínas
    carne: 'beef',
    'carne de res': 'beef',
    pollo: 'chicken',
    cerdo: 'pork',
    puerco: 'pork',
    pescado: 'fish',
    salmón: 'salmon',
    atún: 'tuna',
    huevo: 'egg',
    huevos: 'egg',
    langosta: 'lobster',
    camarones: 'shrimp',
    camarón: 'shrimp',
    pavo: 'turkey',
    jamón: 'ham',
    tocino: 'bacon',
    cordero: 'lamb',
    ternera: 'veal',

    // Verduras
    tomate: 'tomato',
    ajo: 'garlic',
    cebolla: 'onion',
    papa: 'potato',
    patata: 'potato',
    zanahoria: 'carrot',
    brócoli: 'broccoli',
    coliflor: 'cauliflower',
    lechuga: 'lettuce',
    espinaca: 'spinach',
    espinacas: 'spinach',
    calabaza: 'pumpkin',
    pepino: 'cucumber',
    chile: 'chili',
    pimiento: 'bell pepper',
    morrón: 'bell pepper',
    berenjena: 'eggplant',
    champiñón: 'mushroom',
    champiñones: 'mushroom',
    seta: 'mushroom',
    setas: 'mushroom',
    maíz: 'corn',
    elote: 'corn',
    guisante: 'pea',
    guisantes: 'pea',
    judía: 'bean',
    judías: 'bean',
    frijol: 'bean',
    frijoles: 'bean',
    rábano: 'radish',
    nabo: 'turnip',
    repollo: 'cabbage',

    // Granos y carbohidratos
    arroz: 'rice',
    pasta: 'pasta',
    espagueti: 'spaghetti',
    spaghetti: 'spaghetti',
    pan: 'bread',
    trigo: 'wheat',
    harina: 'flour',
    avena: 'oats',
    cebada: 'barley',
    grano: 'grain',
    granos: 'grain',

    // Frutas
    manzana: 'apple',
    plátano: 'banana',
    uva: 'grape',
    uvas: 'grape',
    naranja: 'orange',
    limón: 'lemon',
    lima: 'lime',
    fresa: 'strawberry',
    fresas: 'strawberry',
    melocotón: 'peach',
    durazno: 'peach',
    piña: 'pineapple',
    sandía: 'watermelon',
    melón: 'melon',
    cereza: 'cherry',
    cerezas: 'cherry',
    mora: 'blueberry',
    arándano: 'blueberry',
    arándanos: 'blueberry',
    pera: 'pear',
    coco: 'coconut',
    aguacate: 'avocado',
    kiwi: 'kiwi',

    // Lácteos y queso
    leche: 'milk',
    queso: 'cheese',
    yogur: 'yogurt',
    mantequilla: 'butter',
    crema: 'cream',
    nata: 'cream',

    // Condimentos y salsas
    sal: 'salt',
    pimienta: 'pepper',
    mostaza: 'mustard',
    mayonesa: 'mayonnaise',
    ketchup: 'ketchup',
    vinagre: 'vinegar',
    aceite: 'oil',
    'aceite de oliva': 'olive oil',
    soja: 'soy',
    'salsa de soja': 'soy sauce',
    miel: 'honey',
    azúcar: 'sugar',
    canela: 'cinnamon',
    vainilla: 'vanilla',
    comino: 'cumin',
    cilantro: 'cilantro',
    perejil: 'parsley',
    orégano: 'oregano',
    albahaca: 'basil',
    romero: 'rosemary',
    tomillo: 'thyme',
    menta: 'mint',
    paprika: 'paprika',
    cúrcuma: 'turmeric',
    jengibre: 'ginger',

    // Otros
    chocolate: 'chocolate',
    café: 'coffee',
    té: 'tea',
    agua: 'water',
    mango: 'mango',
};

// Función para normalizar acentos y tildes
const normalizarTexto = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Función para traducir entrada del usuario
const traducirAlIngles = (texto) => {
    const textoLimpio = texto.toLowerCase().trim();

    // Primero intenta buscar exacto (con acentos si los tiene)
    if (diccionarioTraduccion[textoLimpio]) {
        return diccionarioTraduccion[textoLimpio];
    }

    // Si no encuentra, normaliza y busca en el diccionario normalizado
    const textoNormalizado = normalizarTexto(textoLimpio);
    for (const [clave, valor] of Object.entries(diccionarioTraduccion)) {
        if (normalizarTexto(clave) === textoNormalizado) {
            return valor;
        }
    }

    // Si no encuentra coincidencia, devuelve el texto original normalizado
    return textoNormalizado;
};

// Clase Receta para modelar los datos
class Receta {
    constructor(idMeal, strMeal, strMealThumb) {
        this.id = idMeal;
        this.nombre = strMeal;
        this.imagen = strMealThumb;
    }

    // Método para generar el HTML de la tarjeta
    render() {
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="${this.imagen}" class="card-img-top" alt="${this.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${this.nombre}</h5>
                        <!-- Categoría y Área no disponibles en este endpoint -->
                        <button class="btn btn-primary mt-auto ver-receta-btn" data-id="${this.id}">Ver Receta</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Selección de elementos del DOM
const searchForm = document.getElementById('myForm');
const searchInput = document.getElementById('searchInput');
const recetasContainer = document.getElementById('recetas-container');
const countElement = document.getElementById('count');

// HU-04: Búsqueda Funcional de Recetas
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir recarga de página

    const ingrediente = searchInput.value.trim();

    // Validación simple
    if (!ingrediente) {
        alert('Por favor, ingresa un ingrediente.');
        return;
    }

    // Traducir el ingrediente al inglés
    const ingredienteEnIngles = traducirAlIngles(ingrediente);

    await buscarRecetas(ingredienteEnIngles);
});

// Función para buscar recetas en la API
const buscarRecetas = async (ingrediente) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error en la conexión con la API');
        }

        const data = await response.json();
        mostrarRecetas(data.meals);
    } catch (error) {
        console.error('Hubo un problema con la búsqueda:', error);
        recetasContainer.innerHTML = `<div class="alert alert-danger" role="alert">Hubo un error al buscar las recetas. Intenta nuevamente más tarde.</div>`;
    }
};

// Función para cargar recetas aleatorias al inicializar la página
const cargarRecetasAleatorias = async () => {
    try {
        const recetasAleatorias = [];
        // Obtener 6 recetas aleatorias
        for (let i = 0; i < 6; i++) {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            if (!response.ok) {
                throw new Error('Error en la conexión con la API');
            }
            const data = await response.json();
            if (data.meals && data.meals[0]) {
                recetasAleatorias.push(data.meals[0]);
            }
        }
        mostrarRecetas(recetasAleatorias);
    } catch (error) {
        console.error('Error al cargar recetas aleatorias:', error);
    }
};

// HU-05: Renderizado Dinámico de Resultados
const mostrarRecetas = (meals) => {
    // Limpiar resultados anteriores
    recetasContainer.innerHTML = '';

    // HU-06: Manejo de Búsquedas sin Resultados
    if (!meals) {
        countElement.textContent = 0;
        recetasContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center" role="alert">
                    Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.
                </div>
            </div>`;
        return;
    }

    // Actualizar contador
    countElement.textContent = meals.length;

    // Generar tarjetas usando la clase Receta
    const fragment = document.createDocumentFragment();

    meals.forEach((mealData) => {
        // Desestructuración
        const { idMeal, strMeal, strMealThumb } = mealData;
        const receta = new Receta(idMeal, strMeal, strMealThumb);

        // Convertir string HTML a elemento DOM para añadirlo al fragmento (opcional, o innerHTML directo al container)
        // En este caso, para usar la clase Receta.render(), acumularemos el HTML en un string y lo asignaremos al final
        // O más limpio:
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = receta.render().trim();
        // Al ser render un row col, el primer hijo es el div col
        fragment.appendChild(tempDiv.firstElementChild);
    });

    recetasContainer.appendChild(fragment);

    // Añadir listeners a los botones "Ver Receta"
    agregarEventosVerReceta();
};

const agregarEventosVerReceta = () => {
    const botones = document.querySelectorAll('.ver-receta-btn');
    botones.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await abrirModalDetalle(id);
        });
    });
};

// Función para abrir el modal con detalles
const abrirModalDetalle = async (id) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        const receta = data.meals[0];

        if (receta) {
            document.getElementById('recetaModalLabel').textContent = receta.strMeal;
            document.getElementById('modal-imagen').src = receta.strMealThumb;
            document.getElementById('modal-instrucciones').innerHTML = receta.strInstructions ? receta.strInstructions.replace(/\r\n/g, '<br>') : 'Sin instrucciones disponibles.';

            const listaIngredientes = document.getElementById('modal-ingredientes');
            listaIngredientes.innerHTML = '';

            // TheMealDB devuelve ingredientes en propiedades separadas strIngredient1, strIngredient2...
            for (let i = 1; i <= 20; i++) {
                const ing = receta[`strIngredient${i}`];
                const measure = receta[`strMeasure${i}`];

                if (ing && ing.trim() !== '') {
                    const li = document.createElement('li');
                    li.textContent = `${ing} - ${measure}`;
                    listaIngredientes.appendChild(li);
                } else {
                    break;
                }
            }

            const modal = new bootstrap.Modal(document.getElementById('recetaModal'));
            modal.show();
        }
    } catch (e) {
        console.error('Error al cargar detalles', e);
    }
};

// Cargar recetas aleatorias al inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarRecetasAleatorias();
});
