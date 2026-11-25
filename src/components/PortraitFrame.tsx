import { useState } from 'react';
import { SITE_CONFIG } from '../data/portfolio';

export function PortraitFrame() {
  const [imgFailed, setImgFailed] = useState(false);
  const hasPortrait = Boolean(SITE_CONFIG.portraitUrl) && !imgFailed;

  return (
    <figure className="w-full">
      <div className="relative aspect-[4/5] w-full bg-[#ECEBE4] border border-[#DAD9D2] overflow-hidden">
        {hasPortrait ? (
          <img
            src={SITE_CONFIG.portraitUrl}
            alt={SITE_CONFIG.portraitAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover grayscale contrast-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-8 select-none">
            {/* Top metadata */}
            <div className="flex items-center justify-between font-mono text-xs text-[#777771]">
              <span>Portrait Frame</span>
              <span className="tabular-nums">01 : 1.25</span>
            </div>

            {/* Center Swiss architectural monogram */}
            <div className="relative flex-1 flex items-center justify-center my-4">
              <svg
                viewBox="0 0 240 280"
                className="w-full max-w-[210px] h-auto"
                role="img"
                aria-label="Editorial portrait placeholder frame for Muhammad Yuhal Fata"
              >
                <rect
                  x="16"
                  y="16"
                  width="208"
                  height="248"
                  fill="none"
                  stroke="#DAD9D2"
                  strokeWidth="1"
                />
                <line x1="16" y1="140" x2="224" y2="140" stroke="#DAD9D2" strokeWidth="1" />
                <line x1="120" y1="16" x2="120" y2="264" stroke="#DAD9D2" strokeWidth="1" />
                <circle
                  cx="120"
                  cy="110"
                  r="40"
                  fill="#F5F4EF"
                  stroke="#171717"
                  strokeWidth="1.25"
                />
                <path
                  d="M 56 232 C 56 186, 184 186, 184 232"
                  fill="#F5F4EF"
                  stroke="#171717"
                  strokeWidth="1.25"
                />
                <rect x="102" y="182" width="36" height="6" fill="#B7F36B" />
              </svg>
            </div>

            {/* Bottom note */}
            <div className="pt-4 border-t border-[#DAD9D2] flex items-center justify-between font-mono text-xs text-[#777771]">
              <span>{SITE_CONFIG.fullName}</span>
              <span>Portrait Slot</span>
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-between font-mono text-xs text-[#777771]">
        <span>{SITE_CONFIG.location}</span>
        <span>Profile · Replaceable via config</span>
      </figcaption>
    </figure>
  );
}
