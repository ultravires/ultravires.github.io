import Typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`
const hexToRgb = (hex) => {
  hex = hex.replace('#', '')
  hex = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

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
              textUnderlineOffset: '6px',
              color: theme('colors.red[700]'),
              '&:visited': {
                color: theme('colors.red[800]')
              },
              '&:hover': {
                color: theme('colors.red[500]')
              },
            },
            h1: {
              position: 'relative',
            },
            h2: {
              position: 'relative',
            },
            h3: {
              position: 'relative',
            },
            h4: {
              position: 'relative',
            },
            h5: {
              position: 'relative',
            },
            h6: {
              position: 'relative',
            },
            'div[class*=language-].line-numbers-mode': {
              paddingLeft: em(32, 16)
            },
            '.line-numbers-wrapper': {
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: em(32, 16),
              textAlign: 'center',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              color: 'var(--tw-prose-counters)',
              borderRadius: rem(6)
            },
            'a.header-anchor': {
              position: 'absolute',
              left: 0,
              marginLeft: em(-12, 14),
              '&::before': {
                content: '#'
              }
            },
            '.custom-block.danger': {
              backgroundColor: 'rgb(var(--tw-prose-block-danger-bg) / .3)',
              borderRadius: rem(6),
            }
          }
        },
        sm: {
          css: [
            {
              '[class~="line-numbers-wrapper"]': {
                fontSize: em(12, 14),
                lineHeight: round(20 / 12),
                paddingTop: em(8, 12),
                paddingBottom: em(8, 12),
              },
              '[class~="line-number"]': {
                fontSize: em(12, 14)
              }
            }
          ]
        },
        base: {
          css: [
            {
              '[class~="line-numbers-wrapper"]': {
                fontSize: em(14, 16),
                lineHeight: round(24 / 14),
                paddingTop: em(12, 14),
                paddingBottom: em(12, 14),
              }
            },
            {
              '[class~="line-number"]': {
                fontSize: em(14, 16)
              }
            }
          ]
        },
        lg: {
          css: [
            {
              '[class~="line-numbers-wrapper"]': {
                fontSize: em(16, 18),
                lineHeight: round(28 / 16),
                paddingTop: em(16, 16),
                paddingBottom: em(16, 16),
              }
            },
            {
              '[class~="line-number"]': {
                fontSize: em(16, 18),
              }
            }
          ]
        },
        xl: {
          css: [
            {
              '[class~="line-numbers-wrapper"]': {
                fontSize: em(18, 20),
                lineHeight: round(32 / 18),
                paddingTop: em(20, 18),
                paddingBottom: em(20, 18),
              }
            },
            {
              '[class~="line-number"]': {
                fontSize: em(18, 20),
              }
            }
          ]
        },
        '2xl': {
          css: [
            {
              '[class~="line-numbers-wrapper"]': {
                fontSize: em(20, 24),
                lineHeight: round(36 / 20),
                paddingTop: em(24, 20),
                paddingBottom: em(24, 20),
              }
            },
            {
              '[class~="line-number"]': {
                fontSize: em(20, 24),
              }
            }
          ]
        },
        neutral: {
          css: {
            '--tw-prose-pre-bg': colors.neutral[50],
            '--tw-prose-invert-pre-bg': colors.neutral[950]
          }
        },

        // Invert (for dark mode)
        invert: {
          css: {
            '--tw-prose-block-danger-bg': hexToRgb(colors.red[600])
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