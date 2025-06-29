import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      color: {
        black: "#111111",
        white: "#FFFFFF",
        gray: {
          100: "#303030",
          200: "#505050",
          300: "#767676",
          400: "#999999",
          500: "#D9D9D9",
          600: "#F4F4F6",
          700: "#F8F8FA",
          800: "#FAFAFB",
        },

        // 브랜드 컬러
        primary: "#E65787",
        secondary: {
          green: "#27998D",
          blue: "#6664E3",
        },

        // 기능별
        fileIcon: "#89A4BB",
        audioBar: "#007AFF",

        stroke: {
          100: "#D8DADC",
          200: "#E6E9EF",
        },

        system: {
          red: "#C83028",
        },

        backgroundDimmed: "rgba(0, 0, 0, 0.6)",
      },
      // 그라디언트
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg, rgba(230,87,135,0.7), #E65787)",
        "gradient-white":
          "linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"],
      },
      fontSize: {
        // Headline
        "headline-1": [
          "32px",
          { lineHeight: "42px", letterSpacing: "-0.025em" },
        ],
        "headline-2": [
          "28px",
          { lineHeight: "38px", letterSpacing: "-0.025em" },
        ],
        "headline-3": [
          "24px",
          { lineHeight: "34px", letterSpacing: "-0.025em" },
        ],
        "headline-4": [
          "20px",
          { lineHeight: "28px", letterSpacing: "-0.025em" },
        ],

        // Title
        "title-1": ["24px", { lineHeight: "34px", letterSpacing: "-0.025em" }],
        "title-2": ["20px", { lineHeight: "28px", letterSpacing: "-0.025em" }],
        "title-3": ["18px", { lineHeight: "26px", letterSpacing: "-0.025em" }],
        "title-4": ["16px", { lineHeight: "24px", letterSpacing: "-0.025em" }],

        // Body
        "body-1": ["15px", { lineHeight: "22px", letterSpacing: "-0.025em" }],
        "body-2": ["14px", { lineHeight: "20px", letterSpacing: "-0.025em" }],
        "body-3": ["13px", { lineHeight: "18px", letterSpacing: "-0.025em" }],
        "body-4": ["12px", { lineHeight: "18px", letterSpacing: "-0.025em" }],

        // Caption
        "caption-1": [
          "13px",
          { lineHeight: "18px", letterSpacing: "-0.025em" },
        ],
        "caption-2": [
          "12px",
          { lineHeight: "18px", letterSpacing: "-0.025em" },
        ],

        // Button
        "button-1": ["16px", { lineHeight: "24px", letterSpacing: "-0.025em" }],
        "button-2": ["14px", { lineHeight: "20px", letterSpacing: "-0.025em" }],
        "button-3": ["13px", { lineHeight: "18px", letterSpacing: "-0.025em" }],
      },
    },
  },
} satisfies Config;

export default config;
