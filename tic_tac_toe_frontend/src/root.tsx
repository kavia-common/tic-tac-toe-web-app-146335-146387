import { component$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

/**
 * PUBLIC_INTERFACE
 * Root application component for the Ocean Tic Tac Toe app.
 * Provides QwikCityProvider, head and body, and registers the service worker in production.
 */
export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light only" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
        {!isDev && <ServiceWorkerRegister />}
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
