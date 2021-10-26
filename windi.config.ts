import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: {
    blocklist: ['svg'],
  },
  theme: {
    extend: {
      colors: {
        'menu-main': '#f5f6f7',
        'menu-sub': '#f7f8f9',
        'menu-lit': '#ebebeb',
        'menu-txt': '#bfcbd9',
        'menu-txt-active': '#409eff',
        'login-main': '#283443',
        'login-gray-light': '#eee',
        'login-gray-dark': '#889aa4',
        'login-cursor': '#fff',
      },
      transitionProperty: {
        w: 'width',
        ml: 'margin-left',
      },
    },
  },
  shortcuts: {
    'w-aside-open': 'w-210px',
    'w-aside-collapse': 'w-54px',
    'ml-aside-open': 'ml-210px',
    'ml-aside-collapse': 'ml-54px',
  },
})
