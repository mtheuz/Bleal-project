import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// ================================
// 🔹 Carrega APENAS os pesos essenciais no início
//    (somente o que aparece acima da dobra)
// ================================
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/oswald/400.css";


if (typeof requestIdleCallback !== "undefined") {
  requestIdleCallback(() => {
    import("@fontsource/be-vietnam-pro/600.css");
    import("@fontsource/be-vietnam-pro/700.css");
    import("@fontsource/oswald/200.css");
    import("@fontsource/oswald/700.css");
  });
} else {
  setTimeout(() => {
    import("@fontsource/be-vietnam-pro/600.css");
    import("@fontsource/be-vietnam-pro/700.css");
    import("@fontsource/oswald/200.css");
    import("@fontsource/oswald/700.css");
  }, 0);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
