"use client";

import React from "react";
import ArrowFillButton from "@/components/ui/arrow-fill-button";

export default function ArrowFillButtonDemo() {
  return (
    <div className="flex min-h-64 w-full flex-col sm:flex-row items-center justify-center gap-6 p-8 bg-[#faf7f2]">
      {/* Caramel Cafe Theme */}
      <ArrowFillButton
        btnText="Explore Our Menu"
        href="/menu"
        bgColor="#c88242"
        textColor="#ffffff"
        fillBgColor="#ffffff"
        fillTextColor="#2b1810"
      />

      {/* Dark Espresso Theme */}
      <ArrowFillButton
        btnText="Book a Table"
        href="/booking"
        bgColor="#2b1810"
        textColor="#ffffff"
        fillBgColor="#c88242"
        fillTextColor="#ffffff"
      />
    </div>
  );
}
