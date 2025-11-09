import { d as derived, w as writable } from "./index.js";
import { g as userTokens } from "./BottomNav.js";
const tokens = writable(userTokens);
const activeTokenFilter = writable("all");
const filteredTokens = derived(
  [tokens, activeTokenFilter],
  ([$tokens, $filter]) => {
    switch ($filter) {
      case "available":
        return $tokens.filter((t) => t.status === "available");
      case "bid":
        return $tokens.filter((t) => t.status === "bid");
      case "historical":
        return $tokens.filter((t) => t.status === "historical");
      default:
        return $tokens;
    }
  }
);
const totalAvailableHours = derived(filteredTokens, ($tokens) => {
  return $tokens.filter((t) => t.status === "available").reduce((sum, t) => sum + t.computed.hours, 0);
});
export {
  totalAvailableHours as a,
  activeTokenFilter as b,
  filteredTokens as f,
  tokens as t
};
