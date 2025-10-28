"use client";

import React, { useState } from "react";
import DemandGenerationPopup from "./DemandGenerationPopup";
import Button4 from "./Button4";

interface DemandGenerationSectionProps {
  title: string;
  imageSrc: string;
  triggerClassName?: string;
}

export default function DemandGenerationSection({
  title,
  imageSrc,
  triggerClassName
}: DemandGenerationSectionProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <>
      {/* Read More Button */}
      <div className={triggerClassName}>
        <Button4 label="Read More" onClick={handleOpenPopup} />
      </div>

      {/* Popup Modal */}
      <DemandGenerationPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={title}
        imageSrc={imageSrc}
      />
    </>
  );
}
