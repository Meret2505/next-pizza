import { X } from "lucide-react";
import React from "react";

type Props = {
  onCLick?: VoidFunction;
};

export const ClearButton: React.FC<Props> = ({ onCLick }) => {
  return (
    <button
      onClick={onCLick}
      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
    >
      <X className="h-5 w-5" />
    </button>
  );
};
