import { c as create_ssr_component } from "../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex items-center justify-center min-h-screen" data-svelte-h="svelte-ewhas6"><div class="text-center animate-fade-in"><h1 class="text-6xl mb-4">⚡</h1> <h2 class="text-3xl text-gold font-bold mb-2" style="text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);">Synchronicity Engine</h2> <p class="text-sage text-lg">Loading...</p></div></div>`;
});
export {
  Page as default
};
