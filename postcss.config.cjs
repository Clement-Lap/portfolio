module.exports = {
	plugins: [
		require("autoprefixer"),
		require("cssnano"),
		require("@csstools/postcss-global-data")({ files: ["./src/styles/media.pcss"] }),
		require("postcss-custom-media"),
		require("postcss-preset-env")
	]
};
