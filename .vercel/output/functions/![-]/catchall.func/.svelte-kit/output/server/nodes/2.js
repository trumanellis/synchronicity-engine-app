

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CY_8OE0O.js","_app/immutable/chunks/Cp973A_G.js","_app/immutable/chunks/Y-MJMxnd.js","_app/immutable/chunks/CdPTMJLn.js"];
export const stylesheets = [];
export const fonts = [];
