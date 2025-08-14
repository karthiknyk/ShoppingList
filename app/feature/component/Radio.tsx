// components/Radio.tsx
import React from 'react';
import { Pressable, View, Text } from 'react-native';

type Option = { label: string; value: string };

export function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <View style={{ gap: 12 }}>
      {options.map(opt => {
        const selected = value === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
          >
            <View
              style={{
                width: 22, height: 22, borderRadius: 11,
                borderWidth: 2, borderColor: '#333',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {selected ? (
                <View
                  style={{
                    width: 12, height: 12, borderRadius: 6, backgroundColor: '#333',
                  }}
                />
              ) : null}
            </View>
            <Text>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
