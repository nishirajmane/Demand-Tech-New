"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProductProps {
  text?: string;
  href?: string;
  className?: string;
}

const ButtonProduct = ({
  text = "Learn More",
  href = "/",
  className = ""
}: ButtonProductProps) => {
  return (
    <Link href={href} className={`inline-block ${className}`}>
      <div className="group flex items-center justify-between bg-[#000cf8] hover:bg-[#0008d4] text-white px-4 py-2.5 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[120px]">
        <span className="text-sm font-medium font-clash">{text}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ButtonProduct;
