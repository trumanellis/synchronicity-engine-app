/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Lila Gold Color Scheme
				cyan: {
					DEFAULT: '#c38017', // Warm gold (primary accent)
					glow: 'rgba(195, 128, 23, 0.4)',
					bg: 'rgba(195, 128, 23, 0.08)',
					border: 'rgba(195, 128, 23, 0.3)'
				},
				gold: {
					DEFAULT: '#bf96b7', // Dusty rose/mauve (secondary accent)
					glow: 'rgba(191, 150, 183, 0.5)',
					bg: 'rgba(191, 150, 183, 0.1)',
					border: 'rgba(191, 150, 183, 0.4)'
				},
				sage: {
					DEFAULT: '#266087' // Deep blue (tertiary)
				},
				cream: {
					DEFAULT: '#c0846a' // Warm terracotta (text)
				},
				bg: {
					deep: '#20422d', // Dark forest green
					mid: '#5a6b2e', // Olive green
					front: '#2d5a3a' // Medium forest green
				}
			},
			fontFamily: {
				exo: ['Exo', 'sans-serif']
			},
			boxShadow: {
				'glow-cyan': '0 0 40px rgba(195, 128, 23, 0.4)', // Warm gold glow
				'glow-gold': '0 0 20px rgba(191, 150, 183, 0.5)', // Dusty rose glow
				'glow-cyan-lg': '0 0 60px rgba(195, 128, 23, 0.5)',
				'glow-gold-lg': '0 0 30px rgba(191, 150, 183, 0.6)'
			}
		}
	},
	plugins: []
};
