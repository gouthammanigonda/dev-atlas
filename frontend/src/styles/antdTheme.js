import colors from "./colors";
import radius from "./radius";
import typography from "./typography";

export const antdTheme = {
  token: {
    colorPrimary: colors.primary,

    colorBgBase: colors.background.primary,

    colorBgContainer: colors.background.secondary,

    colorBorder: colors.border.primary,

    colorText: colors.text.primary,

    colorTextSecondary: colors.text.secondary,

    borderRadius: radius.md,

    fontFamily: typography.fontFamily,
  },
};