import { LangCircles } from "@/components/site-header";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 overflow-visible border-t border-line bg-ink/95 px-3 pt-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-center gap-6">
        <LangCircles />
      </div>
    </div>
  );
}
