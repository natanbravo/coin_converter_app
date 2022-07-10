import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props) {
  const placeholder = {
    label: 'Selecione uma moeda . . .',
    value: null,
    color: '#121212',
  };
  return (
    <RNPickerSelect
      items={props.coin}
      onValueChange={(valor) => props.onChange(valor)}
      placeholder={placeholder}
      style={{
        inputIOS: {
          fontSize: 20,
          color: '#121212',
        },
        inputAndroid: {
          fontSize: 20,
          color: '#141414',
        },
      }}
    />
  );
}
