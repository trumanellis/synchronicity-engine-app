import { c as create_ssr_component, e as escape } from "./ssr.js";
/* empty css                                         */
const css = {
  code: ".empty-state.svelte-nes1hk{text-align:center;padding:3rem 1.5rem}.empty-icon.svelte-nes1hk{font-size:4rem;margin-bottom:1rem;opacity:0.5}.empty-title.svelte-nes1hk{color:#F7F3E9;font-size:1.25rem;font-weight:600;margin-bottom:0.5rem}.empty-message.svelte-nes1hk{color:#84A98C;font-size:0.9rem;line-height:1.6}",
  map: '{"version":3,"file":"EmptyState.svelte","sources":["EmptyState.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let icon = \\"\\\\u{1F50D}\\";\\nexport let title = \\"Nothing found\\";\\nexport let message = \\"Try adjusting your filters or search query\\";\\nexport let actionText = void 0;\\nexport let onAction = void 0;\\n<\/script>\\n\\n<div class=\\"empty-state\\">\\n\\t<div class=\\"empty-icon\\">{icon}</div>\\n\\t<div class=\\"empty-title\\">{title}</div>\\n\\t<div class=\\"empty-message\\">{message}</div>\\n\\t{#if actionText && onAction}\\n\\t\\t<button class=\\"button-primary mt-4\\" on:click={onAction}>\\n\\t\\t\\t{actionText}\\n\\t\\t</button>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.empty-state {\\n\\t\\ttext-align: center;\\n\\t\\tpadding: 3rem 1.5rem;\\n\\t}\\n\\n\\t.empty-icon {\\n\\t\\tfont-size: 4rem;\\n\\t\\tmargin-bottom: 1rem;\\n\\t\\topacity: 0.5;\\n\\t}\\n\\n\\t.empty-title {\\n\\t\\tcolor: #F7F3E9;\\n\\t\\tfont-size: 1.25rem;\\n\\t\\tfont-weight: 600;\\n\\t\\tmargin-bottom: 0.5rem;\\n\\t}\\n\\n\\t.empty-message {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.9rem;\\n\\t\\tline-height: 1.6;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAmBC,0BAAa,CACZ,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CAAC,MACf,CAEA,yBAAY,CACX,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,GACV,CAEA,0BAAa,CACZ,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,MAChB,CAEA,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GACd"}'
};
const EmptyState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "🔍" } = $$props;
  let { title = "Nothing found" } = $$props;
  let { message = "Try adjusting your filters or search query" } = $$props;
  let { actionText = void 0 } = $$props;
  let { onAction = void 0 } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.actionText === void 0 && $$bindings.actionText && actionText !== void 0) $$bindings.actionText(actionText);
  if ($$props.onAction === void 0 && $$bindings.onAction && onAction !== void 0) $$bindings.onAction(onAction);
  $$result.css.add(css);
  return `<div class="empty-state svelte-nes1hk"><div class="empty-icon svelte-nes1hk">${escape(icon)}</div> <div class="empty-title svelte-nes1hk">${escape(title)}</div> <div class="empty-message svelte-nes1hk">${escape(message)}</div> ${actionText && onAction ? `<button class="button-primary mt-4">${escape(actionText)}</button>` : ``} </div>`;
});
export {
  EmptyState as E
};
