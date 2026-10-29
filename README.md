# Perfulandia SPA – React + pruebas unitarias (Jest + Testing Library)

## Cómo correrlo
    npm install
    npm start              # app en http://localhost:3000
    npm test               # tests en modo interactivo (watch). Tecla "a" = correr todos
    npm run test:ci        # corre todos los tests una vez y los lista (ideal para la captura)
    npm run test:coverage  # tests + porcentaje de cobertura de src/components

> Si `npm start` o `npm run build` fallan con
> `Environment key "jest/globals" is unknown`, es porque npm instaló TypeScript 7.
> Solución: `npm install -D typescript@4.9.5` (ya viene fijado en este proyecto).

## Equivalencia con el enunciado (Cinephile Vault -> Perfulandia)
| Módulo | Cinephile Vault        | Perfulandia                | Archivo de test                         |
|--------|------------------------|----------------------------|-----------------------------------------|
| 1      | MovieCard              | ProductCard                | components/ProductCard.test.jsx         |
| 2      | WatchlistButton        | AddToCartButton            | components/AddToCartButton.test.jsx     |
| 3      | ReviewForm             | ContactForm                | components/ContactForm.test.jsx         |
| 4      | TrendingMovies (fetch) | ProductosDestacados (fetch)| components/ProductosDestacados.test.jsx |

## Estructura
    public/img/            imágenes
    public/api/destacados.json   "API" simulada que consume ProductosDestacados
    src/components/        componentes + su .test.jsx al lado
    src/pages/             Home, Productos, Contacto
    src/data/ src/utils/   datos y utilidades
    src/styles/global.css  un único CSS
