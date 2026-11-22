import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Trajectory } from "@/components/sections/trajectory";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Engineering } from "@/components/sections/engineering";
import { Contact } from "@/components/sections/contact";

export default function App() {
  return (
    <div className="min-h-dvh bg-background-full">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-lg focus:bg-background-primary-default focus:px-4 focus:py-2.5 focus:text-body-medium focus:text-text-primary focus:ring-2 focus:ring-border-focus-ring"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Trajectory />
        <Projects />
        <Stack />
        <Engineering />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
