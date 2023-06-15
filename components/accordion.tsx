"use client";

import React, { ReactNode } from "react";
import { styled, keyframes } from "@stitches/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const AccordionContent = styled(AccordionPrimitive.Content, {
  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const Accordion = ({
  items,
  open,
  setOpen,
}: {
  items: { trigger: ReactNode; content: ReactNode }[];
  open: number;
  setOpen: (index: number) => void;
}) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      className="w-full"
      defaultValue={open.toString()}
      onValueChange={(value) => setOpen(Number(value))}
    >
      {items.map(({ trigger, content }, index) => (
        <AccordionPrimitive.Item
          key={index}
          value={index.toString()}
          className="overflow-hidden border-b shadow-md border-neutral-400 last:border-none"
        >
          <AccordionPrimitive.Header className="flex justify-between items-center p-3">
            <AccordionPrimitive.Trigger className="group flex w-full items-center py-3 justify-between">
              {trigger}
              <ChevronDown
                aria-hidden
                className="h-5 w-5 text-gray-600 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
                style={{
                  transform: open === index ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
                }}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent>{content}</AccordionContent>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};

export default Accordion;
