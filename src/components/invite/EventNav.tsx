import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
}

export function EventNav({ items, onNavigate }: { items: NavItem[]; onNavigate: (id: string) => void }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const btn = listRef.current?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    const list = listRef.current;
    if (btn && list) {
      list.scrollTo({ left: btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Wedding events"
      className="sticky top-0 z-30 border-b border-gold/30 bg-background/80 backdrop-blur-md"
    >
      <div ref={listRef} className="no-scrollbar mx-auto flex max-w-3xl gap-1 overflow-x-auto px-3 py-2 sm:justify-center">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            data-nav={it.id}
            aria-current={active === it.id ? "true" : undefined}
            onClick={() => onNavigate(it.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 font-display text-base whitespace-nowrap transition-all",
              active === it.id
                ? "bg-gold-gradient text-gold-foreground shadow-gold"
                : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
