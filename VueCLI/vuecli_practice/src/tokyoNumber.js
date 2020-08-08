export const tokyoNumber = {
  data() {
    return {
      title: "Welcome to Tokyo",
      number: 0,
    };
  },
  filters: {
    lowerCase(value) {
      return value.toLowerCase();
    },
  },
};
