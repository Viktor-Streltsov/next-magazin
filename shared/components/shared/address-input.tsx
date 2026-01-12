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
      token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
      onChange={data => onChange?.(data?.value)}
    />
  );
};
