import { useMemo } from 'react';

const stateColors = {
  comparing: {
    bg: 'linear-gradient(180deg, #ffffff, #c4b5fd)',
    glow: '0 0 16px rgba(255,255,255,0.6)',
  },
  swapping: {
    bg: 'linear-gradient(180deg, #f87171, #dc2626)',
    glow: '0 0 16px rgba(239,68,68,0.6)',
  },
  sorted: {
    bg: 'linear-gradient(180deg, #34d399, #059669)',
    glow: '0 0 12px rgba(16,185,129,0.4)',
  },
  pivot: {
    bg: 'linear-gradient(180deg, #fbbf24, #d97706)',
    glow: '0 0 14px rgba(245,158,11,0.5)',
  },
};

export default function Visualizer({ array, states, colors }) {
  const maxVal = useMemo(() => Math.max(...array, 1), [array]);

  return (
    <div className="glass rounded-2xl p-5 overflow-hidden">
      <div className="flex items-end justify-center gap-px h-[420px] rounded-xl bg-dark-900/50 p-3 overflow-hidden">
        {array.map((val, i) => {
          const state = states.get(i) || 'default';
          const h = (val / maxVal) * 100;
          const sc = stateColors[state];

          return (
            <div
              key={i}
              data-state={state}
              className="flex-1 rounded-t-[3px] min-w-[1px]"
              style={{
                height: `${h}%`,
                background: sc
                  ? sc.bg
                  : colors[i % colors.length],
                boxShadow: sc
                  ? sc.glow
                  : `0 0 6px ${colors[i % colors.length]?.replace('rgb', 'rgba').replace(')', ',0.2)') || 'transparent'}`,
                transition: 'height 0.06s ease-out',
                transformOrigin: 'bottom center',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
