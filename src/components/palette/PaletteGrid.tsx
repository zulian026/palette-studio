"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { PaletteColor } from "@/types/palette";

import { DraggableColorBlock } from "@/components/palette/DraggableColorBlock";

type PaletteGridProps = {
  colors: PaletteColor[];

  selectedColorId: string | null;

  onReorder: (activeId: string, overId: string) => void;

  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleLock: (id: string) => void;
  onRename: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onAddColor: () => void;
};

export function PaletteGrid({
  colors,
  selectedColorId,

  onReorder,
  onSelect,
  onEdit,
  onToggleLock,
  onRename,
  onDuplicate,
  onDelete,
  onAddColor,
}: PaletteGridProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) {
      return;
    }

    onReorder(String(active.id), String(over.id));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={colors.map((color) => color.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div
          className="
            grid
            grid-cols-1
            overflow-hidden
            rounded-[20px]
            border
            border-black/10
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {colors.map((color, index) => (
            <DraggableColorBlock
              key={color.id}
              color={color}
              index={index}
              isSelected={selectedColorId === color.id}
              onSelect={() => onSelect(color.id)}
              onEdit={() => onEdit(color.id)}
              onToggleLock={() => onToggleLock(color.id)}
              onRename={() => onRename(color.id)}
              onDuplicate={() => onDuplicate(color.id)}
              onDelete={() => onDelete(color.id)}
              canDelete={colors.length > 1}
            />
          ))}

          {/* ADD COLOR */}

          <button
            type="button"
            onClick={onAddColor}
            className="
              flex
              min-h-[230px]
              items-center
              justify-center
              border-t
              border-black/10
              bg-white
              text-black/30
              transition-all
              duration-200
              hover:bg-black/[0.02]
              hover:text-black
              sm:min-h-[440px]
              sm:border-l
              lg:border-t-0
            "
          >
            <span
              className="
                flex
                flex-col
                items-center
                gap-2
              "
            >
              <span
                className="
                  text-2xl
                  font-light
                "
              >
                +
              </span>

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                "
              >
                Add color
              </span>
            </span>
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
}
