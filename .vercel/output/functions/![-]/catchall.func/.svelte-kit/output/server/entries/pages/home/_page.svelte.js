import { c as create_ssr_component, e as escape, a as subscribe, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { g as goto } from "../../../chunks/client.js";
import { f as formatTimeAgo, t as temple, d as distribution, c as calculateEstimatedShare, u as userStats, a as formatCurrency, i as intentions, r as recentActivity, B as BottomNav } from "../../../chunks/BottomNav.js";
import { d as derived, w as writable } from "../../../chunks/index.js";
import { S as StatCard } from "../../../chunks/StatCard.js";
import { A as ActionButton } from "../../../chunks/ActionButton.js";
import { S as SectionTitle } from "../../../chunks/SectionTitle.js";
/* empty css                                                         */
import { I as IntentionCard } from "../../../chunks/IntentionCard.js";
const css$3 = {
  code: ".activity-header.svelte-r310j0{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem}.activity-icon.svelte-r310j0{color:#00FFD1;font-size:1rem}.activity-user.svelte-r310j0{color:#F7F3E9;font-weight:500;font-size:0.85rem}.activity-time.svelte-r310j0{color:#84A98C;font-size:0.7rem;margin-left:auto}.activity-text.svelte-r310j0{color:#F7F3E9;font-size:0.8rem;line-height:1.5}.activity-meta.svelte-r310j0{color:#84A98C;font-size:0.7rem;margin-top:0.5rem}",
  map: `{"version":3,"file":"ActivityItem.svelte","sources":["ActivityItem.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { formatTimeAgo } from \\"$data/mockData\\";\\nexport let activity;\\nexport let onClick = void 0;\\n$: timeAgo = formatTimeAgo(activity.timestamp);\\n<\/script>\\n\\n<div class=\\"activity-item\\" role=\\"button\\" tabindex=\\"0\\" on:click={onClick} on:keypress={onClick}>\\n\\t<div class=\\"activity-header\\">\\n\\t\\t<span class=\\"activity-icon\\">{activity.icon}</span>\\n\\t\\t<span class=\\"activity-user\\">{activity.userName || 'Community'}</span>\\n\\t\\t<span class=\\"activity-time\\">{timeAgo}</span>\\n\\t</div>\\n\\t<div class=\\"activity-text\\">{activity.text}</div>\\n\\t{#if activity.meta}\\n\\t\\t<div class=\\"activity-meta\\">{activity.meta}</div>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.activity-header {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 0.5rem;\\n\\t\\tmargin-bottom: 0.5rem;\\n\\t}\\n\\n\\t.activity-icon {\\n\\t\\tcolor: #00FFD1;\\n\\t\\tfont-size: 1rem;\\n\\t}\\n\\n\\t.activity-user {\\n\\t\\tcolor: #F7F3E9;\\n\\t\\tfont-weight: 500;\\n\\t\\tfont-size: 0.85rem;\\n\\t}\\n\\n\\t.activity-time {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.7rem;\\n\\t\\tmargin-left: auto;\\n\\t}\\n\\n\\t.activity-text {\\n\\t\\tcolor: #F7F3E9;\\n\\t\\tfont-size: 0.8rem;\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.activity-meta {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.7rem;\\n\\t\\tmargin-top: 0.5rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAmBC,8BAAiB,CAChB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MAAM,CACX,aAAa,CAAE,MAChB,CAEA,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IACZ,CAEA,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,OACZ,CAEA,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IACd,CAEA,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GACd,CAEA,4BAAe,CACd,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,MACb"}`
};
const ActivityItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let timeAgo;
  let { activity } = $$props;
  let { onClick = void 0 } = $$props;
  if ($$props.activity === void 0 && $$bindings.activity && activity !== void 0) $$bindings.activity(activity);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  $$result.css.add(css$3);
  timeAgo = formatTimeAgo(activity.timestamp);
  return `<div class="activity-item" role="button" tabindex="0"><div class="activity-header svelte-r310j0"><span class="activity-icon svelte-r310j0">${escape(activity.icon)}</span> <span class="activity-user svelte-r310j0">${escape(activity.userName || "Community")}</span> <span class="activity-time svelte-r310j0">${escape(timeAgo)}</span></div> <div class="activity-text svelte-r310j0">${escape(activity.text)}</div> ${activity.meta ? `<div class="activity-meta svelte-r310j0">${escape(activity.meta)}</div>` : ``} </div>`;
});
const currentTemple = writable(temple);
derived(currentTemple, ($temple) => $temple.stats);
derived(
  currentTemple,
  ($temple) => $temple.stats.daysUntilDistribution
);
derived(currentTemple, ($temple) => $temple.stats.monthlyPoolCurrent);
const css$2 = {
  code: ".temple-header.svelte-xw425m{background:rgba(212, 175, 55, 0.1);border:2px solid rgba(212, 175, 55, 0.5);border-radius:1rem;padding:1rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:1rem}.temple-icon.svelte-xw425m{width:50px;height:50px;background:rgba(212, 175, 55, 0.2);border:2px solid #D4AF37;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0}.temple-info.svelte-xw425m{flex:1}.temple-name.svelte-xw425m{color:#D4AF37;font-weight:600;font-size:1.1rem;margin-bottom:0.25rem}.temple-meta.svelte-xw425m{color:#84A98C;font-size:0.8rem}",
  map: '{"version":3,"file":"TempleHeader.svelte","sources":["TempleHeader.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { currentTemple } from \\"$stores/templeStore\\";\\n<\/script>\\n\\n<div class=\\"temple-header\\">\\n\\t<div class=\\"temple-icon\\">{$currentTemple.icon}</div>\\n\\t<div class=\\"temple-info\\">\\n\\t\\t<div class=\\"temple-name\\">{$currentTemple.name}</div>\\n\\t\\t<div class=\\"temple-meta\\">\\n\\t\\t\\t{$currentTemple.location.name}, {$currentTemple.location.region} • {$currentTemple.memberCount}\\n\\t\\t\\tmembers\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.temple-header {\\n\\t\\tbackground: rgba(212, 175, 55, 0.1);\\n\\t\\tborder: 2px solid rgba(212, 175, 55, 0.5);\\n\\t\\tborder-radius: 1rem;\\n\\t\\tpadding: 1rem;\\n\\t\\tmargin-bottom: 1.5rem;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 1rem;\\n\\t}\\n\\n\\t.temple-icon {\\n\\t\\twidth: 50px;\\n\\t\\theight: 50px;\\n\\t\\tbackground: rgba(212, 175, 55, 0.2);\\n\\t\\tborder: 2px solid #D4AF37;\\n\\t\\tborder-radius: 50%;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tfont-size: 1.5rem;\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\n\\t.temple-info {\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\t.temple-name {\\n\\t\\tcolor: #D4AF37;\\n\\t\\tfont-weight: 600;\\n\\t\\tfont-size: 1.1rem;\\n\\t\\tmargin-bottom: 0.25rem;\\n\\t}\\n\\n\\t.temple-meta {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.8rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAeC,4BAAe,CACd,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACnC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACzC,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,MAAM,CACrB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACN,CAEA,0BAAa,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACnC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,CACd,CAEA,0BAAa,CACZ,IAAI,CAAE,CACP,CAEA,0BAAa,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,MAAM,CACjB,aAAa,CAAE,OAChB,CAEA,0BAAa,CACZ,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MACZ"}'
};
const TempleHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentTemple, $$unsubscribe_currentTemple;
  $$unsubscribe_currentTemple = subscribe(currentTemple, (value) => $currentTemple = value);
  $$result.css.add(css$2);
  $$unsubscribe_currentTemple();
  return `<div class="temple-header svelte-xw425m"><div class="temple-icon svelte-xw425m">${escape($currentTemple.icon)}</div> <div class="temple-info svelte-xw425m"><div class="temple-name svelte-xw425m">${escape($currentTemple.name)}</div> <div class="temple-meta svelte-xw425m">${escape($currentTemple.location.name)}, ${escape($currentTemple.location.region)} • ${escape($currentTemple.memberCount)}
			members</div></div> </div>`;
});
const currentDistribution = writable(distribution);
const selectedTokenIds = writable([]);
derived(
  currentDistribution,
  ($dist) => $dist.biddingPeriod.daysRemaining
);
derived(currentDistribution, ($dist) => $dist.pool.totalUSD);
derived(
  [currentDistribution, selectedTokenIds],
  ([$dist, $selectedIds]) => {
    const totalHours = $dist.userBid.totalHours;
    return calculateEstimatedShare(totalHours);
  }
);
const css$1 = {
  code: ".countdown-card.svelte-6x58d4{background:rgba(0, 255, 209, 0.05);border:2px solid #00FFD1;border-radius:1rem;padding:1.25rem;margin-bottom:1.5rem;box-shadow:0 0 40px rgba(0, 255, 209, 0.3)}.countdown-header.svelte-6x58d4{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem}.countdown-title.svelte-6x58d4{color:#00FFD1;font-weight:600;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;display:flex;align-items:center;gap:0.5rem}.countdown-pulse.svelte-6x58d4{width:8px;height:8px;background:#00FFD1;border-radius:50%;animation:svelte-6x58d4-pulse 2s infinite}@keyframes svelte-6x58d4-pulse{0%,100%{opacity:1;box-shadow:0 0 10px rgba(0, 255, 209, 0.8)}50%{opacity:0.5;box-shadow:0 0 5px rgba(0, 255, 209, 0.4)}}.countdown-time.svelte-6x58d4{text-align:center;margin-bottom:1rem}.countdown-number.svelte-6x58d4{color:#D4AF37;font-size:2.5rem;font-weight:700;text-shadow:0 0 20px rgba(212, 175, 55, 0.6)}.countdown-label.svelte-6x58d4{color:#84A98C;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em}.countdown-info.svelte-6x58d4{display:flex;justify-content:space-between;align-items:center;padding:0.75rem;background:rgba(0, 0, 0, 0.3);border-radius:0.75rem}.countdown-info-item.svelte-6x58d4{text-align:center;flex:1}.countdown-info-label.svelte-6x58d4{color:#84A98C;font-size:0.7rem;margin-bottom:0.25rem}.countdown-info-value.svelte-6x58d4{color:#D4AF37;font-weight:600;font-size:0.95rem}",
  map: '{"version":3,"file":"CountdownCard.svelte","sources":["CountdownCard.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { currentDistribution } from \\"$stores/distributionStore\\";\\nimport { formatCurrency } from \\"$data/mockData\\";\\nimport { userStats } from \\"$stores/userStore\\";\\n$: poolAmount = formatCurrency($currentDistribution.pool.totalUSD);\\n$: userHours = $userStats.totalHoursEarned;\\n$: estimatedShare = formatCurrency(\\n  userHours * $currentDistribution.stats.estimatedShareMultiplier\\n);\\n<\/script>\\n\\n<div class=\\"countdown-card\\">\\n\\t<div class=\\"countdown-header\\">\\n\\t\\t<div class=\\"countdown-title\\">\\n\\t\\t\\t<span>🌑</span>\\n\\t\\t\\t<span>Next Distribution</span>\\n\\t\\t\\t<div class=\\"countdown-pulse\\" />\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<div class=\\"countdown-time\\">\\n\\t\\t<div class=\\"countdown-number\\">{$currentDistribution.biddingPeriod.daysRemaining}</div>\\n\\t\\t<div class=\\"countdown-label\\">Days Until New Moon</div>\\n\\t</div>\\n\\n\\t<div class=\\"countdown-info\\">\\n\\t\\t<div class=\\"countdown-info-item\\">\\n\\t\\t\\t<div class=\\"countdown-info-label\\">Pool</div>\\n\\t\\t\\t<div class=\\"countdown-info-value\\">{poolAmount}</div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"countdown-info-item\\">\\n\\t\\t\\t<div class=\\"countdown-info-label\\">Your Tokens</div>\\n\\t\\t\\t<div class=\\"countdown-info-value\\">{userHours}h</div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"countdown-info-item\\">\\n\\t\\t\\t<div class=\\"countdown-info-label\\">Est. Share</div>\\n\\t\\t\\t<div class=\\"countdown-info-value\\">{estimatedShare}</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.countdown-card {\\n\\t\\tbackground: rgba(0, 255, 209, 0.05);\\n\\t\\tborder: 2px solid #00FFD1;\\n\\t\\tborder-radius: 1rem;\\n\\t\\tpadding: 1.25rem;\\n\\t\\tmargin-bottom: 1.5rem;\\n\\t\\tbox-shadow: 0 0 40px rgba(0, 255, 209, 0.3);\\n\\t}\\n\\n\\t.countdown-header {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\tmargin-bottom: 1rem;\\n\\t}\\n\\n\\t.countdown-title {\\n\\t\\tcolor: #00FFD1;\\n\\t\\tfont-weight: 600;\\n\\t\\tfont-size: 0.9rem;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 0.05em;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 0.5rem;\\n\\t}\\n\\n\\t.countdown-pulse {\\n\\t\\twidth: 8px;\\n\\t\\theight: 8px;\\n\\t\\tbackground: #00FFD1;\\n\\t\\tborder-radius: 50%;\\n\\t\\tanimation: pulse 2s infinite;\\n\\t}\\n\\n\\t@keyframes pulse {\\n\\t\\t0%,\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t\\tbox-shadow: 0 0 10px rgba(0, 255, 209, 0.8);\\n\\t\\t}\\n\\t\\t50% {\\n\\t\\t\\topacity: 0.5;\\n\\t\\t\\tbox-shadow: 0 0 5px rgba(0, 255, 209, 0.4);\\n\\t\\t}\\n\\t}\\n\\n\\t.countdown-time {\\n\\t\\ttext-align: center;\\n\\t\\tmargin-bottom: 1rem;\\n\\t}\\n\\n\\t.countdown-number {\\n\\t\\tcolor: #D4AF37;\\n\\t\\tfont-size: 2.5rem;\\n\\t\\tfont-weight: 700;\\n\\t\\ttext-shadow: 0 0 20px rgba(212, 175, 55, 0.6);\\n\\t}\\n\\n\\t.countdown-label {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.85rem;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 0.05em;\\n\\t}\\n\\n\\t.countdown-info {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0.75rem;\\n\\t\\tbackground: rgba(0, 0, 0, 0.3);\\n\\t\\tborder-radius: 0.75rem;\\n\\t}\\n\\n\\t.countdown-info-item {\\n\\t\\ttext-align: center;\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\t.countdown-info-label {\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-size: 0.7rem;\\n\\t\\tmargin-bottom: 0.25rem;\\n\\t}\\n\\n\\t.countdown-info-value {\\n\\t\\tcolor: #D4AF37;\\n\\t\\tfont-weight: 600;\\n\\t\\tfont-size: 0.95rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyCC,6BAAgB,CACf,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACnC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,OAAO,CAChB,aAAa,CAAE,MAAM,CACrB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAEA,+BAAkB,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,aAAa,CAAE,IAChB,CAEA,8BAAiB,CAChB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,MAAM,CACjB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MACN,CAEA,8BAAiB,CAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,mBAAK,CAAC,EAAE,CAAC,QACrB,CAEA,WAAW,mBAAM,CAChB,EAAE,CACF,IAAK,CACJ,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CACA,GAAI,CACH,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC1C,CACD,CAEA,6BAAgB,CACf,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAChB,CAEA,+BAAkB,CACjB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC7C,CAEA,8BAAiB,CAChB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,OAAO,CAClB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,MACjB,CAEA,6BAAgB,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,OAAO,CAChB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,aAAa,CAAE,OAChB,CAEA,kCAAqB,CACpB,UAAU,CAAE,MAAM,CAClB,IAAI,CAAE,CACP,CAEA,mCAAsB,CACrB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,aAAa,CAAE,OAChB,CAEA,mCAAsB,CACrB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,OACZ"}'
};
const CountdownCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let poolAmount;
  let userHours;
  let estimatedShare;
  let $currentDistribution, $$unsubscribe_currentDistribution;
  let $userStats, $$unsubscribe_userStats;
  $$unsubscribe_currentDistribution = subscribe(currentDistribution, (value) => $currentDistribution = value);
  $$unsubscribe_userStats = subscribe(userStats, (value) => $userStats = value);
  $$result.css.add(css$1);
  poolAmount = formatCurrency($currentDistribution.pool.totalUSD);
  userHours = $userStats.totalHoursEarned;
  estimatedShare = formatCurrency(userHours * $currentDistribution.stats.estimatedShareMultiplier);
  $$unsubscribe_currentDistribution();
  $$unsubscribe_userStats();
  return `<div class="countdown-card svelte-6x58d4"><div class="countdown-header svelte-6x58d4" data-svelte-h="svelte-1mfcoki"><div class="countdown-title svelte-6x58d4"><span>🌑</span> <span>Next Distribution</span> <div class="countdown-pulse svelte-6x58d4"></div></div></div> <div class="countdown-time svelte-6x58d4"><div class="countdown-number svelte-6x58d4">${escape($currentDistribution.biddingPeriod.daysRemaining)}</div> <div class="countdown-label svelte-6x58d4" data-svelte-h="svelte-s37hx">Days Until New Moon</div></div> <div class="countdown-info svelte-6x58d4"><div class="countdown-info-item svelte-6x58d4"><div class="countdown-info-label svelte-6x58d4" data-svelte-h="svelte-nc0ngg">Pool</div> <div class="countdown-info-value svelte-6x58d4">${escape(poolAmount)}</div></div> <div class="countdown-info-item svelte-6x58d4"><div class="countdown-info-label svelte-6x58d4" data-svelte-h="svelte-xux0qp">Your Tokens</div> <div class="countdown-info-value svelte-6x58d4">${escape(userHours)}h</div></div> <div class="countdown-info-item svelte-6x58d4"><div class="countdown-info-label svelte-6x58d4" data-svelte-h="svelte-17g1zvf">Est. Share</div> <div class="countdown-info-value svelte-6x58d4">${escape(estimatedShare)}</div></div></div> </div>`;
});
const css = {
  code: ".stats-grid.svelte-18w5b6w{display:grid;grid-template-columns:repeat(3, 1fr);gap:0.75rem}.quick-actions.svelte-18w5b6w{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}.activity-feed.svelte-18w5b6w{display:flex;flex-direction:column;gap:0.75rem}.intentions-preview.svelte-18w5b6w{display:flex;flex-direction:column;gap:0.75rem}.view-more.svelte-18w5b6w{text-align:center;margin-top:0.5rem}.view-more-link.svelte-18w5b6w{background:none;border:none;color:#00FFD1;font-size:0.85rem;font-weight:500;cursor:pointer;transition:all 0.2s ease;font-family:Exo, sans-serif}.view-more-link.svelte-18w5b6w:hover{text-shadow:0 0 10px rgba(0, 255, 209, 0.3)}@media(max-width: 768px){.quick-actions.svelte-18w5b6w{grid-template-columns:1fr}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { activeTab } from \\"$stores/navigationStore\\";\\nimport { userStats } from \\"$stores/userStore\\";\\nimport { recentActivity, intentions } from \\"$data/mockData\\";\\nimport TempleHeader from \\"$components/core/TempleHeader.svelte\\";\\nimport CountdownCard from \\"$components/core/CountdownCard.svelte\\";\\nimport StatCard from \\"$components/core/StatCard.svelte\\";\\nimport ActionButton from \\"$components/core/ActionButton.svelte\\";\\nimport SectionTitle from \\"$components/core/SectionTitle.svelte\\";\\nimport ActivityItem from \\"$components/core/ActivityItem.svelte\\";\\nimport IntentionCard from \\"$components/core/IntentionCard.svelte\\";\\nimport BottomNav from \\"$components/core/BottomNav.svelte\\";\\nonMount(() => {\\n  activeTab.set(\\"home\\");\\n});\\n$: featuredIntentions = intentions.sort((a, b) => b.stats.totalAttentionHours - a.stats.totalAttentionHours).slice(0, 2);\\nfunction handleCreateIntention() {\\n  goto(\\"/create\\");\\n}\\nfunction handleBidTokens() {\\n  goto(\\"/tokens\\");\\n}\\nfunction handleViewAllActivity() {\\n  goto(\\"/browse\\");\\n}\\nfunction handleViewIntention(intentionId) {\\n  goto(\`/browse/\${intentionId}\`);\\n}\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Home - Synchronicity Engine</title>\\n</svelte:head>\\n\\n<div class=\\"min-h-screen pb-24\\">\\n\\t<div class=\\"phone-mockup\\">\\n\\t\\t<div class=\\"screen-content\\">\\n\\t\\t\\t<TempleHeader />\\n\\n\\t\\t\\t<CountdownCard />\\n\\n\\t\\t\\t<!-- Personal Stats -->\\n\\t\\t\\t<div class=\\"stats-grid mb-6\\">\\n\\t\\t\\t\\t<StatCard\\n\\t\\t\\t\\t\\ticon=\\"💎\\"\\n\\t\\t\\t\\t\\tvalue={$userStats.tokensHeld}\\n\\t\\t\\t\\t\\tlabel=\\"Tokens\\"\\n\\t\\t\\t\\t\\tonClick={() => goto('/tokens')}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<StatCard\\n\\t\\t\\t\\t\\ticon=\\"🎯\\"\\n\\t\\t\\t\\t\\tvalue={$userStats.activeIntentions}\\n\\t\\t\\t\\t\\tlabel=\\"Active\\"\\n\\t\\t\\t\\t\\tonClick={() => goto('/browse')}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<StatCard\\n\\t\\t\\t\\t\\ticon=\\"🤝\\"\\n\\t\\t\\t\\t\\tvalue={$userStats.connections}\\n\\t\\t\\t\\t\\tlabel=\\"Connects\\"\\n\\t\\t\\t\\t\\tonClick={() => goto('/profile')}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<!-- Quick Actions -->\\n\\t\\t\\t<div class=\\"quick-actions mb-6\\">\\n\\t\\t\\t\\t<ActionButton variant=\\"primary\\" icon=\\"✨\\" onClick={handleCreateIntention}>\\n\\t\\t\\t\\t\\tCreate Intention\\n\\t\\t\\t\\t</ActionButton>\\n\\t\\t\\t\\t<ActionButton variant=\\"secondary\\" icon=\\"🏆\\" onClick={handleBidTokens}>\\n\\t\\t\\t\\t\\tBid Tokens\\n\\t\\t\\t\\t</ActionButton>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<!-- Recent Activity -->\\n\\t\\t\\t<SectionTitle icon=\\"⚡\\" title=\\"Recent Activity\\" />\\n\\n\\t\\t\\t<div class=\\"activity-feed mb-4\\">\\n\\t\\t\\t\\t{#each recentActivity as activity}\\n\\t\\t\\t\\t\\t<ActivityItem {activity} />\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div class=\\"view-more mb-6\\">\\n\\t\\t\\t\\t<button class=\\"view-more-link\\" on:click={handleViewAllActivity}>\\n\\t\\t\\t\\t\\tView all activity →\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<!-- Featured Intentions -->\\n\\t\\t\\t<SectionTitle icon=\\"🔥\\" title=\\"Trending Intentions\\" />\\n\\n\\t\\t\\t<div class=\\"intentions-preview mb-4\\">\\n\\t\\t\\t\\t{#each featuredIntentions as intention}\\n\\t\\t\\t\\t\\t<IntentionCard {intention} onClick={() => handleViewIntention(intention.intentionId)} />\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div class=\\"view-more\\">\\n\\t\\t\\t\\t<button class=\\"view-more-link\\" on:click={() => goto('/browse')}>\\n\\t\\t\\t\\t\\tBrowse all intentions →\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<BottomNav />\\n</div>\\n\\n<style>\\n\\t.stats-grid {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: repeat(3, 1fr);\\n\\t\\tgap: 0.75rem;\\n\\t}\\n\\n\\t.quick-actions {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 1fr 1fr;\\n\\t\\tgap: 0.75rem;\\n\\t}\\n\\n\\t.activity-feed {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 0.75rem;\\n\\t}\\n\\n\\t.intentions-preview {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 0.75rem;\\n\\t}\\n\\n\\t.view-more {\\n\\t\\ttext-align: center;\\n\\t\\tmargin-top: 0.5rem;\\n\\t}\\n\\n\\t.view-more-link {\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: #00FFD1;\\n\\t\\tfont-size: 0.85rem;\\n\\t\\tfont-weight: 500;\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all 0.2s ease;\\n\\t\\tfont-family: Exo, sans-serif;\\n\\t}\\n\\n\\t.view-more-link:hover {\\n\\t\\ttext-shadow: 0 0 10px rgba(0, 255, 209, 0.3);\\n\\t}\\n\\n\\t@media (max-width: 768px) {\\n\\t\\t.quick-actions {\\n\\t\\t\\tgrid-template-columns: 1fr;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA8GC,0BAAY,CACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,OACN,CAEA,6BAAe,CACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,GAAG,CAAE,OACN,CAEA,6BAAe,CACd,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,OACN,CAEA,kCAAoB,CACnB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,OACN,CAEA,yBAAW,CACV,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,MACb,CAEA,8BAAgB,CACf,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,WAAW,CAAE,GAAG,CAAC,CAAC,UACnB,CAEA,8BAAe,MAAO,CACrB,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC5C,CAEA,MAAO,YAAY,KAAK,CAAE,CACzB,6BAAe,CACd,qBAAqB,CAAE,GACxB,CACD"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featuredIntentions;
  let $userStats, $$unsubscribe_userStats;
  $$unsubscribe_userStats = subscribe(userStats, (value) => $userStats = value);
  function handleCreateIntention() {
    goto();
  }
  function handleBidTokens() {
    goto();
  }
  function handleViewIntention(intentionId) {
    goto();
  }
  $$result.css.add(css);
  featuredIntentions = intentions.sort((a, b) => b.stats.totalAttentionHours - a.stats.totalAttentionHours).slice(0, 2);
  $$unsubscribe_userStats();
  return `${$$result.head += `<!-- HEAD_svelte-fget76_START -->${$$result.title = `<title>Home - Synchronicity Engine</title>`, ""}<!-- HEAD_svelte-fget76_END -->`, ""} <div class="min-h-screen pb-24"><div class="phone-mockup"><div class="screen-content">${validate_component(TempleHeader, "TempleHeader").$$render($$result, {}, {}, {})} ${validate_component(CountdownCard, "CountdownCard").$$render($$result, {}, {}, {})}  <div class="stats-grid mb-6 svelte-18w5b6w">${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      icon: "💎",
      value: $userStats.tokensHeld,
      label: "Tokens",
      onClick: () => goto()
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      icon: "🎯",
      value: $userStats.activeIntentions,
      label: "Active",
      onClick: () => goto()
    },
    {},
    {}
  )} ${validate_component(StatCard, "StatCard").$$render(
    $$result,
    {
      icon: "🤝",
      value: $userStats.connections,
      label: "Connects",
      onClick: () => goto()
    },
    {},
    {}
  )}</div>  <div class="quick-actions mb-6 svelte-18w5b6w">${validate_component(ActionButton, "ActionButton").$$render(
    $$result,
    {
      variant: "primary",
      icon: "✨",
      onClick: handleCreateIntention
    },
    {},
    {
      default: () => {
        return `Create Intention`;
      }
    }
  )} ${validate_component(ActionButton, "ActionButton").$$render(
    $$result,
    {
      variant: "secondary",
      icon: "🏆",
      onClick: handleBidTokens
    },
    {},
    {
      default: () => {
        return `Bid Tokens`;
      }
    }
  )}</div>  ${validate_component(SectionTitle, "SectionTitle").$$render($$result, { icon: "⚡", title: "Recent Activity" }, {}, {})} <div class="activity-feed mb-4 svelte-18w5b6w">${each(recentActivity, (activity) => {
    return `${validate_component(ActivityItem, "ActivityItem").$$render($$result, { activity }, {}, {})}`;
  })}</div> <div class="view-more mb-6 svelte-18w5b6w"><button class="view-more-link svelte-18w5b6w" data-svelte-h="svelte-1oaqb8e">View all activity →</button></div>  ${validate_component(SectionTitle, "SectionTitle").$$render($$result, { icon: "🔥", title: "Trending Intentions" }, {}, {})} <div class="intentions-preview mb-4 svelte-18w5b6w">${each(featuredIntentions, (intention) => {
    return `${validate_component(IntentionCard, "IntentionCard").$$render(
      $$result,
      {
        intention,
        onClick: () => handleViewIntention(intention.intentionId)
      },
      {},
      {}
    )}`;
  })}</div> <div class="view-more svelte-18w5b6w"><button class="view-more-link svelte-18w5b6w" data-svelte-h="svelte-1xxyc1t">Browse all intentions →</button></div></div></div> ${validate_component(BottomNav, "BottomNav").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};
