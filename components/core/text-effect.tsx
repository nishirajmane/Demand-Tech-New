"use client";

import React from "react";
import { motion, type Variants as FMVariants } from "framer-motion";

type Variants = {
  container?: FMVariants;
  item?: FMVariants;
};

interface TextEffectProps {
  per?: "line"; // currently only line is supported
  as?: "p" | "div" | "h1" | "h2" | "h3" | "span";
  segmentWrapperClassName?: string;
  variants?: Variants;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const defaultVariants: Variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  },
};

function splitLines(content: React.ReactNode): React.ReactNode[] {
  // If content is a plain string, split on newlines
  if (typeof content === "string") {
    return content.split(/\r?\n/).map((line, idx) => (
      <React.Fragment key={idx}>{line}</React.Fragment>
    ));
  }
  // If content is an array of nodes, treat each entry as a line
  if (Array.isArray(content)) {
    return content as React.ReactNode[];
  }
  // Otherwise, treat entire node as a single line
  return [content];
}

export function TextEffect({
  per = "line",
  as = "p",
  segmentWrapperClassName = "overflow-hidden block",
  variants = defaultVariants,
  className,
  children,
}: TextEffectProps) {
  const motionMap = {
    p: motion.p,
    div: motion.div,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    span: motion.span,
  } as const;
  const Comp = motionMap[as] ?? motion.p;

  const lines = per === "line" ? splitLines(children) : [children];

  return (
    <Comp
      className={className}
      variants={variants.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {lines.map((line, i) => (
        <span key={i} className={segmentWrapperClassName}>
          <motion.span style={{ display: "inline-block", willChange: "transform" }} variants={variants.item}>
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

export default TextEffect;
