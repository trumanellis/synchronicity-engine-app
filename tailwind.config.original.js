/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Synchronicity Engine Design System
				cyan: {
					DEFAULT: '#00FFD1',
					glow: 'rgba(0, 255, 209, 0.3)',
					bg: 'rgba(0, 255, 209, 0.05)',
					border: 'rgba(0, 255, 209, 0.3)'
				},
				gold: {
					DEFAULT: '#D4AF37',
					glow: 'rgba(212, 175, 55, 0.6)',
					bg: 'rgba(212, 175, 55, 0.1)',
					border: 'rgba(212, 175, 55, 0.5)'
				},
				sage: {
					DEFAULT: '#84A98C'
				},
				cream: {
					DEFAULT: '#F7F3E9'
				},
				bg: {
					deep: '#0a0e0f',
					mid: '#1a2e2e',
					front: '#0f1f1f'
				}
			},
			fontFamily: {
				exo: ['Exo', 'sans-serif']
			},
			boxShadow: {
				'glow-cyan': '0 0 40px rgba(0, 255, 209, 0.3)',
				'glow-gold': '0 0 20px rgba(212, 175, 55, 0.6)',
				'glow-cyan-lg': '0 0 60px rgba(0, 255, 209, 0.4)',
				'glow-gold-lg': '0 0 30px rgba(212, 175, 55, 0.8)'
			}
		}
	},
	plugins: []
};
