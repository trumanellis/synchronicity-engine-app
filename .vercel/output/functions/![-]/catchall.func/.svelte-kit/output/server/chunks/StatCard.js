import { c as create_ssr_component, e as escape } from "./ssr.js";
const css = {
  code: ".stat-icon.svelte-10gdsww{font-size:1.5rem;margin-bottom:0.5rem}.stat-value.svelte-10gdsww{color:#D4AF37;font-size:1.5rem;font-weight:700;margin-bottom:0.25rem;text-shadow:0 0 10px rgba(212, 175, 55, 0.6)}.stat-label.svelte-10gdsww{color:#84A98C;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em}",
  map: '{"version":3,"file":"StatCard.svelte","sources":["StatCard.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let icon;\\nexport let value;\\nexport let label;\\nexport let onClick = void 0;\\n<\/script>\\n\\n<div class=\\"stat-card\\" role=\\"button\\" tabindex=\\"0\\" on:click={onClick} on:keypress={onClick}>\\n\\t<div class=\\"stat-icon\\">{icon}</div>\\n\\t<div class=\\"stat-value\\">{value}</div>\\n\\t<div class=\\"stat-label\\">{label}</div>\\n</div>\\n\\n<style>\\n\\t.stat-icon {\\n\\t\\tfont-size: 1.5rem;\\n\\t\\tmargin-bottom: 0.5rem;\\n\\t}\\n\\n\\t.stat-value {\\n\\t\\tcolor: #D4AF37;\\n\\t\\tfont-size: 1.5rem;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin-bottom: 0.25rem;\\n\\t\\ttext-shadow: 0 0 10px rgba(212, 175, 55, 0.6);\\n\\t}\\n\\n\\t.stat-label {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.75rem;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 0.05em;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAaC,yBAAW,CACV,SAAS,CAAE,MAAM,CACjB,aAAa,CAAE,MAChB,CAEA,0BAAY,CACX,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,OAAO,CACtB,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC7C,CAEA,0BAAY,CACX,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,OAAO,CAClB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,MACjB"}'
};
const StatCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { value } = $$props;
  let { label } = $$props;
  let { onClick = void 0 } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  $$result.css.add(css);
  return `<div class="stat-card" role="button" tabindex="0"><div class="stat-icon svelte-10gdsww">${escape(icon)}</div> <div class="stat-value svelte-10gdsww">${escape(value)}</div> <div class="stat-label svelte-10gdsww">${escape(label)}</div> </div>`;
});
export {
  StatCard as S
};
