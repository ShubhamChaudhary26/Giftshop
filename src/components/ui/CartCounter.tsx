 "use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CartCounterProps = {
  isZeroDelete?: boolean;
  onAdd?: (value: number) => void;
  onRemove?: (value: number) => void;
  className?: string;
  initialValue?: number;
};

const CartCounter = ({
  isZeroDelete,
  onAdd,
  onRemove,
  className,
  initialValue = 1,
}: CartCounterProps) => {
  const [counter, setCounter] = useState<number>(initialValue);

  const addToCart = () => {
    if (onAdd) {
      onAdd(counter + 1);
    }
    setCounter(counter + 1);
  };

  const remove = () => {
    if ((counter === 1 && !isZeroDelete) || counter <= 0) return;

    if (onRemove) {
      onRemove(counter - 1);
    }
    if (counter - 1 <= 0) return;
    setCounter(counter - 1);
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-pink-50 to-purple-50 w-full min-w-[110px] max-w-[120px] sm:max-w-[170px] py-3 md:py-3.5 px-3 sm:px-5 rounded-full flex items-center justify-between border-2 border-pink-200",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="h-6 w-6 sm:h-7 sm:h-7 text-pink-600  rounded-full transition-all"
        onClick={() => remove()}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="font-bold text-sm sm:text-base bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        {!isZeroDelete ? counter : initialValue}
      </span>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="h-6 w-6 sm:h-7 sm:h-7 text-pink-600  rounded-full transition-all"
        onClick={() => addToCart()}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CartCounter;