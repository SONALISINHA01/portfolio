import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import DSAStats from "@/components/DSAStats";
import OpenSource from "@/components/OpenSource";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <DSAStats />
        <OpenSource />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
