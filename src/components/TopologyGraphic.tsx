import { useState } from 'react';

interface TopologyNode {
  id: string;
  label: string;
  layer: string;
  detail: string;
  x: number;
  y: number;
  connections: string[];
}

const NODES: TopologyNode[] = [
  {
    id: 'wan',
    label: 'WAN / Uplink',
    layer: 'Layer 01 · Transit',
    detail: 'Dual-path upstream transit, IP routing, and link redundancy.',
    x: 92,
    y: 78,
    connections: ['core'],
  },
  {
    id: 'core',
    label: 'RouterOS Core',
    layer: 'Layer 02 · Routing & Policy',
    detail: 'Packet classification, VLAN segmentation, PPPoE concentration, and QoS.',
    x: 248,
    y: 162,
    connections: ['wan', 'olt', 'systems', 'automation'],
  },
  {
    id: 'olt',
    label: 'OLT / GPON',
    layer: 'Layer 03 · Optical Access',
    detail: 'Fiber distribution via ODP splitters to managed ONT endpoints.',
    x: 416,
    y: 94,
    connections: ['core', 'ont'],
  },
  {
    id: 'ont',
    label: 'ONT / TR-069',
    layer: 'Layer 04 · Edge Provisioning',
    detail: 'Centralized CWMP parameter control and subscriber connectivity via GenieACS.',
    x: 432,
    y: 266,
    connections: ['olt', 'systems'],
  },
  {
    id: 'systems',
    label: 'Linux & Docker',
    layer: 'Layer 03 · Infrastructure Host',
    detail: 'Containerized network services, monitoring tools, and relational data stores.',
    x: 248,
    y: 332,
    connections: ['core', 'ont', 'automation'],
  },
  {
    id: 'automation',
    label: 'Automation & APIs',
    layer: 'Layer 04 · Orchestration',
    detail: 'Event-driven n8n pipelines, messaging bots, and practical workflow tooling.',
    x: 92,
    y: 274,
    connections: ['core', 'systems'],
  },
];

const EDGES: Array<[string, string]> = [
  ['wan', 'core'],
  ['core', 'olt'],
  ['olt', 'ont'],
  ['core', 'systems'],
  ['systems', 'ont'],
  ['core', 'automation'],
  ['automation', 'systems'],
];

export function TopologyGraphic() {
  const [activeId, setActiveId] = useState<string>('core');
  const activeNode = NODES.find((n) => n.id === activeId) ?? NODES[1];

  const isEdgeActive = (a: string, b: string) =>
    a === activeId || b === activeId;

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#ECEBE4] border border-[#DAD9D2] p-5 md:p-7">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#DAD9D2]">
        <span className="font-mono text-xs text-[#777771]">
          System Topology Schematic
        </span>
        <span className="font-mono text-xs text-[#171717] tabular-nums">
          06 Nodes · Interactive
        </span>
      </div>

      <div className="relative my-4 flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 520 400"
          className="w-full h-auto max-h-[380px]"
          role="img"
          aria-label="Interactive network topology and systems architecture schematic"
        >
          {/* Architectural coordinate grid */}
          <defs>
            <pattern
              id="swiss-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#DAD9D2"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect width="520" height="400" fill="url(#swiss-grid)" opacity="0.75" />

          {/* Outer technical frame markers */}
          <path
            d="M 24 44 L 24 24 L 44 24 M 476 24 L 496 24 L 496 44 M 24 356 L 24 376 L 44 376 M 476 376 L 496 376 L 496 356"
            fill="none"
            stroke="#777771"
            strokeWidth="1"
          />

          {/* Orthogonal architectural reference circle */}
          <circle
            cx="248"
            cy="196"
            r="134"
            fill="none"
            stroke="#DAD9D2"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Signal paths */}
          {EDGES.map(([fromId, toId]) => {
            const from = NODES.find((n) => n.id === fromId)!;
            const to = NODES.find((n) => n.id === toId)!;
            const active = isEdgeActive(fromId, toId);
            const midX = (from.x + to.x) / 2;
            const pathD = `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;

            return (
              <g key={`${fromId}-${toId}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={active ? '#171717' : '#C6C5BD'}
                  strokeWidth={active ? 1.75 : 1}
                  className="transition-colors duration-150"
                />
                {active && (
                  <circle
                    cx={midX}
                    cy={from.y}
                    r="2.5"
                    fill="#171717"
                  />
                )}
              </g>
            );
          })}

          {/* Interactive topology nodes */}
          {NODES.map((node) => {
            const isSelected = node.id === activeId;
            const isConnected = activeNode.connections.includes(node.id);

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setActiveId(node.id)}
                onClick={() => setActiveId(node.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(node.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${node.detail}`}
                className="cursor-pointer focus:outline-none"
              >
                {/* Invisible generous hit area */}
                <rect x="-58" y="-26" width="116" height="52" fill="transparent" />

                {/* Node box */}
                <rect
                  x="-54"
                  y="-18"
                  width="108"
                  height="36"
                  rx="2"
                  fill={isSelected ? '#171717' : '#F5F4EF'}
                  stroke={
                    isSelected
                      ? '#171717'
                      : isConnected
                        ? '#171717'
                        : '#9A9991'
                  }
                  strokeWidth={isSelected || isConnected ? 1.25 : 1}
                  className="transition-colors duration-150"
                />

                {/* Accent corner marker on selected node */}
                {isSelected && (
                  <rect x="-54" y="-18" width="6" height="36" fill="#B7F36B" />
                )}

                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={isSelected ? '#F5F4EF' : '#171717'}
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                  fontWeight={isSelected ? '500' : '400'}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active layer readout */}
      <div className="pt-4 border-t border-[#DAD9D2] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <p className="font-mono text-xs text-[#777771]">{activeNode.layer}</p>
          <p className="text-sm text-[#171717] mt-1">{activeNode.detail}</p>
        </div>
        <span className="font-mono text-xs text-[#777771] whitespace-nowrap shrink-0">
          Select node to inspect
        </span>
      </div>
    </div>
  );
}
