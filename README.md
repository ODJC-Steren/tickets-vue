# Gu铆a de instalaci贸n Vue 3 + TS + Vite 馃拵

## Definici贸n del Stack

- [Vite] 馃敟
- [TypeScript] 馃憖
- [Vue] 馃拲
- [Tailwindcss] 馃帾
- [Naive UI] 馃拝馃徎
- [Axios] 馃幃

## Instalaci贸n 馃巿

### Vite 馃敟

Vite es un CLI que nos permite crear un nuevo proyecto en Vue y configurarlo con TypeScript.

```sh
yarn create vite
```

Aqu铆 debemos elegir la configuraci贸n para Vue + TS.

```sh
yarn install
yarn dev
```

Verificamos que nuestra aplicaci贸n est茅 corriendo en el puerto asignado con el template de Vue + Vite por defecto.

### TailwindCSS 馃拝馃徎

Para la configuraci贸n de TailwindCSS se recomienda visitar el sitio de [Tailwindcss] para poder obtener la versi贸n m谩s reciente. No obstante se comparten los siguientes comandos.

```sh
yarn add tailwindcss
npx tailwindcss init
```

Se debe configurar el archivo tailwindcss.config.js

```sh
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {},
  plugins: [],
};
```

En nuestra hoja de estilos principal debemos agregar esto al inicio.

```sh
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Para poder tener nuestra hoja de estilos personalizada con las clases utilizadas de Tailwindcss debemos utilizar la siguiente l铆nea.

```sh
npx tailwindcss -i ./src/assets/css/styles.css -o ./dist/styles.css --watch
```

Despu茅s de este proceso podemos utilizar el siguiente c贸digo de prueba para corroborar que Tailwindcss est谩 instalado.

```sh
<div class="h-screen w-full flex justify-center items-center bg-black">
    <h1>Hello world!</h1>
</div>
```

### Naive UI 馃帾

Para la instalaci贸n del material design se recomienda revisar la p谩gina de [Naive UI] sin embargo se proporcionan los siguientes comandos.

```sh
yarn add naive-ui
```

Se recomienda instalar su librer铆a de fuentes.

```sh
yarn add vfonts
```

El uso recomendado de naive es la importaci贸n por componente as铆 como lo muestra en su documentaci贸n.

```sh
<template>
  <n-button>naive-ui</n-button>
</template>

<script setup lang="ts">
  import { NButton } from 'naive-ui'
</script>
```

### Axios 馃槑

Axios ser谩 nuestro gestor de cliente HTTP para realizar peticiones a la API.

```sh
yarn add axios
```

Una vez instalado se sugiere la adici贸n del archivos api.ts dentro de la carpeta utils (m谩s adelante se mostrar谩 la estructura)

**api.ts**

```sh
import axios, { AxiosRequestConfig } from "axios";

export const api = (url: string, isAuth: boolean = true) => {
  const getHeaders = () => {
    if (isAuth) {
      const config: AxiosRequestConfig<string> = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      return config;
    }
  };
  const post = async (body: string) => {
    return await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...getHeaders()?.headers,
      },
    });
  };
  const get = async () => {
    return await axios.get(url, getHeaders());
  };
  const put = async (body: string) => {
    return await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...getHeaders()?.headers,
      },
    });
  };
  const del = async () => {
    return await axios.delete(url, getHeaders());
  };
  return {
    post,
    get,
    put,
    del,
  };
};
```

Esta implementaci贸n utiliza un token JWT dentro del **sessionStorage** sin embargo est谩 abierta a otra implementaci贸n acoplada a esta archivo.

### .env.development 馃憖

El archivo **.env** se recomienda por seguridad y escalabilidad del proyecto, a continuaci贸n un ejemplo de este mismo.

```sh
VITE_API=https://api-tickets-test.herokuapp.com/api/
VITE_EXAMPLE=7ab320bd3bff47ee0a7a301351d78653
```

Algo importante dentro de esta implementaci贸n es que todas las directivas utilizando [Vite] deben ser declaradas con el prefijo VITE\_\*

El uso de estas directivas dentro del c贸digo .ts se hacer a trav茅s de:

```sh
import.mete.env.VITE_*
```

### Composition API 馃帀

El siguiente ejemplo utiliza la Composition API de Vue 3

```sh
<script lang="ts">
export default {
  props: {
    price: Number
  },
  setup(props, context) {
    const total = `Total price (50% offer): ${props.price / 2}`;

    return { total }
  }
}
</script>
```

Y mostramos la alternativa recomendada utilizando la misma Composition API con una forma m谩s limpia y declarativa
con <script setup lang="ts">

```sh
<script lang="ts" setup>
import { Some } from "../../domain/entites/some";

type MyComponentProps = {
 some: Some
};

const myNumber = ref<number>(0);

onMounted(() => {
 console.log("hello world!");
});

defineProps<MyComponentProps>();
</script>
```

### Arquitectura del proyecto 馃槅

##### main.ts

Para la creaci贸n del la aplicaci贸n se sugiere la siguiente sintaxis de **main.ts** donde podemos ver una implementaci贸n de Vue Router que se muestra m谩s adelante y un uso no recomendado (solo para pruebas) de Naive

```sh
import naive from "naive-ui";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/style.css";
import router from "./router";

const app = createApp(App);
app.use(router); // Definici贸n de nuestras rutas con Vue Router
app.use(naive); // No recomendado, alternativa es llamar el componente cuando se requiera
app.mount("#app");
```

##### router.ts

El siguiente es un ejemplo del router ya con la adici贸n de TS.

```sh
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("...") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

Estructura de archivos sugerida (Tree)

```sh
- src/
- - assets/
- - - css/
- - - - styles.css
- - - images/
- - - json/
- - components/
- - - *.vue
- - modules/
- - - my-module/
- - - - domain/
- - - - - entites/
- - - - - interfaces/
- - - - infrestructure/
- - - - web/
- - - - - components/
- - - - - - MyModule*.vue
- - - - - hooks/
- - - - - *Page.vue
- - utils/
- - - api.ts
- - - *.ts
```

Para m谩s informaci贸n con respecto al desarrollo basado en esta arquitectura de carpetas mirar el c贸digo que se presenta como ejemplo.

## License 馃榿

MIT

**Oscar Ju谩rez**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[vite]: https://vitejs.dev
[typescript]: https://www.typescriptlang.org
[vue]: https://vuejs.org/
[tailwindcss]: https://tailwindcss.com/
[naive ui]: https://www.naiveui.com/en-US/light
[axios]: https://axios-http.com/docs/intro
