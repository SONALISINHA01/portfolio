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
import TableOfContents from "@/components/TableOfContents";
import ScrollRevealSection from "@/components/ScrollRevealSection";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <TableOfContents />
      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>
        <div style={{ marginBottom: "100px" }} />
        <SectionDivider viaColor="rgba(124, 58, 237, 0.15)" />

        <ScrollRevealSection gradientColor="rgba(124, 58, 237, 0.06)">
          <ErrorBoundary sectionName="About">
            <About />
          </ErrorBoundary>
        </ScrollRevealSection>
        <SectionDivider viaColor="rgba(6, 182, 212, 0.15)" />

        <ScrollRevealSection gradientColor="rgba(6, 182, 212, 0.05)">
          <ErrorBoundary sectionName="Projects">
            <Projects />
          </ErrorBoundary>
        </ScrollRevealSection>
        <SectionDivider viaColor="rgba(124, 58, 237, 0.12)" />

        <ScrollRevealSection gradientColor="rgba(245, 158, 11, 0.05)">
          <ErrorBoundary sectionName="DSA Stats">
            <DSAStats />
          </ErrorBoundary>
        </ScrollRevealSection>
        <SectionDivider viaColor="rgba(236, 72, 153, 0.12)" />

        <ScrollRevealSection gradientColor="rgba(236, 72, 153, 0.05)">
          <ErrorBoundary sectionName="Open Source">
            <OpenSource />
          </ErrorBoundary>
        </ScrollRevealSection>
        <SectionDivider viaColor="rgba(6, 182, 212, 0.12)" />

        <ScrollRevealSection gradientColor="rgba(124, 58, 237, 0.04)">
          <ErrorBoundary sectionName="Certifications">
            <Certifications />
          </ErrorBoundary>
        </ScrollRevealSection>
        <SectionDivider viaColor="rgba(124, 58, 237, 0.1)" />

        <ScrollRevealSection gradientColor="rgba(6, 182, 212, 0.04)">
          <ErrorBoundary sectionName="Contact">
            <Contact />
          </ErrorBoundary>
        </ScrollRevealSection>
      </main>
    </>
  );
}
