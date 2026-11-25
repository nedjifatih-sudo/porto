import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import {
  CONTACT_LINKS,
  EDUCATION,
  EXPERIENCES,
  EXPERTISE_GROUPS,
  PRINCIPLES,
  ProjectCategory,
  ProjectItem,
  PROJECTS,
  SITE_CONFIG,
} from './data/portfolio';
import { Navbar } from './components/Navbar';
import { TopologyGraphic } from './components/TopologyGraphic';
import { PortraitFrame } from './components/PortraitFrame';
import { ProjectDiagram } from './components/ProjectDiagram';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { Reveal } from './components/Reveal';

const PROJECT_FILTERS: ProjectCategory[] = [
  'All',
  'Networking & FTTH',
  'Systems & Automation',
  'Web & Data',
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const handleOpenInquiry = (topic = '') => {
    setContactSubject(topic);
    setContactOpen(true);
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#171717] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-14 md:pt-16">
        {/* SECTION 02 — HERO */}
        <section
          id="index"
          className="border-b border-[#DAD9D2]"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Typographic Column */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-10">
                <div className="space-y-6 md:space-y-8">
                  <p className="font-mono text-xs text-[#777771] tracking-wide">
                    {SITE_CONFIG.eyebrow}
                  </p>

                  <h1
                    id="hero-heading"
                    className="font-display font-semibold text-[#171717] tracking-[-0.03em] leading-[1.03] text-[clamp(2.35rem,4.9vw,4.35rem)] text-balance"
                  >
                    Connecting ideas.
                    <br />
                    Building systems.
                    <br />
                    Making technology work.
                  </h1>

                  <p className="text-base md:text-lg text-[#777771] leading-relaxed max-w-xl">
                    {SITE_CONFIG.heroSubhead}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2.5 bg-[#171717] text-[#F5F4EF] hover:bg-[#B7F36B] hover:text-[#171717] px-6 py-3.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
                    >
                      <span>Explore Selected Work</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 border border-[#DAD9D2] hover:border-[#171717] bg-transparent text-[#171717] px-6 py-3.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
                    >
                      <span>Get in Touch</span>
                    </a>
                  </div>

                  <div className="pt-6 border-t border-[#DAD9D2] flex flex-wrap items-center justify-between gap-4">
                    <p className="font-mono text-xs text-[#777771]">
                      Network Infrastructure · IT Systems · Automation
                    </p>
                    <a
                      href="#about"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#171717] hover:text-[#777771] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Scroll</span>
                      <ArrowDown className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Interactive Architectural Visual */}
              <div className="lg:col-span-5 flex">
                <TopologyGraphic />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03 — ABOUT / INTRODUCTION */}
        <section
          id="about"
          className="border-b border-[#DAD9D2]"
          aria-labelledby="about-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
                <div className="lg:col-span-7 space-y-8">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
                    <span className="tabular-nums text-[#171717]">01</span>
                    <span aria-hidden="true">/</span>
                    <span>About</span>
                  </div>

                  <h2
                    id="about-heading"
                    className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.12] text-[#171717] text-balance max-w-2xl"
                  >
                    Technology is more interesting when everything connects.
                  </h2>

                  <div className="space-y-5 text-base md:text-[17px] text-[#777771] leading-[1.7] max-w-2xl">
                    <p>
                      My work and interests sit at the intersection of network
                      infrastructure, systems engineering, and digital technology.
                    </p>
                    <p>
                      From configuring network environments to exploring automation
                      and developing practical digital products, I enjoy
                      understanding how systems work and finding ways to make them
                      better.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-[#DAD9D2] grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <p className="font-mono text-xs text-[#777771] mb-1.5">
                        Positioning
                      </p>
                      <p className="text-sm text-[#171717] leading-relaxed">
                        {SITE_CONFIG.positioning}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#777771] mb-1.5">
                        Location
                      </p>
                      <p className="text-sm text-[#171717]">
                        {SITE_CONFIG.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 lg:col-start-9">
                  <PortraitFrame />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 04 — EXPERTISE */}
        <section
          id="expertise"
          className="border-b border-[#DAD9D2]"
          aria-labelledby="expertise-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#DAD9D2]">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
                    <span className="tabular-nums text-[#171717]">02</span>
                    <span aria-hidden="true">/</span>
                    <span>What I Work With</span>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <h2
                    id="expertise-heading"
                    className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#171717] text-balance"
                  >
                    Core technical disciplines across networking, infrastructure,
                    automation, and software.
                  </h2>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 border-b border-[#DAD9D2]">
              {EXPERTISE_GROUPS.map((group, idx) => (
                <Reveal
                  key={group.index}
                  delay={idx * 0.05}
                  className={`py-10 md:py-12 ${
                    idx % 2 === 0
                      ? 'md:pr-12 md:border-r md:border-[#DAD9D2]'
                      : 'md:pl-12'
                  } ${idx < 2 ? 'md:border-b md:border-[#DAD9D2]' : ''}`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-6">
                    <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[#171717]">
                      {group.title}
                    </h3>
                    <span className="font-mono text-xs text-[#777771] tabular-nums">
                      {group.index}
                    </span>
                  </div>

                  <ul className="divide-y divide-[#DAD9D2]/70 border-t border-[#DAD9D2]/70">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="py-3 text-sm md:text-[15px] text-[#171717] flex items-center justify-between gap-4"
                      >
                        <span>{item}</span>
                        <span className="font-mono text-[11px] text-[#777771]" aria-hidden="true">
                          —
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 05 — SELECTED WORK */}
        <section
          id="projects"
          className="border-b border-[#DAD9D2]"
          aria-labelledby="projects-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#DAD9D2]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
                    <span className="tabular-nums text-[#171717]">03</span>
                    <span aria-hidden="true">/</span>
                    <span>Selected Work</span>
                  </div>
                  <h2
                    id="projects-heading"
                    className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#171717] text-balance"
                  >
                    Things I&apos;ve worked on and explored.
                  </h2>
                </div>

                {/* Interactive category filter */}
                <div
                  role="tablist"
                  aria-label="Filter projects by discipline"
                  className="flex flex-wrap items-center gap-1.5 bg-[#ECEBE4] border border-[#DAD9D2] p-1"
                >
                  {PROJECT_FILTERS.map((filter) => {
                    const active = activeFilter === filter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1.5 text-xs font-mono transition-colors duration-150 whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#171717] text-[#F5F4EF]'
                            : 'text-[#777771] hover:text-[#171717]'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="divide-y divide-[#DAD9D2]">
              {filteredProjects.map((project, idx) => (
                <Reveal key={project.id} delay={idx * 0.04}>
                  <article className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group">
                    {/* Architectural Visual Schematic */}
                    <div
                      className={`lg:col-span-6 ${
                        idx % 2 === 1 ? 'lg:order-2' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Inspect architecture diagram for ${project.title}`}
                        className="block w-full text-left overflow-hidden border border-[#DAD9D2] bg-[#ECEBE4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
                      >
                        <div className="aspect-[16/10] w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                          <ProjectDiagram
                            type={project.diagramType}
                            className="border-0"
                          />
                        </div>
                      </button>
                    </div>

                    {/* Editorial Copy */}
                    <div
                      className={`lg:col-span-6 space-y-5 ${
                        idx % 2 === 1 ? 'lg:order-1 lg:pr-6' : 'lg:pl-6'
                      }`}
                    >
                      <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
                        <span className="tabular-nums text-[#171717]">
                          Project {project.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#171717]">
                        {project.title}
                      </h3>

                      <p className="text-base text-[#777771] leading-relaxed max-w-xl">
                        {project.description}
                      </p>

                      <p className="font-mono text-xs text-[#171717] pt-1">
                        {project.tags.join(' / ')}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-5">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] editorial-underline py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
                        >
                          <span>Inspect Architecture</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </button>

                        {project.externalUrl && (
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#777771] hover:text-[#171717] transition-colors"
                          >
                            <span>Reference</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 06 — EXPERIENCE & JOURNEY */}
        <section
          id="experience"
          className="border-b border-[#DAD9D2]"
          aria-labelledby="experience-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
                    <span className="tabular-nums text-[#171717]">04</span>
                    <span aria-hidden="true">/</span>
                    <span>Experience</span>
                  </div>
                  <h2
                    id="experience-heading"
                    className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#171717] text-balance"
                  >
                    Practical experience &amp; academic foundation.
                  </h2>
                </div>

                <div className="lg:col-span-8 space-y-14">
                  {/* Minimalist vertical timeline */}
                  <div className="relative border-t border-[#DAD9D2]">
                    {EXPERIENCES.map((item) => (
                      <div
                        key={`${item.year}-${item.title}`}
                        className="py-8 border-b border-[#DAD9D2] grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline"
                      >
                        <div className="sm:col-span-3 flex items-center gap-3">
                          <span
                            className="w-2 h-2 bg-[#171717] shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-mono text-sm font-medium text-[#171717] tabular-nums">
                            {item.year}
                          </span>
                        </div>
                        <div className="sm:col-span-9 space-y-2">
                          <h3 className="font-display text-lg md:text-xl font-semibold text-[#171717]">
                            {item.title}
                          </h3>
                          <p className="font-mono text-xs text-[#777771]">
                            {item.role}
                          </p>
                          <p className="text-sm md:text-base text-[#777771] leading-relaxed pt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div className="bg-[#ECEBE4] border border-[#DAD9D2] p-6 md:p-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline">
                    <div className="sm:col-span-3">
                      <span className="font-mono text-xs text-[#777771]">
                        Education
                      </span>
                    </div>
                    <div className="sm:col-span-9 space-y-1.5">
                      <h3 className="font-display text-lg md:text-xl font-semibold text-[#171717]">
                        {EDUCATION.institution}
                      </h3>
                      <p className="text-sm md:text-base text-[#777771]">
                        {EDUCATION.degree}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 07 — APPROACH (DARK SECTION) */}
        <section
          aria-labelledby="approach-heading"
          className="bg-[#191A18] text-[#F5F4EF]"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
            <Reveal>
              <div className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#2E302C]">
                  <div className="lg:col-span-4">
                    <span className="font-mono text-xs text-[#A6A69E] tracking-wide">
                      Engineering Philosophy
                    </span>
                  </div>
                  <div className="lg:col-span-8">
                    <h2
                      id="approach-heading"
                      className="font-display text-3xl md:text-4xl lg:text-[2.85rem] font-semibold tracking-tight leading-[1.12] text-[#F5F4EF] text-balance"
                    >
                      Good technology should work quietly in the background.
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                  {PRINCIPLES.map((principle) => (
                    <div
                      key={principle.index}
                      className="pt-6 border-t border-[#2E302C] space-y-4"
                    >
                      <span className="block font-mono text-xs text-[#B7F36B] tabular-nums">
                        {principle.index}
                      </span>
                      <h3 className="font-display text-xl font-semibold tracking-wide text-[#F5F4EF]">
                        {principle.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#A6A69E] leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 08 — CONTACT */}
        <section
          id="contact"
          className="border-b border-[#DAD9D2]"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
                    <span className="tabular-nums text-[#171717]">05</span>
                    <span aria-hidden="true">/</span>
                    <span>Contact</span>
                  </div>

                  <h2
                    id="contact-heading"
                    className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-[#171717] text-balance"
                  >
                    Have something interesting in mind?
                  </h2>

                  <p className="text-base md:text-lg text-[#777771] leading-relaxed max-w-lg">
                    I&apos;m always interested in meaningful collaborations,
                    technical challenges, and opportunities to build something
                    useful.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenInquiry('')}
                      className="inline-flex items-center gap-2.5 bg-[#171717] text-[#F5F4EF] hover:bg-[#B7F36B] hover:text-[#171717] px-6 py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
                    >
                      <span>Let&apos;s Talk</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Links Matrix */}
                <div className="lg:col-span-6 border-t border-[#DAD9D2]">
                  {CONTACT_LINKS.map((item) => (
                    <div
                      key={item.id}
                      className="py-5 border-b border-[#DAD9D2] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <span className="block font-mono text-xs text-[#777771]">
                          {item.label}
                          {item.isPlaceholder ? ' · Placeholder' : ''}
                        </span>
                        <a
                          href={item.href}
                          target={item.id === 'email' ? undefined : '_blank'}
                          rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                          className="text-base font-medium text-[#171717] hover:underline underline-offset-4"
                        >
                          {item.value}
                        </a>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {item.id === 'email' ? (
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(item.value)}
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#171717] border border-[#DAD9D2] hover:border-[#171717] px-3 py-1.5 transition-colors"
                          >
                            {copiedEmail ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${item.label} profile`}
                            className="inline-flex items-center gap-1 font-mono text-xs text-[#777771] hover:text-[#171717] transition-colors"
                          >
                            <span>Visit</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#F5F4EF] text-[#171717]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 md:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs">
            <span className="font-medium text-[#171717]">
              {SITE_CONFIG.fullName} © {SITE_CONFIG.copyrightYear}
            </span>
            <span className="hidden sm:inline text-[#DAD9D2]" aria-hidden="true">
              /
            </span>
            <span className="text-[#777771]">{SITE_CONFIG.footerTagline}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#171717] hover:text-[#777771] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(topic) => handleOpenInquiry(topic)}
      />

      <ContactModal
        isOpen={contactOpen}
        initialSubject={contactSubject}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
