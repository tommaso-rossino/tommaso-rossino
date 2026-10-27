import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { ChatWidget } from "@trossino/chat-widget";
import "@trossino/chat-widget/styles";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatWidget
        endpoint="/api/chat"
        title="Chatta con me"
        placeholder="Chiedimi qualcosa..."
        welcomeMessage="Ciao! Sono il sito di Tommaso, chiedimi pure qualsiasi cosa sul mio lavoro, le mie competenze o la mia esperienza."
      />
    </div>
  );
}
