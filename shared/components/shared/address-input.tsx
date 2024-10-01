"use client";
import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="b2e2b30417f0e5af997317f8c75b7bb2d0fa2766"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
