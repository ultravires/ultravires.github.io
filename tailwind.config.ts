import Typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/.vitepress/theme/**/*.{js,ts,vue}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--web-color-primary) / <alpha-value>)',
        reverse: 'rgb(var(--web-color-reverse) / <alpha-value>)',
        black: 'rgb(var(--web-color-black) / <alpha-value>)',
        white: 'rgb(var(--web-color-white) / <alpha-value>)',
      },
      letterSpacing: {
        '1': '0em',
        '2': '0.025em',
        '3': '0.05em',
        '4': '0.1em',
        '5': '0.125em',
        '6': '0.15em',
        '7': '0.175em',
        '8': '0.2em'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            pre: {
              code: {
                padding: 0
              }
            },
            a: {
              color: theme('colors.red[700]'),
              '&:visited': {
                color: theme('colors.red[800]')
              },
              '&:hover': {
                color: theme('colors.red[500]')
              }
            }
          }
        }
      })
    },
  },
  plugins: [
    Typography({
      target: 'modern',
      className: 'prose'
    })
  ],
}