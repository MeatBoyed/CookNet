import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
