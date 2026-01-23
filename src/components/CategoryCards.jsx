/*import React from "react";

export default function CategoryCards({ onSelect }) {
  const items = [
    {
      category: "ENGINEERING",
      image: "data:image/jpeg;base64,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",
    },
    {
  
      category: "ARTS",
      image: "/images/image.png",
    },
    {
      category: "MEDICAL",
      image: "/images/medical.png",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {items.map((item) => (
        <div
          key={item.category}
          onClick={() => onSelect(item.category)}
          className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl transition p-4 text-center"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-56 w-full object-cover rounded-xl"
          />
          <h3 className="mt-4 text-xl font-bold">
            {item.title}
          </h3>
        </div>
      ))}
    </div>
  );
}
*/
import React from "react";
import { DraggableCardBody, DraggableCardContainer } from "./ui/draggable-card";

export default function CategoryCards({ onSelect }) {
  const items = [
    {
      category: "ENGINEERING",
      title: "Engineering",
      image: "/images/eng.jpg",
      className: "absolute top-5 left-[15%] rotate-[-5deg]",
    },
    {
      category: "ARTS",
      title: "Art College",
      image: "/images/arts.jpg",
      className: "absolute top-10 left-[40%] rotate-[3deg]",
    },
    {
      category: "MEDICAL",
      title: "Medical",
      image: "/images/medical.png",
      className: "absolute top-5 right-[15%] rotate-[6deg]",
    },
  ];

  return (
    <div className="w-full h-[450px] mb-10 overflow-visible relative">
      <DraggableCardContainer className="relative w-full h-full flex items-center justify-center">
        {/* Background Text Hint */}
        <p className="absolute top-1/2 -translate-y-1/2 text-neutral-200 text-6xl font-black uppercase pointer-events-none select-none">
          Pick a Category
        </p>

        {items.map((item) => (
          <DraggableCardBody 
            key={item.category} 
            className={`${item.className} cursor-grab active:cursor-grabbing`}
          >
            <div 
              onClick={() => onSelect(item.category)}
              className="bg-white p-3 rounded-2xl shadow-2xl border border-neutral-100 group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none h-64 w-64 object-cover rounded-xl transition-transform group-hover:scale-[1.02]"
              />
              <h3 className="mt-4 text-center text-2xl font-black text-neutral-800 tracking-tight">
                {item.title}
              </h3>
              <div className="mt-1 text-center text-xs text-neutral-400 font-medium">
                DRAG TO EXPLORE
              </div>
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </div>
  );
}