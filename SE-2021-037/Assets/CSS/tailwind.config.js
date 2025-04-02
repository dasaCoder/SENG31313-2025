tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#3498db",
        secondary: "#2980b9",
        dark: "#2c3e50",
        text: "#333",
        subtext: "#7f8c8d",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        rotate: "rotate 20s linear infinite",
        fadeInLeft: "fadeInLeft 1s forwards",
        fadeInRight: "fadeInRight 1s forwards",
      },
    },
  },
};
