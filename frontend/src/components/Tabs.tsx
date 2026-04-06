import { useRef } from "react";

interface Tab {
  key: string;
  label: string;
  sublabel?: string;
}

interface Props {
  tabs: Tab[];
  selected: string;
  onSelect: (key: string) => void;
}

export default function Tabs({ tabs, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    const startX = e.pageX;
    const scrollLeft = el.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const walk = (e.pageX - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="
        cursor-pointer flex flex-row gap-1 py-2
        overflow-x-auto scrollbar-hide
        active:cursor-grabbing
        touch-pan-x scroll-smooth
        select-none
      "
    >
      {tabs.map((tab) => {
        const isActive = selected === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={`
              shrink-0 px-4 py-2 rounded-lg border transition-all duration-200 text-left
              ${
                isActive
                  ? "border-[#00c896] bg-[#0d2e23]"
                  : "border-[#1e1e1e] hover:border-[#00c896] hover:bg-[#1a1a1a]"
              }
            `}
          >
            <span className="block text-sm font-semibold text-gray-400">
              {tab.label}
            </span>

            {tab.sublabel && (
              <span className="block text-xs font-bold text-[#00c896] mt-0.5">
                {tab.sublabel}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
