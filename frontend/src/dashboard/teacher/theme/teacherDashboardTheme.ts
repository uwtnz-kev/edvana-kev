export const teacherDashboardTheme = {
  layout: {
    page: "teacher-theme h-screen overflow-hidden bg-[var(--bg-page)]",
    shell:
      "teacher-dashboard-shell flex h-full w-full flex-col overflow-hidden",
    shellSpacing: "",
    contentSurface:
      "teacher-content-surface flex-1 min-w-0 min-h-0 w-0 overflow-y-auto",
  },
  surfaces: {
    navbar: "teacher-topbar-surface sticky top-0 z-50 w-full",
    sidebar:
      "teacher-sidebar-surface fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-hidden rounded-r-2xl transition-all duration-300 lg:static lg:top-0 lg:h-full lg:rounded-none",
    card:
      "teacher-panel-surface teacher-panel-hover-lift rounded-2xl p-6",
    cardCompact:
      "teacher-panel-surface teacher-panel-hover-lift rounded-xl p-4",
    headerCard:
      "teacher-panel-surface rounded-2xl px-6 py-5",
    toolbarCard:
      "teacher-panel-surface teacher-panel-hover rounded-2xl p-4",
    statCard:
      "teacher-stat-surface teacher-panel-hover-lift rounded-2xl p-4",
    emptyCard:
      "teacher-panel-surface rounded-2xl p-8 text-center",
    insetCard:
      "rounded-xl border border-[var(--card-border)] bg-white/[0.02] transition-colors duration-200 hover:bg-white/[0.04]",
  },
  nav: {
    mobileToggle:
      "rounded-xl border border-[var(--card-border)] bg-[var(--sidebar-bg)] text-[var(--text-primary)] shadow-[var(--card-shadow)] hover:bg-[var(--sidebar-item-hover)] lg:hidden",
    item:
      "group relative flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-[var(--sidebar-text)] transition-all duration-200 hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--sidebar-text-active)]",
    itemActive:
      "bg-[var(--sidebar-item-active)] text-[var(--sidebar-text-active)] shadow-[inset_0_0_0_1px_rgba(88,166,255,0.12)]",
    itemSub:
      "group relative flex items-center gap-3 rounded-lg border border-transparent px-4 py-2 text-sm text-[var(--sidebar-text)] transition-all duration-200 hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--sidebar-text-active)]",
    itemSubActive:
      "bg-[var(--sidebar-item-active)] text-[var(--sidebar-text-active)] shadow-[inset_0_0_0_1px_rgba(88,166,255,0.12)]",
  },
  text: {
    primary: "text-[var(--text-primary)]",
    secondary: "text-[var(--text-secondary)]",
    muted: "text-[var(--text-muted)]",
    accent: "text-[var(--accent-primary)]",
  },
  accents: {
    brand:
      "bg-gradient-to-br from-[#30363d] via-[#21262d] to-[#161b22] text-[var(--accent-primary)]",
    badge:
      "border border-[rgba(241,196,15,0.2)] bg-[rgba(241,196,15,0.12)] text-[var(--text-primary)]",
  },
} as const;
