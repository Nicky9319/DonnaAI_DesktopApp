import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, 'main.js') // Explicitly define the entry point
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      lib: {
        entry: resolve(__dirname, 'preload.js') // Explicitly define the entry point
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, 'src'),
        '@widget': resolve(__dirname, 'src/widget')
      }
    },
    plugins: [tailwindcss(), react()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html')
        }
      }
    },
    server: {
      port: 5173,
      fs: {
        allow: [resolve(__dirname, 'src')]
      }
    }
  },
  widget: {
    resolve: {
      alias: {
        '@widget': resolve(__dirname, 'src/widget')
      }
    },
    plugins: [tailwindcss(), react()],
    build: {
      rollupOptions: {
        input: {
          widget: resolve(__dirname, 'src/widget/index.html')
        }
      }
    },
    server: {
      port: 5174,
      fs: {
        allow: [resolve(__dirname, 'src')]
      }
    }
  },
  setup: {
    resolve: {
      alias: {
        '@setup': resolve(__dirname, 'src/setup')
      }
    },
    plugins: [tailwindcss(), react()],
    build: {
      rollupOptions: {
        input: {
          setup: resolve(__dirname, 'src/setup/index.html')
        }
      }
    },
    server: {
      port: 5175,
      fs: {
        allow: [resolve(__dirname, 'src')]
      }
    }
  }
})
