"use client";

import type { TestimonialsSectionProps } from "@/types/sections";

export default function TestimonialsSection(props: TestimonialsSectionProps) {
  const { heading, subheading, testimonials = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 text-center">
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial._key} className="flex flex-col gap-4 p-6 border rounded-lg">
                <p className="text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                <div className="font-medium">{testimonial.name}</div>
                {testimonial.title && <div className="text-sm text-muted-foreground">{testimonial.title}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

