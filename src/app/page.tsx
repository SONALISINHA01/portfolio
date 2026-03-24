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
import SectionDivider from "@/components/SectionDivider";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>
        <SectionDivider viaColor="rgba(124, 58, 237, 0.15)" />
        <ErrorBoundary sectionName="About">
          <About />
        </ErrorBoundary>
        <SectionDivider viaColor="rgba(6, 182, 212, 0.15)" />
        <ErrorBoundary sectionName="Projects">
          <Projects />
        </ErrorBoundary>
        <SectionDivider viaColor="rgba(124, 58, 237, 0.12)" />
        <ErrorBoundary sectionName="DSA Stats">
          <DSAStats />
        </ErrorBoundary>
        <SectionDivider viaColor="rgba(236, 72, 153, 0.12)" />
        <ErrorBoundary sectionName="Open Source">
          <OpenSource />
        </ErrorBoundary>
        <SectionDivider viaColor="rgba(6, 182, 212, 0.12)" />
        <ErrorBoundary sectionName="Certifications">
          <Certifications />
        </ErrorBoundary>
        <SectionDivider viaColor="rgba(124, 58, 237, 0.1)" />
        <ErrorBoundary sectionName="Contact">
          <Contact />
        </ErrorBoundary>
      </main>
    </>
  );
}
