import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

// PUBLIC_INTERFACE
export default component$(() => {
  useStyles$(styles);
  return (
    <div class="app-shell">
      <header class="header">
        <div class="header-inner">
          <div class="brand">
            <span class="brand-mark" aria-hidden="true" />
            <span class="brand-text">Ocean Tic Tac Toe</span>
          </div>
          <nav aria-label="primary">
            <a href="/" aria-label="Go to Home">Home</a>
          </nav>
        </div>
      </header>
      <main class="container center" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
        <Slot />
      </main>
      <footer class="footer">
        Built with Qwik • Ocean Professional theme
      </footer>
    </div>
  );
});
