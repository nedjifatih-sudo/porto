import { DiagramType } from '../data/portfolio';

interface ProjectDiagramProps {
  type: DiagramType;
  className?: string;
}

export function ProjectDiagram({ type, className = '' }: ProjectDiagramProps) {
  return (
    <div
      className={`w-full h-full bg-[#ECEBE4] border border-[#DAD9D2] overflow-hidden flex items-center justify-center ${className}`}
    >
      {type === 'ftth' && <FtthDiagram />}
      {type === 'genieacs' && <GenieAcsDiagram />}
      {type === 'pcc' && <PccDiagram />}
      {type === 'automation' && <AutomationDiagram />}
      {type === 'inventory' && <InventoryDiagram />}
    </div>
  );
}

function GridBackdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#DAD9D2" strokeWidth="0.65" />
        </pattern>
      </defs>
      <rect width="480" height="320" fill={`url(#${id})`} opacity="0.85" />
    </>
  );
}

function FtthDiagram() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="w-full h-full"
      role="img"
      aria-label="FTTH GPON optical access topology diagram"
    >
      <GridBackdrop id="grid-ftth" />
      {/* Signal lines */}
      <path d="M 96 160 L 164 160" stroke="#171717" strokeWidth="1.5" />
      <path d="M 244 160 L 292 160 L 292 90 L 336 90" stroke="#171717" strokeWidth="1.35" fill="none" />
      <path d="M 244 160 L 336 160" stroke="#171717" strokeWidth="1.35" fill="none" />
      <path d="M 244 160 L 292 160 L 292 230 L 336 230" stroke="#171717" strokeWidth="1.35" fill="none" />

      {/* MikroTik / PPPoE */}
      <rect x="28" y="132" width="78" height="56" fill="#F5F4EF" stroke="#171717" strokeWidth="1.25" />
      <rect x="28" y="132" width="5" height="56" fill="#B7F36B" />
      <text x="70" y="157" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        PPPoE
      </text>
      <text x="70" y="172" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        VLAN Trunk
      </text>

      {/* OLT */}
      <rect x="164" y="128" width="80" height="64" fill="#171717" />
      <text x="204" y="157" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#F5F4EF">
        OLT
      </text>
      <text x="204" y="173" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#B7F36B">
        GPON PON
      </text>

      {/* ODP Splitters & ONT Nodes */}
      {[
        { y: 90, label: 'ODP-01 → ONT' },
        { y: 160, label: 'ODP-02 → ONT' },
        { y: 230, label: 'ODP-03 → ONT' },
      ].map((node) => (
        <g key={node.label}>
          <rect
            x="336"
            y={node.y - 20}
            width="112"
            height="40"
            fill="#F5F4EF"
            stroke="#171717"
            strokeWidth="1.15"
          />
          <text
            x="392"
            y={node.y + 4}
            textAnchor="middle"
            fontSize="10"
            fontFamily="IBM Plex Mono, monospace"
            fill="#171717"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function GenieAcsDiagram() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="w-full h-full"
      role="img"
      aria-label="GenieACS TR-069 centralized ONT management diagram"
    >
      <GridBackdrop id="grid-genie" />
      {/* Bidirectional CWMP lines */}
      <line x1="168" y1="160" x2="296" y2="92" stroke="#171717" strokeWidth="1.25" />
      <line x1="168" y1="160" x2="296" y2="160" stroke="#171717" strokeWidth="1.25" />
      <line x1="168" y1="160" x2="296" y2="228" stroke="#171717" strokeWidth="1.25" />

      {/* Linux ACS Server */}
      <rect x="38" y="96" width="130" height="128" fill="#171717" />
      <rect x="38" y="96" width="130" height="6" fill="#B7F36B" />
      <text x="103" y="132" textAnchor="middle" fontSize="11.5" fontFamily="IBM Plex Mono, monospace" fill="#F5F4EF">
        GenieACS
      </text>
      <text x="103" y="151" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="#B7F36B">
        TR-069 / CWMP
      </text>
      <line x1="56" y1="168" x2="150" y2="168" stroke="#363834" strokeWidth="1" />
      <text x="103" y="186" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#A6A69E">
        NBI · Mongo · UI
      </text>
      <text x="103" y="203" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#A6A69E">
        Linux Host
      </text>

      {/* Managed CPE / ONT devices */}
      {[
        { y: 72, title: 'ONT Endpoint A', sub: 'Preset · Inform' },
        { y: 140, title: 'ONT Endpoint B', sub: 'WAN · PPPoE' },
        { y: 208, title: 'ONT Endpoint C', sub: 'Params · Sync' },
      ].map((item) => (
        <g key={item.title}>
          <rect
            x="296"
            y={item.y}
            width="144"
            height="42"
            fill="#F5F4EF"
            stroke="#171717"
            strokeWidth="1.15"
          />
          <text x="312" y={item.y + 18} fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
            {item.title}
          </text>
          <text x="312" y={item.y + 32} fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
            {item.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function PccDiagram() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="w-full h-full"
      role="img"
      aria-label="MikroTik PCC load balancing packet flow diagram"
    >
      <GridBackdrop id="grid-pcc" />
      {/* Traffic ingress to PCC classifier */}
      <line x1="94" y1="160" x2="158" y2="160" stroke="#171717" strokeWidth="1.5" />
      {/* Split to WAN 1 & WAN 2 */}
      <path d="M 278 144 L 312 144 L 312 104 L 348 104" stroke="#171717" strokeWidth="1.35" fill="none" />
      <path d="M 278 176 L 312 176 L 312 216 L 348 216" stroke="#171717" strokeWidth="1.35" fill="none" />

      {/* LAN Ingress */}
      <rect x="28" y="134" width="66" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="61" y="164" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        LAN
      </text>

      {/* PCC Classifier */}
      <rect x="158" y="114" width="120" height="92" fill="#171717" />
      <rect x="158" y="114" width="120" height="5" fill="#B7F36B" />
      <text x="218" y="148" textAnchor="middle" fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill="#F5F4EF">
        MikroTik PCC
      </text>
      <text x="218" y="166" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#B7F36B">
        Mangle · 2-Stream
      </text>
      <text x="218" y="184" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#A6A69E">
        QoS &amp; Route Mark
      </text>

      {/* WAN Gateways */}
      <rect x="348" y="78" width="102" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="399" y="102" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        ISP Gateway A
      </text>
      <text x="399" y="117" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        Route Mark 01
      </text>

      <rect x="348" y="190" width="102" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="399" y="214" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        ISP Gateway B
      </text>
      <text x="399" y="229" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        Route Mark 02
      </text>
    </svg>
  );
}

function AutomationDiagram() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="w-full h-full"
      role="img"
      aria-label="n8n workflow automation and AI agent pipeline diagram"
    >
      <GridBackdrop id="grid-auto" />
      <line x1="126" y1="160" x2="178" y2="160" stroke="#171717" strokeWidth="1.4" />
      <path d="M 294 146 L 326 146 L 326 106 L 352 106" stroke="#171717" strokeWidth="1.3" fill="none" />
      <path d="M 294 174 L 326 174 L 326 214 L 352 214" stroke="#171717" strokeWidth="1.3" fill="none" />

      {/* Trigger */}
      <rect x="34" y="132" width="92" height="56" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="80" y="157" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        Telegram
      </text>
      <text x="80" y="172" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        Webhook Input
      </text>

      {/* n8n + AI Agent */}
      <rect x="178" y="114" width="116" height="92" fill="#171717" />
      <rect x="178" y="114" width="5" height="92" fill="#B7F36B" />
      <text x="236" y="148" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#F5F4EF">
        n8n Engine
      </text>
      <text x="236" y="166" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#B7F36B">
        AI Agent Router
      </text>
      <text x="236" y="184" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#A6A69E">
        API Transform
      </text>

      {/* Outputs */}
      <rect x="352" y="80" width="96" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="400" y="104" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        Google Sheets
      </text>
      <text x="400" y="118" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        Structured Log
      </text>

      <rect x="352" y="188" width="96" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="400" y="212" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        Bot Reply
      </text>
      <text x="400" y="226" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        Status Action
      </text>
    </svg>
  );
}

function InventoryDiagram() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="w-full h-full"
      role="img"
      aria-label="Digital inventory management Supabase and RLS schema diagram"
    >
      <GridBackdrop id="grid-inv" />
      <line x1="168" y1="160" x2="216" y2="160" stroke="#171717" strokeWidth="1.35" />
      <path d="M 326 144 L 352 144 L 352 106 L 372 106" stroke="#171717" strokeWidth="1.25" fill="none" />
      <path d="M 326 176 L 352 176 L 352 214 L 372 214" stroke="#171717" strokeWidth="1.25" fill="none" />

      {/* Web Client + Auth */}
      <rect x="34" y="118" width="134" height="84" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="101" y="148" textAnchor="middle" fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        Web Application
      </text>
      <line x1="50" y1="160" x2="152" y2="160" stroke="#DAD9D2" strokeWidth="1" />
      <text x="101" y="177" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#777771">
        Supabase Auth · RBAC
      </text>

      {/* RLS Boundary */}
      <rect x="216" y="114" width="110" height="92" fill="#171717" />
      <rect x="216" y="114" width="110" height="5" fill="#B7F36B" />
      <text x="271" y="152" textAnchor="middle" fontSize="10.5" fontFamily="IBM Plex Mono, monospace" fill="#F5F4EF">
        PostgreSQL
      </text>
      <text x="271" y="170" textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#B7F36B">
        RLS Policy Guard
      </text>

      {/* Tables */}
      <rect x="372" y="80" width="80" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="412" y="110" textAnchor="middle" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        items
      </text>

      <rect x="372" y="188" width="80" height="52" fill="#F5F4EF" stroke="#171717" strokeWidth="1.2" />
      <text x="412" y="218" textAnchor="middle" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="#171717">
        audit_logs
      </text>
    </svg>
  );
}
