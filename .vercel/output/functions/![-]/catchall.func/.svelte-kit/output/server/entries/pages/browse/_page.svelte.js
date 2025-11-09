import { c as create_ssr_component, b as add_attribute, d as each, e as escape, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { g as goto } from "../../../chunks/client.js";
import { d as derived, w as writable } from "../../../chunks/index.js";
import { i as intentions, B as BottomNav } from "../../../chunks/BottomNav.js";
import { S as SectionTitle } from "../../../chunks/SectionTitle.js";
import { I as IntentionCard } from "../../../chunks/IntentionCard.js";
import { E as EmptyState } from "../../../chunks/EmptyState.js";
const allIntentions = writable(intentions);
const activeFilter = writable("All");
const activeSortOption = writable("trending");
const searchQuery = writable("");
const filteredIntentions = derived(
  [allIntentions, activeFilter, activeSortOption, searchQuery],
  ([$intentions, $filter, $sort, $search]) => {
    let filtered = $intentions;
    if ($filter !== "All") {
      filtered = filtered.filter((i) => i.category === $filter);
    }
    if ($search) {
      const query = $search.toLowerCase();
      filtered = filtered.filter(
        (i) => i.title.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)
      );
    }
    switch ($sort) {
      case "trending":
        return filtered.sort(
          (a, b) => b.stats.totalAttentionHours - a.stats.totalAttentionHours
        );
      case "recent":
        return filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "high-impact":
        return filtered.filter((i) => i.stats.impactLevel === "high");
      default:
        return filtered;
    }
  }
);
const css$2 = {
  code: ".search-bar.svelte-iaqh31{position:relative;display:flex;align-items:center;gap:0.75rem;background:rgba(0, 0, 0, 0.3);border:1px solid rgba(0, 255, 209, 0.3);border-radius:0.75rem;padding:0.75rem 1rem;margin-bottom:1rem;transition:all 0.2s ease}.search-bar.svelte-iaqh31:focus-within{border-color:#00FFD1;box-shadow:0 0 15px rgba(0, 255, 209, 0.3)}.search-icon.svelte-iaqh31{font-size:1.1rem;flex-shrink:0}.search-input.svelte-iaqh31{flex:1;background:none;border:none;color:#F7F3E9;font-family:Exo, sans-serif;font-size:0.9rem;outline:none}.search-input.svelte-iaqh31::-moz-placeholder{color:#84A98C}.search-input.svelte-iaqh31::placeholder{color:#84A98C}.clear-button.svelte-iaqh31{background:none;border:none;color:#84A98C;cursor:pointer;padding:0;font-size:1.2rem;line-height:1;transition:color 0.2s ease}.clear-button.svelte-iaqh31:hover{color:#00FFD1}",
  map: '{"version":3,"file":"SearchBar.svelte","sources":["SearchBar.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let value = \\"\\";\\nexport let placeholder = \\"Search...\\";\\nexport let onInput = void 0;\\nfunction handleInput(e) {\\n  const target = e.target;\\n  value = target.value;\\n  if (onInput) onInput(value);\\n}\\nfunction clearSearch() {\\n  value = \\"\\";\\n  if (onInput) onInput(\\"\\");\\n}\\n<\/script>\\n\\n<div class=\\"search-bar\\">\\n\\t<span class=\\"search-icon\\">🔍</span>\\n\\t<input\\n\\t\\ttype=\\"text\\"\\n\\t\\t{placeholder}\\n\\t\\t{value}\\n\\t\\ton:input={handleInput}\\n\\t\\tclass=\\"search-input\\"\\n\\t/>\\n\\t{#if value}\\n\\t\\t<button class=\\"clear-button\\" on:click={clearSearch} aria-label=\\"Clear search\\">\\n\\t\\t\\t✕\\n\\t\\t</button>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.search-bar {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 0.75rem;\\n\\t\\tbackground: rgba(0, 0, 0, 0.3);\\n\\t\\tborder: 1px solid rgba(0, 255, 209, 0.3);\\n\\t\\tborder-radius: 0.75rem;\\n\\t\\tpadding: 0.75rem 1rem;\\n\\t\\tmargin-bottom: 1rem;\\n\\t\\ttransition: all 0.2s ease;\\n\\t}\\n\\n\\t.search-bar:focus-within {\\n\\t\\tborder-color: #00FFD1;\\n\\t\\tbox-shadow: 0 0 15px rgba(0, 255, 209, 0.3);\\n\\t}\\n\\n\\t.search-icon {\\n\\t\\tfont-size: 1.1rem;\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\n\\t.search-input {\\n\\t\\tflex: 1;\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: #F7F3E9;\\n\\t\\tfont-family: Exo, sans-serif;\\n\\t\\tfont-size: 0.9rem;\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.search-input::-moz-placeholder {\\n\\t\\tcolor: #84A98C;\\n\\t}\\n\\n\\t.search-input::placeholder {\\n\\t\\tcolor: #84A98C;\\n\\t}\\n\\n\\t.clear-button {\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: #84A98C;\\n\\t\\tcursor: pointer;\\n\\t\\tpadding: 0;\\n\\t\\tfont-size: 1.2rem;\\n\\t\\tline-height: 1;\\n\\t\\ttransition: color 0.2s ease;\\n\\t}\\n\\n\\t.clear-button:hover {\\n\\t\\tcolor: #00FFD1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+BC,yBAAY,CACX,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,OAAO,CACZ,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACxC,aAAa,CAAE,OAAO,CACtB,OAAO,CAAE,OAAO,CAAC,IAAI,CACrB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,yBAAW,aAAc,CACxB,YAAY,CAAE,OAAO,CACrB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAEA,0BAAa,CACZ,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,CACd,CAEA,2BAAc,CACb,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAAC,CAAC,UAAU,CAC5B,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,IACV,CAEA,2BAAa,kBAAmB,CAC/B,KAAK,CAAE,OACR,CAEA,2BAAa,aAAc,CAC1B,KAAK,CAAE,OACR,CAEA,2BAAc,CACb,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,CAAC,CACd,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IACxB,CAEA,2BAAa,MAAO,CACnB,KAAK,CAAE,OACR"}'
};
const SearchBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let { placeholder = "Search..." } = $$props;
  let { onInput = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.onInput === void 0 && $$bindings.onInput && onInput !== void 0) $$bindings.onInput(onInput);
  $$result.css.add(css$2);
  return `<div class="search-bar svelte-iaqh31"><span class="search-icon svelte-iaqh31" data-svelte-h="svelte-k77c2d">🔍</span> <input type="text"${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", value, 0)} class="search-input svelte-iaqh31"> ${value ? `<button class="clear-button svelte-iaqh31" aria-label="Clear search" data-svelte-h="svelte-hrl6da">✕</button>` : ``} </div>`;
});
const css$1 = {
  code: ".filter-chips.svelte-vbiria{display:flex;gap:0.5rem;overflow-x:auto;overflow-y:hidden;padding-bottom:0.5rem;margin-bottom:1rem;-webkit-overflow-scrolling:touch;scrollbar-width:thin}.filter-chips.svelte-vbiria::-webkit-scrollbar{height:4px}.filter-chips.svelte-vbiria::-webkit-scrollbar-track{background:rgba(0, 0, 0, 0.2)}.filter-chips.svelte-vbiria::-webkit-scrollbar-thumb{background:rgba(0, 255, 209, 0.3);border-radius:2px}.filter-chip.svelte-vbiria{background:rgba(0, 0, 0, 0.3);border:1px solid rgba(0, 255, 209, 0.3);color:#84A98C;border-radius:1.5rem;padding:0.5rem 1rem;font-family:Exo, sans-serif;font-size:0.8rem;font-weight:500;white-space:nowrap;cursor:pointer;transition:all 0.2s ease}.filter-chip.svelte-vbiria:hover{border-color:#00FFD1;color:#00FFD1}.filter-chip.active.svelte-vbiria{background:rgba(0, 255, 209, 0.05);border-color:#00FFD1;color:#00FFD1;box-shadow:0 0 15px rgba(0, 255, 209, 0.3)}",
  map: '{"version":3,"file":"FilterChips.svelte","sources":["FilterChips.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let activeFilter = \\"All\\";\\nexport let onFilterChange = void 0;\\nconst filters = [\\n  \\"All\\",\\n  \\"Organic Food & Nutrition\\",\\n  \\"Land Stewardship\\",\\n  \\"Off-Grid & Sustainable Living\\",\\n  \\"Health & Vitality\\",\\n  \\"Community Abundance\\",\\n  \\"Self & Spiritual Development\\",\\n  \\"Creative Expression\\"\\n];\\nfunction handleClick(filter) {\\n  activeFilter = filter;\\n  if (onFilterChange) onFilterChange(filter);\\n}\\n<\/script>\\n\\n<div class=\\"filter-chips\\">\\n\\t{#each filters as filter}\\n\\t\\t<button\\n\\t\\t\\tclass=\\"filter-chip\\"\\n\\t\\t\\tclass:active={activeFilter === filter}\\n\\t\\t\\ton:click={() => handleClick(filter)}\\n\\t\\t>\\n\\t\\t\\t{filter}\\n\\t\\t</button>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.filter-chips {\\n\\t\\tdisplay: flex;\\n\\t\\tgap: 0.5rem;\\n\\t\\toverflow-x: auto;\\n\\t\\toverflow-y: hidden;\\n\\t\\tpadding-bottom: 0.5rem;\\n\\t\\tmargin-bottom: 1rem;\\n\\t\\t-webkit-overflow-scrolling: touch;\\n\\t\\tscrollbar-width: thin;\\n\\t}\\n\\n\\t.filter-chips::-webkit-scrollbar {\\n\\t\\theight: 4px;\\n\\t}\\n\\n\\t.filter-chips::-webkit-scrollbar-track {\\n\\t\\tbackground: rgba(0, 0, 0, 0.2);\\n\\t}\\n\\n\\t.filter-chips::-webkit-scrollbar-thumb {\\n\\t\\tbackground: rgba(0, 255, 209, 0.3);\\n\\t\\tborder-radius: 2px;\\n\\t}\\n\\n\\t.filter-chip {\\n\\t\\tbackground: rgba(0, 0, 0, 0.3);\\n\\t\\tborder: 1px solid rgba(0, 255, 209, 0.3);\\n\\t\\tcolor: #84A98C;\\n\\t\\tborder-radius: 1.5rem;\\n\\t\\tpadding: 0.5rem 1rem;\\n\\t\\tfont-family: Exo, sans-serif;\\n\\t\\tfont-size: 0.8rem;\\n\\t\\tfont-weight: 500;\\n\\t\\twhite-space: nowrap;\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all 0.2s ease;\\n\\t}\\n\\n\\t.filter-chip:hover {\\n\\t\\tborder-color: #00FFD1;\\n\\t\\tcolor: #00FFD1;\\n\\t}\\n\\n\\t.filter-chip.active {\\n\\t\\tbackground: rgba(0, 255, 209, 0.05);\\n\\t\\tborder-color: #00FFD1;\\n\\t\\tcolor: #00FFD1;\\n\\t\\tbox-shadow: 0 0 15px rgba(0, 255, 209, 0.3);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA+BC,2BAAc,CACb,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,MAAM,CACX,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,IAAI,CACnB,0BAA0B,CAAE,KAAK,CACjC,eAAe,CAAE,IAClB,CAEA,2BAAa,mBAAoB,CAChC,MAAM,CAAE,GACT,CAEA,2BAAa,yBAA0B,CACtC,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC9B,CAEA,2BAAa,yBAA0B,CACtC,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAClC,aAAa,CAAE,GAChB,CAEA,0BAAa,CACZ,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACxC,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,MAAM,CACrB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,WAAW,CAAE,GAAG,CAAC,CAAC,UAAU,CAC5B,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IACtB,CAEA,0BAAY,MAAO,CAClB,YAAY,CAAE,OAAO,CACrB,KAAK,CAAE,OACR,CAEA,YAAY,qBAAQ,CACnB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACnC,YAAY,CAAE,OAAO,CACrB,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C"}'
};
const FilterChips = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { activeFilter: activeFilter2 = "All" } = $$props;
  let { onFilterChange = void 0 } = $$props;
  const filters = [
    "All",
    "Organic Food & Nutrition",
    "Land Stewardship",
    "Off-Grid & Sustainable Living",
    "Health & Vitality",
    "Community Abundance",
    "Self & Spiritual Development",
    "Creative Expression"
  ];
  if ($$props.activeFilter === void 0 && $$bindings.activeFilter && activeFilter2 !== void 0) $$bindings.activeFilter(activeFilter2);
  if ($$props.onFilterChange === void 0 && $$bindings.onFilterChange && onFilterChange !== void 0) $$bindings.onFilterChange(onFilterChange);
  $$result.css.add(css$1);
  return `<div class="filter-chips svelte-vbiria">${each(filters, (filter) => {
    return `<button class="${["filter-chip svelte-vbiria", activeFilter2 === filter ? "active" : ""].join(" ").trim()}">${escape(filter)} </button>`;
  })} </div>`;
});
const css = {
  code: ".intentions-list.svelte-7bymer.svelte-7bymer{display:flex;flex-direction:column;gap:1rem}.header-row.svelte-7bymer.svelte-7bymer{display:flex;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;flex-wrap:wrap}.sort-dropdown.svelte-7bymer.svelte-7bymer{position:relative;flex-shrink:0}.sort-select.svelte-7bymer.svelte-7bymer{background:rgba(0, 0, 0, 0.3);border:1px solid rgba(0, 255, 209, 0.3);color:#00FFD1;border-radius:0.5rem;padding:0.5rem 0.75rem;font-family:Exo, sans-serif;font-size:0.75rem;font-weight:500;cursor:pointer;outline:none;transition:all 0.2s ease;min-width:120px;max-width:100%}.sort-select.svelte-7bymer.svelte-7bymer:hover,.sort-select.svelte-7bymer.svelte-7bymer:focus{border-color:#00FFD1;box-shadow:0 0 10px rgba(0, 255, 209, 0.3)}.sort-select.svelte-7bymer option.svelte-7bymer{background:#0f1f1f;color:#F7F3E9}@media(max-width: 480px){.header-row.svelte-7bymer.svelte-7bymer{flex-direction:column;align-items:flex-start}.sort-dropdown.svelte-7bymer.svelte-7bymer{width:100%}.sort-select.svelte-7bymer.svelte-7bymer{width:100%;font-size:0.7rem}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { activeTab } from \\"$stores/navigationStore\\";\\nimport {\\n  filteredIntentions,\\n  activeFilter,\\n  activeSortOption,\\n  searchQuery\\n} from \\"$stores/intentionsStore\\";\\nimport SearchBar from \\"$components/core/SearchBar.svelte\\";\\nimport FilterChips from \\"$components/core/FilterChips.svelte\\";\\nimport SectionTitle from \\"$components/core/SectionTitle.svelte\\";\\nimport IntentionCard from \\"$components/core/IntentionCard.svelte\\";\\nimport EmptyState from \\"$components/core/EmptyState.svelte\\";\\nimport BottomNav from \\"$components/core/BottomNav.svelte\\";\\nonMount(() => {\\n  activeTab.set(\\"browse\\");\\n});\\nconst sortOptions = [\\n  { value: \\"trending\\", label: \\"\\\\u{1F525} Trending\\" },\\n  { value: \\"recent\\", label: \\"\\\\u{1F195} Recent\\" },\\n  { value: \\"high-impact\\", label: \\"\\\\u26A1 High Impact\\" }\\n];\\nfunction handleSearchInput(value) {\\n  searchQuery.set(value);\\n}\\nfunction handleFilterChange(filter) {\\n  activeFilter.set(filter);\\n}\\nfunction handleSortChange(sort) {\\n  activeSortOption.set(sort);\\n}\\nfunction handleViewIntention(intentionId) {\\n  goto(\`/browse/\${intentionId}\`);\\n}\\nfunction handleClearFilters() {\\n  activeFilter.set(\\"All\\");\\n  searchQuery.set(\\"\\");\\n}\\n$: hasActiveFilters = $activeFilter !== \\"All\\" || $searchQuery !== \\"\\";\\n$: intentionsCount = $filteredIntentions.length;\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Browse Intentions - Synchronicity Engine</title>\\n</svelte:head>\\n\\n<div class=\\"min-h-screen pb-24\\">\\n\\t<div class=\\"phone-mockup\\">\\n\\t\\t<div class=\\"screen-content\\">\\n\\t\\t\\t<!-- Page Header -->\\n\\t\\t\\t<div class=\\"mb-4\\">\\n\\t\\t\\t\\t<h1 class=\\"text-gold text-2xl font-bold mb-2\\">Discover Intentions</h1>\\n\\t\\t\\t\\t<p class=\\"text-sage text-sm\\">\\n\\t\\t\\t\\t\\tExplore community needs and contribute your unique gifts\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<!-- Search Bar -->\\n\\t\\t\\t<SearchBar\\n\\t\\t\\t\\tvalue={$searchQuery}\\n\\t\\t\\t\\tplaceholder=\\"Search intentions...\\"\\n\\t\\t\\t\\tonInput={handleSearchInput}\\n\\t\\t\\t/>\\n\\n\\t\\t\\t<!-- Filter Chips -->\\n\\t\\t\\t<FilterChips activeFilter={$activeFilter} onFilterChange={handleFilterChange} />\\n\\n\\t\\t\\t<!-- Sort Options & Count -->\\n\\t\\t\\t<div class=\\"header-row\\">\\n\\t\\t\\t\\t<SectionTitle icon=\\"🎯\\" title={\`\${intentionsCount} Intentions\`} />\\n\\t\\t\\t\\t<div class=\\"sort-dropdown\\">\\n\\t\\t\\t\\t\\t<select bind:value={$activeSortOption} class=\\"sort-select\\">\\n\\t\\t\\t\\t\\t\\t{#each sortOptions as option}\\n\\t\\t\\t\\t\\t\\t\\t<option value={option.value}>{option.label}</option>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</select>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<!-- Intentions List -->\\n\\t\\t\\t<div class=\\"intentions-list\\">\\n\\t\\t\\t\\t{#if $filteredIntentions.length > 0}\\n\\t\\t\\t\\t\\t{#each $filteredIntentions as intention (intention.intentionId)}\\n\\t\\t\\t\\t\\t\\t<div class=\\"animate-fade-in\\">\\n\\t\\t\\t\\t\\t\\t\\t<IntentionCard\\n\\t\\t\\t\\t\\t\\t\\t\\t{intention}\\n\\t\\t\\t\\t\\t\\t\\t\\tonClick={() => handleViewIntention(intention.intentionId)}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<EmptyState\\n\\t\\t\\t\\t\\t\\ticon=\\"🔍\\"\\n\\t\\t\\t\\t\\t\\ttitle=\\"No intentions found\\"\\n\\t\\t\\t\\t\\t\\tmessage={hasActiveFilters\\n\\t\\t\\t\\t\\t\\t\\t? 'Try adjusting your filters or search query'\\n\\t\\t\\t\\t\\t\\t\\t: 'Be the first to create an intention!'}\\n\\t\\t\\t\\t\\t\\tactionText={hasActiveFilters ? 'Clear Filters' : 'Create Intention'}\\n\\t\\t\\t\\t\\t\\tonAction={hasActiveFilters ? handleClearFilters : () => goto('/create')}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<BottomNav />\\n</div>\\n\\n<style>\\n\\t.intentions-list {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 1rem;\\n\\t}\\n\\n\\t.header-row {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: space-between;\\n\\t\\tgap: 0.75rem;\\n\\t\\tmargin-bottom: 1rem;\\n\\t\\tflex-wrap: wrap;\\n\\t}\\n\\n\\t.sort-dropdown {\\n\\t\\tposition: relative;\\n\\t\\tflex-shrink: 0;\\n\\t}\\n\\n\\t.sort-select {\\n\\t\\tbackground: rgba(0, 0, 0, 0.3);\\n\\t\\tborder: 1px solid rgba(0, 255, 209, 0.3);\\n\\t\\tcolor: #00FFD1;\\n\\t\\tborder-radius: 0.5rem;\\n\\t\\tpadding: 0.5rem 0.75rem;\\n\\t\\tfont-family: Exo, sans-serif;\\n\\t\\tfont-size: 0.75rem;\\n\\t\\tfont-weight: 500;\\n\\t\\tcursor: pointer;\\n\\t\\toutline: none;\\n\\t\\ttransition: all 0.2s ease;\\n\\t\\tmin-width: 120px;\\n\\t\\tmax-width: 100%;\\n\\t}\\n\\n\\t.sort-select:hover,\\n\\t.sort-select:focus {\\n\\t\\tborder-color: #00FFD1;\\n\\t\\tbox-shadow: 0 0 10px rgba(0, 255, 209, 0.3);\\n\\t}\\n\\n\\t.sort-select option {\\n\\t\\tbackground: #0f1f1f;\\n\\t\\tcolor: #F7F3E9;\\n\\t}\\n\\n\\t@media (max-width: 480px) {\\n\\t\\t.header-row {\\n\\t\\t\\tflex-direction: column;\\n\\t\\t\\talign-items: flex-start;\\n\\t\\t}\\n\\n\\t\\t.sort-dropdown {\\n\\t\\t\\twidth: 100%;\\n\\t\\t}\\n\\n\\t\\t.sort-select {\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\tfont-size: 0.7rem;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA8GC,4CAAiB,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACN,CAEA,uCAAY,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,GAAG,CAAE,OAAO,CACZ,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,IACZ,CAEA,0CAAe,CACd,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,CACd,CAEA,wCAAa,CACZ,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACxC,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,MAAM,CACrB,OAAO,CAAE,MAAM,CAAC,OAAO,CACvB,WAAW,CAAE,GAAG,CAAC,CAAC,UAAU,CAC5B,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,IACZ,CAEA,wCAAY,MAAM,CAClB,wCAAY,MAAO,CAClB,YAAY,CAAE,OAAO,CACrB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC3C,CAEA,0BAAY,CAAC,oBAAO,CACnB,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,OACR,CAEA,MAAO,YAAY,KAAK,CAAE,CACzB,uCAAY,CACX,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,UACd,CAEA,0CAAe,CACd,KAAK,CAAE,IACR,CAEA,wCAAa,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MACZ,CACD"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasActiveFilters;
  let intentionsCount;
  let $filteredIntentions, $$unsubscribe_filteredIntentions;
  let $searchQuery, $$unsubscribe_searchQuery;
  let $activeFilter, $$unsubscribe_activeFilter;
  let $$unsubscribe_activeSortOption;
  $$unsubscribe_filteredIntentions = subscribe(filteredIntentions, (value) => $filteredIntentions = value);
  $$unsubscribe_searchQuery = subscribe(searchQuery, (value) => $searchQuery = value);
  $$unsubscribe_activeFilter = subscribe(activeFilter, (value) => $activeFilter = value);
  $$unsubscribe_activeSortOption = subscribe(activeSortOption, (value) => value);
  const sortOptions = [
    {
      value: "trending",
      label: "🔥 Trending"
    },
    {
      value: "recent",
      label: "🆕 Recent"
    },
    {
      value: "high-impact",
      label: "⚡ High Impact"
    }
  ];
  function handleSearchInput(value) {
    searchQuery.set(value);
  }
  function handleFilterChange(filter) {
    activeFilter.set(filter);
  }
  function handleViewIntention(intentionId) {
    goto();
  }
  function handleClearFilters() {
    activeFilter.set("All");
    searchQuery.set("");
  }
  $$result.css.add(css);
  hasActiveFilters = $activeFilter !== "All" || $searchQuery !== "";
  intentionsCount = $filteredIntentions.length;
  $$unsubscribe_filteredIntentions();
  $$unsubscribe_searchQuery();
  $$unsubscribe_activeFilter();
  $$unsubscribe_activeSortOption();
  return `${$$result.head += `<!-- HEAD_svelte-5lepu2_START -->${$$result.title = `<title>Browse Intentions - Synchronicity Engine</title>`, ""}<!-- HEAD_svelte-5lepu2_END -->`, ""} <div class="min-h-screen pb-24"><div class="phone-mockup"><div class="screen-content"> <div class="mb-4" data-svelte-h="svelte-1okyw1k"><h1 class="text-gold text-2xl font-bold mb-2">Discover Intentions</h1> <p class="text-sage text-sm">Explore community needs and contribute your unique gifts</p></div>  ${validate_component(SearchBar, "SearchBar").$$render(
    $$result,
    {
      value: $searchQuery,
      placeholder: "Search intentions...",
      onInput: handleSearchInput
    },
    {},
    {}
  )}  ${validate_component(FilterChips, "FilterChips").$$render(
    $$result,
    {
      activeFilter: $activeFilter,
      onFilterChange: handleFilterChange
    },
    {},
    {}
  )}  <div class="header-row svelte-7bymer">${validate_component(SectionTitle, "SectionTitle").$$render(
    $$result,
    {
      icon: "🎯",
      title: `${intentionsCount} Intentions`
    },
    {},
    {}
  )} <div class="sort-dropdown svelte-7bymer"><select class="sort-select svelte-7bymer">${each(sortOptions, (option) => {
    return `<option${add_attribute("value", option.value, 0)} class="svelte-7bymer">${escape(option.label)}</option>`;
  })}</select></div></div>  <div class="intentions-list svelte-7bymer">${$filteredIntentions.length > 0 ? `${each($filteredIntentions, (intention) => {
    return `<div class="animate-fade-in">${validate_component(IntentionCard, "IntentionCard").$$render(
      $$result,
      {
        intention,
        onClick: () => handleViewIntention(intention.intentionId)
      },
      {},
      {}
    )} </div>`;
  })}` : `${validate_component(EmptyState, "EmptyState").$$render(
    $$result,
    {
      icon: "🔍",
      title: "No intentions found",
      message: hasActiveFilters ? "Try adjusting your filters or search query" : "Be the first to create an intention!",
      actionText: hasActiveFilters ? "Clear Filters" : "Create Intention",
      onAction: hasActiveFilters ? handleClearFilters : () => goto()
    },
    {},
    {}
  )}`}</div></div></div> ${validate_component(BottomNav, "BottomNav").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};
