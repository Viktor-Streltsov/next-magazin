'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

const AddressSuggestions = dynamic(
  () => import('react-dadata').then(mod => mod.AddressSuggestions),
  {
    ssr: false,
    loading: () => (
      <input
        type="text"
        className="react-dadata__input"
        placeholder="Адрес доставки"
        disabled
      />
    ),
  }
);

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="9bdd41ab12cd7fac68d7d98e2656467f3c469712"
      onChange={data => onChange?.(data?.value)}
    />
  );
};
