tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // Removed custom colors (such as primary: "#3498db" and dark: "#2c3e50")
      keyframes: {
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
        fadeInLeft: "fadeInLeft 1s forwards",
        fadeInRight: "fadeInRight 1s forwards",
      },
    },
  },
};
module.exports = tailwind.config;