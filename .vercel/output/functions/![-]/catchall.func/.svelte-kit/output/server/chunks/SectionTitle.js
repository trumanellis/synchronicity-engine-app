import { c as create_ssr_component, e as escape } from "./ssr.js";
/* empty css                                           */
const css = {
  code: ".section-title.svelte-feuvxg{color:#00FFD1;font-size:0.9rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem}",
  map: '{"version":3,"file":"SectionTitle.svelte","sources":["SectionTitle.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let icon;\\nexport let title;\\n<\/script>\\n\\n<div class=\\"section-title\\">\\n\\t<span>{icon}</span>\\n\\t<span>{title}</span>\\n</div>\\n\\n<style>\\n\\t.section-title {\\n\\t\\tcolor: #00FFD1;\\n\\t\\tfont-size: 0.9rem;\\n\\t\\tfont-weight: 600;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 0.05em;\\n\\t\\tmargin-bottom: 1rem;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 0.5rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAUC,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MACN"}'
};
const SectionTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { title } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  $$result.css.add(css);
  return `<div class="section-title svelte-feuvxg"><span>${escape(icon)}</span> <span>${escape(title)}</span> </div>`;
});
export {
  SectionTitle as S
};
