"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { PaletteColor } from "@/types/palette";

import { ColorBlock } from "@/components/palette/ColorBlock";

type DraggableColorBlockProps = {
  color: PaletteColor;
  index: number;

  isSelected: boolean;

  onSelect: () => void;
  onEdit: () => void;
  onToggleLock: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;

  canDelete: boolean;
};

export function DraggableColorBlock({
  color,
  index,
  isSelected,
  onSelect,
  onEdit,
  onToggleLock,
  onRename,
  onDuplicate,
  onDelete,
  canDelete,
}: DraggableColorBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: color.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative" {...attributes}>
      <ColorBlock
        color={color.hex}
        name={color.name}
        index={index}
        locked={color.locked}
        isSelected={isSelected}
        onSelect={onSelect}
        onEdit={onEdit}
        onToggleLock={onToggleLock}
        onRename={onRename}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        canDelete={canDelete}
      />

      {/* Drag handle */}
      <button
        type="button"
        {...listeners}
        aria-label={`Drag ${color.name}`}
        className="
          absolute
          left-1/2
          top-2
          z-40
          h-1
          w-10
          -translate-x-1/2
          cursor-grab
          rounded-full
          bg-black/10
          opacity-0
          transition-opacity
          group-hover:opacity-100
          active:cursor-grabbing
        "
      />
    </div>
  );
}
