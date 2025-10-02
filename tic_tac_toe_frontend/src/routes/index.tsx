import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { TicTacToe } from "~/components/tic-tac-toe/tic-tac-toe";

// PUBLIC_INTERFACE
export default component$(() => {
  return (
    <section aria-labelledby="app-title" style={{ width: "100%" }}>
      <h1 id="app-title" style={{ position: "absolute", left: "-9999px" }}>
        Ocean Tic Tac Toe
      </h1>
      <TicTacToe />
    </section>
  );
});

export const head: DocumentHead = {
  title: "Ocean Tic Tac Toe",
  meta: [
    {
      name: "description",
      content:
        "Play a clean, modern Tic Tac Toe in your browser. Ocean Professional theme with blue and amber accents.",
    },
    { name: "theme-color", content: "#2563EB" },
  ],
  links: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
  ],
};
