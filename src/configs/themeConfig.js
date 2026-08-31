const themeConfig = {
  app: {
    name: "MORA",
  },
  // layout
  layout: {
    isRTL: false,
    darkMode: false,
    semiDarkMode: false,
    contentWidth: "full",
    type: "vertical",
    menu: {
      isCollapsed: false,
      isHidden: false,
    },
    mobileMenu: false,
    customizer: false,
  },
  colors: {
    primary: "#16A34A",
    secondary: "#166534",
    danger: "#DC2626",
    black: "#000000",
    warning: "#D4A72C",
    info: "#0891B2",
    light: "#64748B",
    success: "#16A34A",

    chart_grid_light: "#E2E8F0",
    chart_grid_dark: "#374151",
    chart_text_light: "#475569",
    chart_text_dark: "#CBD5E1",
  },
};

export default themeConfig;
