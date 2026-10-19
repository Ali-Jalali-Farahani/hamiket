'use client'

import {createTheme} from "@mui/material/styles";
import {PaletteColorOptions} from "@mui/material";

declare module "@mui/material/styles" {
    interface TypographyVariants {
        bodyXl: React.CSSProperties;
        bodyL: React.CSSProperties;
        bodyM: React.CSSProperties;
        bodyS: React.CSSProperties;
        bodyXs: React.CSSProperties;
    }
    interface Palette {
        customColors: Record<string, string>;
    }
    interface PaletteOptions {
        customColors?: Record<string, string>;
    }
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        bodyXl?: React.CSSProperties;
        bodyL: React.CSSProperties;
        bodyM: React.CSSProperties;
        bodyS: React.CSSProperties;
        bodyXs: React.CSSProperties;
    }
    interface PaletteOptions {
        blue?: PaletteColorOptions;
    }
    interface Theme {
        customColors: Record<string, string>;
    }

    interface LinearProgressPropsColorOverrides {
        blue: PaletteColorOptions;
    }
}
declare module "@mui/material/LinearProgress" {
    interface LinearProgressPropsColorOverrides {
        blue: true;
    }
}
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        bodyXl: true;
        bodyL: true;
        bodyM: true;
        bodyS: true;
        bodyXs: true;
        h3: true;
    }
}

const theme = createTheme({
  components: {
  },
});

export default theme