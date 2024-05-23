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
              color: theme('colors.blue[700]'),
              '&:visited': {
                color: theme('colors.blue[800]')
              },
              '&:hover': {
                color: theme('colors.blue[500]')
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
            '.custom-block': {
              '&.info': {
                backgroundColor: 'rgb(var(--tw-prose-block-info-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-info-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.warning': {
                backgroundColor: 'rgb(var(--tw-prose-block-warning-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-warning-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.tip': {
                backgroundColor: 'rgb(var(--tw-prose-block-tip-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-tip-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.danger': {
                backgroundColor: 'rgb(var(--tw-prose-block-danger-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-danger-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.details': {
                backgroundColor: 'rgb(var(--tw-prose-block-details-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-details-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.note': {
                backgroundColor: 'rgb(var(--tw-prose-block-note-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-note-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.caution': {
                backgroundColor: 'rgb(var(--tw-prose-block-caution-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-caution-border-color) / var(--tw-prose-block-bg-opacity))'
              },
              '&.important': {
                backgroundColor: 'rgb(var(--tw-prose-block-important-bg) / var(--tw-prose-block-bg-opacity))',
                borderRadius: rem(6),
                border: '1px solid rgb(var(--tw-prose-block-important-border-color) / var(--tw-prose-block-bg-opacity))'
              }
            },
            '.custom-block-title': {
              margin: 0,
            }
          }
        },
        sm: {
          css: [
            {
              '.line-numbers-wrapper': {
                fontSize: em(12, 14),
                lineHeight: round(20 / 12),
                paddingTop: em(8, 12),
                paddingBottom: em(8, 12),
              },
              '.line-number': {
                fontSize: em(12, 14)
              },
              '.custom-block': {
                fontSize: em(12, 14),
                lineHeight: round(20 / 12),
                marginTop: em(20, 12),
                marginBottom: em(20, 12),
                borderRadius: rem(4),
                paddingTop: em(8, 12),
                paddingInlineEnd: em(12, 12),
                paddingBottom: em(8, 12),
                paddingInlineStart: em(12, 12),
              },
              '.custom-block-title': {
                margin: 0,
              },
              '.custom-block p': {
                marginBottom: 0
              },
            }
          ]
        },
        base: {
          css: [
            {
              '.line-numbers-wrapper': {
                fontSize: em(14, 16),
                lineHeight: round(24 / 14),
                paddingTop: em(12, 14),
                paddingBottom: em(12, 14),
              },
              '.line-number': {
                fontSize: em(14, 16)
              },
              '.custom-block': {
                fontSize: em(14, 16),
                lineHeight: round(24 / 14),
                marginTop: em(24, 14),
                marginBottom: em(24, 14),
                borderRadius: rem(6),
                paddingTop: em(12, 14),
                paddingInlineEnd: em(16, 14),
                paddingBottom: em(12, 14),
                paddingInlineStart: em(16, 14),
              },
              '.custom-block-title': {
                margin: 0,
              },
              '.custom-block p': {
                marginBottom: 0
              },
            }
          ]
        },
        lg: {
          css: [
            {
              '.line-numbers-wrapper': {
                fontSize: em(16, 18),
                lineHeight: round(28 / 16),
                paddingTop: em(16, 16),
                paddingBottom: em(16, 16),
              },
              '.line-number': {
                fontSize: em(16, 18),
              },
              '.custom-block': {
                fontSize: em(16, 18),
                lineHeight: round(28 / 16),
                marginTop: em(32, 16),
                marginBottom: em(32, 16),
                borderRadius: rem(6),
                paddingTop: em(16, 16),
                paddingInlineEnd: em(24, 16),
                paddingBottom: em(16, 16),
                paddingInlineStart: em(24, 16),
              },
              '.custom-block-title': {
                margin: 0,
              },
              '.custom-block p': {
                marginBottom: 0
              },
            },
          ]
        },
        xl: {
          css: [
            {
              '.line-numbers-wrapper': {
                fontSize: em(18, 20),
                lineHeight: round(32 / 18),
                paddingTop: em(20, 18),
                paddingBottom: em(20, 18),
              },
              '.line-number': {
                fontSize: em(18, 20),
              },
              '.custom-block': {
                fontSize: em(18, 20),
                lineHeight: round(32 / 18),
                marginTop: em(36, 18),
                marginBottom: em(36, 18),
                borderRadius: rem(8),
                paddingTop: em(20, 18),
                paddingInlineEnd: em(24, 18),
                paddingBottom: em(20, 18),
                paddingInlineStart: em(24, 18),
              },
              '.custom-block-title': {
                margin: 0,
              },
              '.custom-block p': {
                marginBottom: 0
              },
            },
          ]
        },
        '2xl': {
          css: [
            {
              '.line-numbers-wrapper': {
                fontSize: em(20, 24),
                lineHeight: round(36 / 20),
                paddingTop: em(24, 20),
                paddingBottom: em(24, 20),
              },
              '.line-number': {
                fontSize: em(20, 24),
              },
              '.custom-block': {
                fontSize: em(20, 24),
                lineHeight: round(36 / 20),
                marginTop: em(40, 20),
                marginBottom: em(40, 20),
                borderRadius: rem(8),
                paddingTop: em(24, 20),
                paddingInlineEnd: em(32, 20),
                paddingBottom: em(24, 20),
                paddingInlineStart: em(32, 20),
              },
              '.custom-block-title': {
                margin: 0,
              },
              '.custom-block p': {
                marginBottom: 0
              },
            },
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
            '--tw-prose-block-bg-opacity': '.16',
            '--tw-prose-block-info-bg': hexToRgb(colors.slate[500]),
            '--tw-prose-block-info-border-color': hexToRgb(colors.slate[700]),
            '--tw-prose-block-warning-bg': hexToRgb(colors.orange[500]),
            '--tw-prose-block-warning-border-color': hexToRgb(colors.orange[700]),
            '--tw-prose-block-tip-bg': hexToRgb(colors.blue[500]),
            '--tw-prose-block-tip-border-color': hexToRgb(colors.blue[700]),
            '--tw-prose-block-danger-bg': hexToRgb(colors.red[700]),
            '--tw-prose-block-danger-border-color': hexToRgb(colors.red[500]),
            '--tw-prose-block-details-bg': hexToRgb(colors.slate[500]),
            '--tw-prose-block-details-border-color': hexToRgb(colors.slate[700]),
            '--tw-prose-block-note-bg': hexToRgb(colors.slate[500]),
            '--tw-prose-block-note-border-color': hexToRgb(colors.slate[700]),
            '--tw-prose-block-caution-bg': hexToRgb(colors.red[700]),
            '--tw-prose-block-caution-border-color': hexToRgb(colors.red[500]),
            '--tw-prose-block-important-bg': hexToRgb(colors.purple[700]),
            '--tw-prose-block-important-border-color': hexToRgb(colors.purple[500]),
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