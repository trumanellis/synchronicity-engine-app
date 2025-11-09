import { c as create_ssr_component, a as subscribe, d as each, b as add_attribute, e as escape } from "./ssr.js";
import { w as writable, d as derived } from "./index.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
const activeTab = writable("home");
const currentUser = {
  userId: "user-truman-001",
  name: "Dr. Truman Ellis",
  avatar: "👨‍🔬",
  bio: "Computational scientist exploring P2P gift economies",
  joinDate: "2024-08-15",
  temple: {
    templeId: "temple-agua-lila",
    templeName: "Templo da Água Lila",
    templeIcon: "🛕",
    location: "Montanhas Mágicas, Portugal",
    memberCount: 247,
    monthlyContribution: 25,
    role: "Original Steward"
  },
  stats: {
    tokensHeld: 5,
    totalHoursEarned: 156,
    activeIntentions: 12,
    connections: 34,
    fulfillmentsCompleted: 18,
    distributionsReceived: 3
  },
  paymentMethods: [
    {
      id: "pm-001",
      type: "bank_transfer",
      lastFour: "4829",
      isPrimary: true
    }
  ]
};
const temple = {
  templeId: "temple-agua-lila",
  name: "Templo da Água Lila",
  icon: "🛕",
  description: "First demonstration site for Synchronicity Engine principles",
  location: {
    name: "Montanhas Mágicas",
    region: "Portugal",
    coords: [40.2033, -8.4103]
  },
  founded: "2024-06-01",
  memberCount: 247,
  stats: {
    activeIntentions: 87,
    totalTokensCirculating: 12450,
    monthlyPoolCurrent: 47250,
    nextDistribution: "2025-11-12",
    daysUntilDistribution: 3
  },
  categories: [
    "Off-Grid & Sustainable Living",
    "Health & Vitality",
    "Organic Food & Nutrition",
    "Community Abundance",
    "Self & Spiritual Development",
    "Land Stewardship",
    "Creative Expression"
  ],
  values: [
    "Ecological regeneration",
    "Spiritual evolution",
    "Gift economy",
    "Sovereign technology"
  ]
};
const intentions = [
  {
    intentionId: "int-garden-001",
    title: "Community Garden Infrastructure",
    description: "Building raised beds, irrigation systems, and tool sheds for shared food production spaces. Current focus: 8 gardens across 3 neighborhoods need raised beds, composting systems, and water catchment infrastructure.",
    category: "Organic Food & Nutrition",
    createdBy: "user-marcus-001",
    createdAt: "2024-10-28T14:30:00Z",
    status: "active",
    location: {
      name: "Multiple sites",
      proximity: "local"
    },
    media: ["ipfs://Qm...garden1", "ipfs://Qm...garden2"],
    stats: {
      totalAttentionHours: 2847,
      participantCount: 156,
      activeDays: 12,
      impactLevel: "high"
    },
    topContributors: [
      {
        userId: "user-marcus-001",
        name: "Marcus Chen",
        avatar: "🔨",
        hours: 487,
        role: "Construction Lead"
      },
      {
        userId: "user-aisha-001",
        name: "Aisha Patel",
        avatar: "🌿",
        hours: 392,
        role: "Permaculture Designer"
      },
      {
        userId: "user-james-001",
        name: "James Rodriguez",
        avatar: "💧",
        hours: 276,
        role: "Irrigation Specialist"
      }
    ],
    recentActivity: [
      {
        activityId: "act-001",
        type: "proof_posted",
        userId: "user-marcus-001",
        userName: "Marcus Chen",
        timestamp: "2025-11-09T14:30:00Z",
        text: "Completed construction of 6 raised beds at Maple Grove Garden",
        icon: "✓",
        tokenEarned: {
          tokenId: "tok-001",
          hours: 12
        },
        meta: "🏆 Earned 12h Token • Proof submitted"
      },
      {
        activityId: "act-002",
        type: "token_released",
        userId: "user-sarah-001",
        userName: "Sarah Kim",
        timestamp: "2025-11-09T12:15:00Z",
        text: "Released 8h Token to James Rodriguez for irrigation system installation",
        icon: "🔄",
        meta: "💧 Pipeline for 3 gardens now operational"
      }
    ]
  },
  {
    intentionId: "int-eucalyptus-001",
    title: "Eucalyptus Removal Brigade",
    description: "Clear invasive fire-trees from sacred valley restoration site",
    category: "Land Stewardship",
    createdBy: "temple-agua-lila",
    createdAt: "2024-09-15T10:00:00Z",
    status: "active",
    location: {
      name: "Água Lila Valley",
      proximity: "on-site"
    },
    stats: {
      totalAttentionHours: 3892,
      participantCount: 89,
      activeDays: 56,
      impactLevel: "high"
    },
    topContributors: [
      {
        userId: "user-miguel-001",
        name: "Miguel Santos",
        avatar: "🪓",
        hours: 634,
        role: "Forestry Expert"
      },
      {
        userId: "user-elena-001",
        name: "Elena Torres",
        avatar: "🌱",
        hours: 512,
        role: "Ecologist"
      }
    ],
    recentActivity: []
  },
  {
    intentionId: "int-mushroom-001",
    title: "Mushroom Cultivation Network",
    description: "Share techniques, spores, and growing spaces for food sovereignty",
    category: "Organic Food & Nutrition",
    createdBy: "user-fungal-001",
    createdAt: "2024-10-05T16:45:00Z",
    status: "active",
    location: {
      name: "Regional network",
      proximity: "nearby"
    },
    stats: {
      totalAttentionHours: 2134,
      participantCount: 56,
      activeDays: 35,
      impactLevel: "medium"
    },
    topContributors: [],
    recentActivity: []
  },
  {
    intentionId: "int-solar-001",
    title: "Solar Dehydrator Workshop",
    description: "Build and share solar food dehydrators for off-grid food preservation",
    category: "Off-Grid & Sustainable Living",
    createdBy: "user-solar-001",
    createdAt: "2024-11-01T09:00:00Z",
    status: "active",
    location: {
      name: "Workshop Barn",
      proximity: "on-site"
    },
    stats: {
      totalAttentionHours: 2145,
      participantCount: 43,
      activeDays: 8,
      impactLevel: "medium"
    },
    topContributors: [],
    recentActivity: []
  }
];
const userTokens = [
  {
    tokenId: "tok-timber-001",
    intentionId: "int-garden-001",
    submittedBy: "user-truman-001",
    steward: "user-truman-001",
    parent: null,
    title: "Timber Framing Token",
    description: "Built tool shed at Oak Street Garden using reclaimed cedar",
    media: ["ipfs://Qm...shed1", "ipfs://Qm...shed2"],
    timestamp: "2024-10-25T11:30:00Z",
    location: {
      name: "Oak Street Garden",
      coords: [40.2045, -8.4115]
    },
    blessings: [
      {
        giverId: "user-marcus-001",
        attentionIndex: 42,
        polarity: 1,
        durationMs: 72e5
      },
      {
        giverId: "user-sarah-001",
        attentionIndex: 18,
        polarity: 1,
        durationMs: 108e5
      }
    ],
    computed: {
      totalDurationMs: 576e5,
      totalValueMs: 576e5,
      supporters: 8,
      challengers: 0,
      hours: 16
    },
    status: "available",
    category: "Infrastructure",
    tags: ["construction", "woodworking", "community-spaces"]
  },
  {
    tokenId: "tok-irrigation-001",
    intentionId: "int-garden-001",
    submittedBy: "user-truman-001",
    steward: "user-truman-001",
    parent: null,
    title: "Irrigation Consultation Token",
    description: "Designed gravity-fed water system for Riverside community garden",
    timestamp: "2024-11-02T09:15:00Z",
    computed: {
      totalDurationMs: 216e5,
      totalValueMs: 216e5,
      supporters: 5,
      challengers: 0,
      hours: 6
    },
    status: "available"
  }
];
const distribution = {
  distributionId: "dist-2025-11",
  cycle: "November 2025 New Moon",
  newMoonDate: "2025-11-12",
  biddingPeriod: {
    start: "2025-11-09T00:00:00Z",
    end: "2025-11-12T23:59:59Z",
    daysRemaining: 3
  },
  pool: {
    totalUSD: 47250,
    source: "Monthly community donations",
    contributors: 247
  },
  stats: {
    membersBidding: 127,
    totalHoursBid: 8200,
    averageBidHours: 64.5,
    estimatedShareMultiplier: 5.76
  },
  userBid: {
    status: "not_submitted",
    tokensSelected: [],
    totalHours: 0,
    estimatedShare: 0
  }
};
const recentActivity = [
  {
    activityId: "act-feed-001",
    type: "proof_posted",
    timestamp: "2025-11-09T14:30:00Z",
    userId: "user-marcus-001",
    userName: "Marcus Chen",
    text: "Completed raised bed construction at Maple Grove Garden",
    meta: "🏆 Earned 12h Token • Garden Infrastructure",
    icon: "✓"
  },
  {
    activityId: "act-feed-002",
    type: "token_released",
    timestamp: "2025-11-09T11:15:00Z",
    userId: "user-sarah-001",
    userName: "Sarah Kim",
    text: "Released 8h Token to James for irrigation system",
    meta: "💧 Pipeline now operational • 3 gardens connected",
    icon: "🎁"
  },
  {
    activityId: "act-feed-003",
    type: "intention_joined",
    timestamp: "2025-11-09T08:45:00Z",
    userId: "user-truman-001",
    userName: "You",
    text: 'Joined "Solar Dehydrator Workshop" intention',
    meta: "☀️ Off-Grid Living • 2,145h community attention",
    icon: "🌟"
  }
];
const connections = [
  {
    userId: "user-marcus-001",
    name: "Marcus Chen",
    avatar: "🔨",
    connectionDate: "2024-09-12",
    stats: {
      exchangesCompleted: 7,
      trustLevel: "high",
      lastInteraction: "2025-11-09T14:30:00Z"
    },
    sharedIntentions: ["int-garden-001", "int-tools-001"],
    bio: "Builder and permaculture enthusiast"
  },
  {
    userId: "user-sarah-001",
    name: "Sarah Kim",
    avatar: "🌱",
    connectionDate: "2024-08-20",
    stats: {
      exchangesCompleted: 12,
      trustLevel: "high",
      lastInteraction: "2025-11-09T11:15:00Z"
    },
    sharedIntentions: ["int-garden-001", "int-eucalyptus-001"],
    bio: "Community organizer and garden coordinator"
  }
];
function calculateEstimatedShare(hours) {
  return hours * distribution.stats.estimatedShareMultiplier;
}
function formatTimeAgo(timestamp) {
  const now = /* @__PURE__ */ new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
const user = writable(currentUser);
const userStats = derived(user, ($user) => $user.stats);
derived(user, ($user) => $user.temple);
const userTokenCount = derived(user, ($user) => $user.stats.tokensHeld);
const css = {
  code: ".nav-button.svelte-dj4m9t.svelte-dj4m9t{display:flex;flex-direction:column;align-items:center;gap:0.25rem;background:none;border:none;color:#84A98C;font-family:Exo, sans-serif;cursor:pointer;transition:all 0.2s ease;padding:0.5rem 1rem;min-width:60px}.nav-button.svelte-dj4m9t.svelte-dj4m9t:hover,.nav-button.active.svelte-dj4m9t.svelte-dj4m9t{color:#00FFD1}.nav-button.active.svelte-dj4m9t span.svelte-dj4m9t:first-child{filter:drop-shadow(0 0 8px rgba(0, 255, 209, 0.8))}.nav-badge.svelte-dj4m9t.svelte-dj4m9t{position:absolute;top:-4px;right:-4px;background:#D4AF37;color:#0a0e0f;border-radius:10px;padding:2px 6px;font-size:0.65rem;font-weight:700;box-shadow:0 0 10px rgba(212, 175, 55, 0.6)}",
  map: '{"version":3,"file":"BottomNav.svelte","sources":["BottomNav.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { activeTab } from \\"$stores/navigationStore\\";\\nimport { userTokenCount } from \\"$stores/userStore\\";\\nimport { goto } from \\"$app/navigation\\";\\n$: tabs = [\\n  { id: \\"home\\", icon: \\"\\\\u{1F3E0}\\", label: \\"Home\\", path: \\"/home\\" },\\n  { id: \\"browse\\", icon: \\"\\\\u{1F50D}\\", label: \\"Browse\\", path: \\"/browse\\" },\\n  { id: \\"create\\", icon: \\"\\\\u2728\\", label: \\"Create\\", path: \\"/create\\" },\\n  {\\n    id: \\"tokens\\",\\n    icon: \\"\\\\u{1F48E}\\",\\n    label: \\"Tokens\\",\\n    path: \\"/tokens\\",\\n    badge: $userTokenCount\\n  },\\n  { id: \\"profile\\", icon: \\"\\\\u{1F464}\\", label: \\"Profile\\", path: \\"/profile\\" }\\n];\\nfunction handleTabClick(tab) {\\n  activeTab.set(tab.id);\\n  goto(tab.path);\\n}\\n<\/script>\\n\\n<nav class=\\"fixed bottom-0 left-0 right-0 bg-bg-mid border-t-2 border-cyan px-4 py-3 z-50\\">\\n\\t<div class=\\"flex justify-around items-center max-w-md mx-auto\\">\\n\\t\\t{#each tabs as tab}\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"nav-button\\"\\n\\t\\t\\t\\tclass:active={$activeTab === tab.id}\\n\\t\\t\\t\\ton:click={() => handleTabClick(tab)}\\n\\t\\t\\t\\taria-label={tab.label}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div class=\\"relative\\">\\n\\t\\t\\t\\t\\t<span class=\\"text-2xl\\">{tab.icon}</span>\\n\\t\\t\\t\\t\\t{#if tab.badge}\\n\\t\\t\\t\\t\\t\\t<span class=\\"nav-badge\\">{tab.badge}</span>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<span class=\\"text-xs font-medium mt-1\\">{tab.label}</span>\\n\\t\\t\\t</button>\\n\\t\\t{/each}\\n\\t</div>\\n</nav>\\n\\n<style>\\n\\t.nav-button {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t\\tgap: 0.25rem;\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: #84A98C;\\n\\t\\tfont-family: Exo, sans-serif;\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all 0.2s ease;\\n\\t\\tpadding: 0.5rem 1rem;\\n\\t\\tmin-width: 60px;\\n\\t}\\n\\n\\t.nav-button:hover,\\n\\t.nav-button.active {\\n\\t\\tcolor: #00FFD1;\\n\\t}\\n\\n\\t.nav-button.active span:first-child {\\n\\t\\tfilter: drop-shadow(0 0 8px rgba(0, 255, 209, 0.8));\\n\\t}\\n\\n\\t.nav-badge {\\n\\t\\tposition: absolute;\\n\\t\\ttop: -4px;\\n\\t\\tright: -4px;\\n\\t\\tbackground: #D4AF37;\\n\\t\\tcolor: #0a0e0f;\\n\\t\\tborder-radius: 10px;\\n\\t\\tpadding: 2px 6px;\\n\\t\\tfont-size: 0.65rem;\\n\\t\\tfont-weight: 700;\\n\\t\\tbox-shadow: 0 0 10px rgba(212, 175, 55, 0.6);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4CC,uCAAY,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,OAAO,CACZ,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAAC,CAAC,UAAU,CAC5B,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,SAAS,CAAE,IACZ,CAEA,uCAAW,MAAM,CACjB,WAAW,mCAAQ,CAClB,KAAK,CAAE,OACR,CAEA,WAAW,qBAAO,CAAC,kBAAI,YAAa,CACnC,MAAM,CAAE,YAAY,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACnD,CAEA,sCAAW,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,GAAG,CAAC,GAAG,CAChB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC5C"}'
};
const BottomNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tabs;
  let $userTokenCount, $$unsubscribe_userTokenCount;
  let $activeTab, $$unsubscribe_activeTab;
  $$unsubscribe_userTokenCount = subscribe(userTokenCount, (value) => $userTokenCount = value);
  $$unsubscribe_activeTab = subscribe(activeTab, (value) => $activeTab = value);
  $$result.css.add(css);
  tabs = [
    {
      id: "home",
      icon: "🏠",
      label: "Home",
      path: "/home"
    },
    {
      id: "browse",
      icon: "🔍",
      label: "Browse",
      path: "/browse"
    },
    {
      id: "create",
      icon: "✨",
      label: "Create",
      path: "/create"
    },
    {
      id: "tokens",
      icon: "💎",
      label: "Tokens",
      path: "/tokens",
      badge: $userTokenCount
    },
    {
      id: "profile",
      icon: "👤",
      label: "Profile",
      path: "/profile"
    }
  ];
  $$unsubscribe_userTokenCount();
  $$unsubscribe_activeTab();
  return `<nav class="fixed bottom-0 left-0 right-0 bg-bg-mid border-t-2 border-cyan px-4 py-3 z-50"><div class="flex justify-around items-center max-w-md mx-auto">${each(tabs, (tab) => {
    return `<button class="${["nav-button svelte-dj4m9t", $activeTab === tab.id ? "active" : ""].join(" ").trim()}"${add_attribute("aria-label", tab.label, 0)}><div class="relative"><span class="text-2xl svelte-dj4m9t">${escape(tab.icon)}</span> ${tab.badge ? `<span class="nav-badge svelte-dj4m9t">${escape(tab.badge)}</span>` : ``}</div> <span class="text-xs font-medium mt-1 svelte-dj4m9t">${escape(tab.label)}</span> </button>`;
  })}</div> </nav>`;
});
export {
  BottomNav as B,
  formatCurrency as a,
  currentUser as b,
  calculateEstimatedShare as c,
  distribution as d,
  connections as e,
  formatTimeAgo as f,
  userTokens as g,
  intentions as i,
  recentActivity as r,
  temple as t,
  userStats as u
};
