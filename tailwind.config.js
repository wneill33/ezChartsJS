module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  corePlugins: { preflight: false }, // let consumers control reset
};
