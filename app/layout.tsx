import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/muiConfig";

export const metadata: Metadata = {
  title: "Hamiket",
  description: "Hamiket",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="h-full flex flex-col">
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>

    </html>
  );
}
