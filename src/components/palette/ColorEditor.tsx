"use client";

import { useState } from "react";
import { Check, Copy, Lock, LockOpen, X } from "lucide-react";

import type { PaletteColor } from "@/types/palette";

type ColorEditorProps = {
  color: PaletteColor;
  onClose: () => void;
  onUpdate: (updates: Partial<PaletteColor>) => void;
  onToggleLock: () => void;
};

export function ColorEditor({
  color,
  onClose,
  onUpdate,
  onToggleLock,
}: ColorEditorProps) {
  const [draft, setDraft] = useState({
    hex: color.hex,
    name: color.name,
  });

  const [prevColorId, setPrevColorId] = useState(color.id);

  if (color.id !== prevColorId) {
    setPrevColorId(color.id);

    setDraft({
      hex: color.hex,
      name: color.name,
    });
  }

  const [copied, setCopied] = useState(false);

  const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(draft.hex);

  const displayHex = isValidHex ? draft.hex : color.hex;

  const handleHexChange = (value: string) => {
    let nextValue = value.trim();

    if (!nextValue.startsWith("#")) {
      nextValue = `#${nextValue}`;
    }

    setDraft((current) => ({
      ...current,
      hex: nextValue,
    }));

    const valid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(nextValue);

    if (valid) {
      onUpdate({
        hex: nextValue.toUpperCase(),
      });
    }
  };

  const handleColorPicker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();

    setDraft((current) => ({
      ...current,
      hex: value,
    }));

    onUpdate({
      hex: value,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setDraft((current) => ({
      ...current,
      name: value,
    }));

    onUpdate({
      name: value,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1200);
    } catch (error) {
      console.error("Failed to copy color:", error);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-end
        justify-center
        bg-black/20
        p-4
        backdrop-blur-[2px]
        sm:items-center
      "
    >
      <div
        className="
          w-full
          max-w-[420px]
          overflow-hidden
          rounded-[20px]
          border
          border-black/10
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.18)]
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-black/10
            px-5
            py-4
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-black/35
              "
            >
              Edit color
            </p>

            <p
              className="
                mt-1
                truncate
                text-sm
                font-medium
              "
            >
              {color.name}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-black/40
              transition-colors
              hover:bg-black/5
              hover:text-black
            "
            aria-label="Close editor"
          >
            <X size={16} />
          </button>
        </div>

        {/* Preview */}
        <div
          className="
            h-28
            w-full
            transition-colors
            duration-200
          "
          style={{
            backgroundColor: displayHex,
          }}
        />

        {/* Form */}
        <div className="space-y-5 p-5">
          {/* Name */}
          <div>
            <label
              htmlFor="color-name"
              className="
                mb-2
                block
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-black/35
              "
            >
              Name
            </label>

            <input
              id="color-name"
              type="text"
              value={draft.name}
              onChange={handleNameChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-black/10
                bg-black/[0.02]
                px-3.5
                text-sm
                outline-none
                transition-all
                placeholder:text-black/25
                focus:border-black/25
                focus:bg-white
              "
              placeholder="Color name"
            />
          </div>

          {/* HEX */}
          <div>
            <label
              htmlFor="color-hex"
              className="
                mb-2
                block
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-black/35
              "
            >
              HEX
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="color-hex"
                  type="text"
                  value={draft.hex}
                  onChange={(event) => handleHexChange(event.target.value)}
                  className={`
                    h-11
                    w-full
                    rounded-xl
                    border
                    bg-black/[0.02]
                    px-3.5
                    pr-10
                    font-mono
                    text-sm
                    uppercase
                    outline-none
                    transition-all
                    focus:bg-white
                    ${
                      isValidHex
                        ? "border-black/10 focus:border-black/25"
                        : "border-red-400"
                    }
                  `}
                  placeholder="#72199E"
                  maxLength={7}
                  spellCheck={false}
                  autoComplete="off"
                />

                {isValidHex && (
                  <Check
                    size={15}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-black/35
                    "
                  />
                )}
              </div>

              <input
                type="color"
                value={isValidHex ? displayHex : color.hex}
                onChange={handleColorPicker}
                className="
                  h-11
                  w-11
                  shrink-0
                  cursor-pointer
                  overflow-hidden
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  p-1
                "
                aria-label="Choose color"
              />
            </div>

            {!isValidHex && (
              <p
                className="
                  mt-2
                  text-xs
                  text-red-500
                "
              >
                Enter a valid HEX color.
              </p>
            )}
          </div>

          {/* Actions */}
          <div
            className="
              flex
              gap-2
              border-t
              border-black/10
              pt-5
            "
          >
            <button
              type="button"
              onClick={handleCopy}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-black/10
                px-4
                py-2.5
                text-xs
                font-medium
                transition-colors
                hover:bg-black/5
              "
            >
              {copied ? (
                <>
                  <Check size={13} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Copy HEX
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleLock}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-xs
                font-medium
                transition-colors
                ${
                  color.locked
                    ? "bg-black text-white"
                    : "border border-black/10 hover:bg-black/5"
                }
              `}
            >
              {color.locked ? <Lock size={13} /> : <LockOpen size={13} />}

              {color.locked ? "Locked" : "Lock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
