import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@/styles/globals.css";
import { DirectionProvider } from "@/components/foundations/direction/direction";
import App from "@/App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemento #root não encontrado no HTML.");
}

createRoot(container).render(
  <StrictMode>
    <DirectionProvider locale="pt-BR">
      <App />
    </DirectionProvider>
  </StrictMode>,
);
