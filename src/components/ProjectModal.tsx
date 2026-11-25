import { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';
import { ProjectDiagram } from './ProjectDiagram';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (topic: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#191A18]/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F5F4EF] border border-[#DAD9D2] text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#F5F4EF]/95 border-b border-[#DAD9D2]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#777771]">
            <span className="tabular-nums text-[#171717]">Project {project.index}</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-[#171717] hover:bg-[#ECEBE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-10 space-y-8">
          <div className="aspect-[16/10] w-full">
            <ProjectDiagram type={project.diagramType} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <h3
                id="project-modal-title"
                className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#171717]"
              >
                {project.title}
              </h3>
              <p className="text-base text-[#171717] leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm text-[#777771] leading-relaxed">
                {project.scopeNote}
              </p>
            </div>

            <div className="md:col-span-5 space-y-6 md:border-l md:border-[#DAD9D2] md:pl-8">
              <div>
                <h4 className="font-mono text-xs text-[#777771] mb-3">
                  Architecture &amp; Scope
                </h4>
                <ul className="space-y-2.5 text-sm text-[#171717]">
                  {project.architectureFocus.map((point) => (
                    <li key={point} className="leading-snug flex gap-2.5">
                      <span className="font-mono text-xs text-[#777771] mt-0.5">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#777771] mb-2">
                  Technologies
                </h4>
                <p className="font-mono text-xs text-[#171717]">
                  {project.tags.join(' / ')}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DAD9D2] flex flex-wrap items-center justify-between gap-4">
            {project.externalUrl ? (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#171717] text-[#F5F4EF] px-5 py-2.5 text-sm font-medium hover:bg-[#2c2d2a] transition-colors"
              >
                <span>Open Documentation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const title = project.title;
                  onClose();
                  onInquire(title);
                }}
                className="inline-flex items-center gap-2 bg-[#171717] text-[#F5F4EF] px-5 py-2.5 text-sm font-medium hover:bg-[#2c2d2a] transition-colors"
              >
                <span>Discuss this project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#777771] hover:text-[#171717] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
