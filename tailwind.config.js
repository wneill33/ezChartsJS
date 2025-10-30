module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./examples/**/*.{ts,tsx,html}"],
  theme: { extend: {} },
  corePlugins: { preflight: false }, // let consumers control reset
};
