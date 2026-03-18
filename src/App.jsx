import { useEffect, useMemo, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const SECTION_ORDER = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const hasNextSection = activeSectionIndex < SECTION_ORDER.length - 1;

  const nextSection = useMemo(
    () => (hasNextSection ? SECTION_ORDER[activeSectionIndex + 1] : null),
    [activeSectionIndex, hasNextSection],
  );

  useEffect(() => {
    const findClosestSectionToViewportCenter = () => {
      const viewportCenter = window.innerHeight / 2;

      const closestIndex = SECTION_ORDER.reduce((bestIndex, section, index) => {
        const node = document.getElementById(section.id);
        if (!node) {
          return bestIndex;
        }

        const rect = node.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const bestNode = document.getElementById(SECTION_ORDER[bestIndex].id);
        if (!bestNode) {
          return index;
        }

        const bestRect = bestNode.getBoundingClientRect();
        const bestCenter = bestRect.top + bestRect.height / 2;

        return Math.abs(sectionCenter - viewportCenter) < Math.abs(bestCenter - viewportCenter)
          ? index
          : bestIndex;
      }, 0);

      setActiveSectionIndex(closestIndex);
    };

    findClosestSectionToViewportCenter();
    window.addEventListener('scroll', findClosestSectionToViewportCenter, { passive: true });
    window.addEventListener('resize', findClosestSectionToViewportCenter);

    return () => {
      window.removeEventListener('scroll', findClosestSectionToViewportCenter);
      window.removeEventListener('resize', findClosestSectionToViewportCenter);
    };
  }, []);

  const goToNextSection = () => {
    if (!nextSection) {
      return;
    }

    document.getElementById(nextSection.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:28px_28px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_62%)]" aria-hidden="true" />

      <Navbar />
      <main className="relative z-10 mx-auto w-full px-4 pt-20 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>

      {hasNextSection && nextSection && (
        <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
          <Button
            variant="outline"
            className="rounded-full border-slate-700 bg-slate-900/85 backdrop-blur hover:border-cyan-400"
            onClick={goToNextSection}
          >
            <span className="text-xs uppercase tracking-wide text-slate-300">Next: {nextSection.label}</span>
            <ChevronDown className="h-4 w-4 text-cyan-300" />
          </Button>
        </div>
      )}
    </div>
  );
}
