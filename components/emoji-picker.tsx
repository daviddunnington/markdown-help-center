"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  placeholder?: string;
  className?: string;
}

const emojiCategories = {
  Popular: [
    "📚",
    "🚀",
    "💡",
    "⚡",
    "🔧",
    "🎯",
    "📝",
    "✨",
    "🎨",
    "🔍",
    "💻",
    "📊",
  ],
  Objects: [
    "📁",
    "📄",
    "📋",
    "📌",
    "🔖",
    "🗂️",
    "📑",
    "🗃️",
    "📇",
    "🗄️",
    "📦",
    "📮",
  ],
  Symbols: [
    "⭐",
    "❓",
    "❗",
    "💯",
    "🔥",
    "⚠️",
    "🎉",
    "✅",
    "❌",
    "🔔",
    "🎪",
    "🎭",
  ],
  Faces: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😊",
    "🙂",
    "😉",
    "😍",
    "🤔",
    "😎",
    "🤓",
  ],
  Activities: [
    "🎮",
    "🎲",
    "🎯",
    "🎨",
    "🎭",
    "🎪",
    "🎵",
    "🎬",
    "📺",
    "📻",
    "🎤",
    "🎧",
  ],
  Travel: [
    "🚀",
    "✈️",
    "🚗",
    "🚲",
    "⛵",
    "🚁",
    "🚂",
    "🚌",
    "🏠",
    "🏢",
    "🌍",
    "🗺️",
  ],
};

export function EmojiPicker({
  value,
  onChange,
  placeholder = "Click to pick emoji",
  className,
}: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onChange(emoji);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className={`relative ${className}`}>
          <Input
            type="text"
            placeholder={placeholder}
            value=""
            className="cursor-pointer"
            readOnly
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground text-sm">
              {value || "🎯"}
            </span>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto md:w-4xl">
          <DrawerHeader>
            <DrawerTitle>Choose an Emoji</DrawerTitle>
            <DrawerDescription>
              Select an emoji for your category
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 max-h-96 overflow-y-auto">
            {Object.entries(emojiCategories).map(([category, emojis]) => (
              <div key={category} className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  {category}
                </h4>
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="p-2 text-2xl hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
