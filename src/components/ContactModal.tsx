import { FormEvent, useEffect, useState } from 'react';
import { Check, Copy, Mail, X } from 'lucide-react';
import { CONTACT_LINKS } from '../data/portfolio';

interface ContactModalProps {
  isOpen: boolean;
  initialSubject?: string;
  onClose: () => void;
}

export function ContactModal({
  isOpen,
  initialSubject = '',
  onClose,
}: ContactModalProps) {
  const emailEntry = CONTACT_LINKS.find((item) => item.id === 'email');
  const recipientEmail = emailEntry?.value ?? 'hello@yuhalfata.example';

  const [name, setName] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSubject(initialSubject);
  }, [initialSubject]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedSubject = subject.trim() || 'Project Collaboration Inquiry';
  const formattedBody = [
    name.trim() ? `From: ${name.trim()}` : '',
    message.trim() || 'Hello Muhammad Yuhal Fata, I would like to discuss a project.',
  ]
    .filter(Boolean)
    .join('\n\n');

  const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(
    formattedSubject
  )}&body=${encodeURIComponent(formattedBody)}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoUrl;
  };

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${recipientEmail}\nSubject: ${formattedSubject}\n\n${formattedBody}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#191A18]/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#F5F4EF] border border-[#DAD9D2] text-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DAD9D2]">
          <span className="font-mono text-xs text-[#777771]">
            Direct Inquiry
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry dialog"
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-[#171717] hover:bg-[#ECEBE4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
          <div>
            <h3
              id="contact-modal-title"
              className="font-display text-2xl font-semibold tracking-tight text-[#171717]"
            >
              Start a conversation
            </h3>
            <p className="text-sm text-[#777771] mt-1">
              Compose a note to launch in your mail client or copy the draft directly.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block font-mono text-xs text-[#777771] mb-1.5"
              >
                Your Name
              </label>
              <input
                id="inquiry-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nadia Rahman"
                className="w-full bg-[#ECEBE4] border border-[#DAD9D2] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#777771]/70 focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-subject"
                className="block font-mono text-xs text-[#777771] mb-1.5"
              >
                Topic
              </label>
              <input
                id="inquiry-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Network infrastructure, automation, or collaboration"
                className="w-full bg-[#ECEBE4] border border-[#DAD9D2] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#777771]/70 focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="block font-mono text-xs text-[#777771] mb-1.5"
              >
                Message
              </label>
              <textarea
                id="inquiry-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a brief overview of what you are working on..."
                className="w-full bg-[#ECEBE4] border border-[#DAD9D2] px-3.5 py-2.5 text-sm text-[#171717] placeholder:text-[#777771]/70 focus:outline-none focus:border-[#171717] resize-y"
              />
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#DAD9D2]">
            <button
              type="button"
              onClick={handleCopyDetails}
              className="inline-flex items-center gap-2 border border-[#DAD9D2] bg-[#ECEBE4] hover:border-[#171717] px-4 py-2.5 text-xs font-mono text-[#171717] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Draft</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Draft</span>
                </>
              )}
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#171717] text-[#F5F4EF] hover:bg-[#2c2d2a] px-5 py-2.5 text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Open Email Client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
