"use client";

import type { CasesSectionProps } from "@/types/sections";

export default function CasesSection(props: CasesSectionProps) {
  const { heading, subheading, cases = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 text-center">
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {cases.map((caseItem) => (
              <div key={caseItem._key} className="flex items-center justify-center p-4">
                {caseItem.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

