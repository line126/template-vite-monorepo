import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { react_convention_route } from 'react-convention-route';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), react_convention_route()],
});
