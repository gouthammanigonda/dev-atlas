// ── Ant Design Theme Bridge ────────────────────────────────────────────────────
// Maps Ant Design ConfigProvider tokens directly to our CSS variables.
// By passing the var(--...) string directly, Ant Design natively generates 
// CSS that responds immediately to theme changes without requiring React re-renders.

export function getAntdTheme() {
  return {
    token: {
      colorPrimary:        "var(--color-primary)",
      colorBgBase:         "var(--bg-primary)",
      colorBgContainer:    "var(--bg-card)",
      colorBgElevated:     "var(--bg-card)",
      colorBorder:         "var(--border-color)",
      colorText:           "var(--text-primary)",
      colorTextSecondary:  "var(--text-secondary)",
      colorTextTertiary:   "var(--text-muted)",
      colorSuccess:        "var(--color-success)",
      colorWarning:        "var(--color-warning)",
      colorError:          "var(--color-danger)",
      colorInfo:           "var(--color-info)",
      colorLink:           "var(--color-primary)",
      colorLinkHover:      "var(--color-primary-hover)",
      controlHeightLG:     56,
      borderRadius:        8,
      fontFamily:          "var(--font-body)",
    },
    components: {
      Input: {
        colorBgContainer: "var(--input-bg)",
        colorBorder: "var(--input-border)",
        colorTextPlaceholder: "var(--input-placeholder)",
        colorText: "var(--input-text)",
        colorPrimaryHover: "var(--input-focus-border)",
        controlOutline: "var(--input-focus-ring)",
      },
      Select: {
        colorBgContainer: "var(--input-bg)",
        colorBorder: "var(--input-border)",
        colorTextPlaceholder: "var(--input-placeholder)",
        colorText: "var(--input-text)",
        colorPrimaryHover: "var(--input-focus-border)",
        controlOutline: "var(--input-focus-ring)",
        colorIcon: "var(--input-icon)",
        colorIconHover: "var(--input-icon)",
        controlItemBgActive: "var(--bg-hover)",
        controlItemBgHover: "var(--bg-hover)",
      },
      AutoComplete: {
        colorBgContainer: "var(--input-bg)",
        colorBorder: "var(--input-border)",
        colorTextPlaceholder: "var(--input-placeholder)",
        colorText: "var(--input-text)",
        controlItemBgActive: "var(--bg-hover)",
        controlItemBgHover: "var(--bg-hover)",
      },
      Dropdown: {
        colorBgElevated: "var(--bg-card)",
        controlItemBgHover: "var(--bg-hover)",
        controlItemBgActive: "var(--bg-hover)",
      },
      Tag: {
        colorBgContainer: "var(--bg-hover)",
        colorBorder: "var(--border-color)",
      },
      Badge: {
        colorError: "var(--badge-bg)",
        colorTextLightSolid: "var(--badge-text)",
      },
      Tooltip: {
        colorBgDefault: "var(--bg-hover)",
        colorTextLightSolid: "var(--text-primary)",
      },
      Popover: {
        colorBgElevated: "var(--bg-card)",
      },
      Modal: {
        colorBgElevated: "var(--bg-card)",
        colorTextHeading: "var(--text-primary)",
      },
      Button: {
        colorBgContainer: "var(--bg-card)",
        colorBorder: "var(--border-color)",
        colorText: "var(--text-primary)",
        colorPrimaryHover: "var(--color-primary-hover)",
      },
      Empty: {
        colorTextDisabled: "var(--text-muted)",
      },
      Timeline: {
        colorSplit: "var(--border-color)",
      },
      Divider: {
        colorSplit: "var(--border-color)",
      },
    },
  };
}
