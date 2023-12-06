import type { Config } from 'tailwindcss';
import { radixThemePreset } from 'radix-themes-tw';

const spacingVariable = {
	'space-1': '4px',
	'space-2': '8px',
	'space-3': '12px',
	'space-4': '16px',
	'space-5': '24px',
	'space-6': '32px',
	'space-7': '40px',
	'space-8': '48px',
	'space-9': '64px'
};

const config: Config = {
	darkMode: 'media',
	presets: [radixThemePreset],
	safelist: ['bg-greenA-3', 'text-greenA-11', 'bg-redA-3', 'text-redA-11', 'stroke-redA-11', 'stroke-greenA-11'],
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontSize: {
				1.1: ['12px', '24px']
			},
			gap: spacingVariable,
			padding: spacingVariable,
			margin: spacingVariable,
			width: spacingVariable,
			height: spacingVariable
		}
	},
	plugins: []
};
export default config;
