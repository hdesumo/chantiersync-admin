import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#2563eb', // Bleu principal
      600: '#1d4ed8',
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#1e3a8a'
    }
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif"
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      }
    }
  }
});

export default theme;
