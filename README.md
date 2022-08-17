# Guía de instalación Vue 3 + TS + Vite 💎

## Definición del Stack

- [Vite] 🔥
- [TypeScript] 👀
- [Vue] 💍
- [Tailwindcss] 🎪
- [Naive UI] 💅🏻
- [Axios] 🎮

## Instalación 🎈

### Vite 🔥

Vite es un CLI que nos permite crear un nuevo proyecto en Vue y configurarlo con TypeScript.

```sh
yarn create vite
```

Aquí debemos elegir la configuración para Vue + TS.

```sh
yarn install
yarn dev
```

Verificamos que nuestra aplicación esté corriendo en el puerto asignado con el template de Vue + Vite por defecto.

### TailwindCSS 💅🏻

Para la configuración de TailwindCSS se recomienda visitar el sitio de [Tailwindcss] para poder obtener la versión más reciente. No obstante se comparten los siguientes comandos.

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

Para poder tener nuestra hoja de estilos personalizada con las clases utilizadas de Tailwindcss debemos utilizar la siguiente línea.

```sh
npx tailwindcss -i ./src/assets/css/styles.css -o ./dist/styles.css --watch
```

Después de este proceso podemos utilizar el siguiente código de prueba para corroborar que Tailwindcss está instalado.

```sh
<div class="h-screen w-full flex justify-center items-center bg-black">
    <h1>Hello world!</h1>
</div>
```

### Naive UI 🎪

Para la instalación del material design se recomienda revisar la página de [Naive UI] sin embargo se proporcionan los siguientes comandos.

```sh
yarn add naive-ui
```

Se recomienda instalar su librería de fuentes.

```sh
yarn add vfonts
```

El uso recomendado de naive es la importación por componente así como lo muestra en su documentación.

```sh
<template>
  <n-button>naive-ui</n-button>
</template>

<script setup lang="ts">
  import { NButton } from 'naive-ui'
</script>
```

### Axios 😎

Axios será nuestro gestor de cliente HTTP para realizar peticiones a la API.

```sh
yarn add axios
```

Una vez instalado se sugiere la adición del archivos api.ts dentro de la carpeta utils (más adelante se mostrará la estructura)

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

Esta implementación utiliza un token JWT dentro del **sessionStorage** sin embargo está abierta a otra implementación acoplada a esta archivo.

### .env.development 👀

El archivo **.env** se recomienda por seguridad y escalabilidad del proyecto, a continuación un ejemplo de este mismo.

```sh
VITE_API=https://api-tickets-test.herokuapp.com/api/
VITE_EXAMPLE=7ab320bd3bff47ee0a7a301351d78653
```

Algo importante dentro de esta implementación es que todas las directivas utilizando [Vite] deben ser declaradas con el prefijo VITE\_\*

El uso de estas directivas dentro del código .ts se hacer a través de:

```sh
import.mete.env.VITE_*
```

### Composition API 🎉

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

Y mostramos la alternativa recomendada utilizando la misma Composition API con una forma más limpia y declarativa
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

### Arquitectura del proyecto 😆

##### main.ts

Para la creación del la aplicación se sugiere la siguiente sintaxis de **main.ts** donde podemos ver una implementación de Vue Router que se muestra más adelante y un uso no recomendado (solo para pruebas) de Naive

```sh
import naive from "naive-ui";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/style.css";
import router from "./router";

const app = createApp(App);
app.use(router); // Definición de nuestras rutas con Vue Router
app.use(naive); // No recomendado, alternativa es llamar el componente cuando se requiera
app.mount("#app");
```

##### router.ts

El siguiente es un ejemplo del router ya con la adición de TS.

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

Para más información con respecto al desarrollo basado en esta arquitectura de carpetas mirar el código que se presenta como ejemplo.

## License 😁

MIT

**Oscar Juárez**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[vite]: https://vitejs.dev
[typescript]: https://www.typescriptlang.org
[vue]: https://vuejs.org/
[tailwindcss]: https://tailwindcss.com/
[naive ui]: https://www.naiveui.com/en-US/light
[axios]: https://axios-http.com/docs/intro
