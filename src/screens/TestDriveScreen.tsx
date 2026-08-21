import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  car: Car;
  onBack: () => void;
};

const dates = ['Mon 12 Aug', 'Tue 13 Aug', 'Wed 14 Aug', 'Thu 15 Aug'];
const times = ['09:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'];

export function TestDriveScreen({ car, onBack }: Props) {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [form, setForm] = useState({ fullName: '', phone: '', email: '' });

  const validate = () => {
    return form.fullName && form.phone && form.email.includes('@');
  };

  if (step === 4) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Booking confirmed</Text>
        <View style={styles.confirmCard}>
          <Text style={styles.confirmLabel}>Car</Text>
          <Text style={styles.confirmValue}>{car.brand} {car.model}</Text>
          <Text style={styles.confirmLabel}>Date</Text>
          <Text style={styles.confirmValue}>{selectedDate}</Text>
          <Text style={styles.confirmLabel}>Time</Text>
          <Text style={styles.confirmValue}>{selectedTime}</Text>
          <Text style={styles.confirmLabel}>Dealer</Text>
          <Text style={styles.confirmValue}>{car.dealer.location}</Text>
          <Text style={styles.confirmLabel}>Booking ID</Text>
          <Text style={styles.confirmValue}>CT-{Math.floor(Math.random() * 10000)}</Text>
        </View>
        <Pressable style={styles.primaryButton} onPress={onBack}><Text style={styles.primaryText}>Done</Text></Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Book a test drive</Text>
      {step === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selected car</Text>
          <Text style={styles.carName}>{car.brand} {car.model}</Text>
          <Text style={styles.carMeta}>{car.year} • {car.transmission} • {car.fuel}</Text>
          <Text style={styles.price}>${car.price.toLocaleString()}</Text>
        </View>
      )}

      {step === 1 && (
        <View>
          <Text style={styles.sectionTitle}>Select date</Text>
          {dates.map(date => (
            <Pressable key={date} style={[styles.option, selectedDate === date && styles.optionSelected]} onPress={() => setSelectedDate(date)}>
              <Text style={styles.optionText}>{date}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.sectionTitle}>Select time</Text>
          {times.map(time => (
            <Pressable key={time} style={[styles.option, selectedTime === time && styles.optionSelected]} onPress={() => setSelectedTime(time)}>
              <Text style={styles.optionText}>{time}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.sectionTitle}>Your details</Text>
          <TextInput placeholder="Full name" placeholderTextColor={COLORS.muted} style={styles.input} value={form.fullName} onChangeText={value => setForm({ ...form, fullName: value })} />
          <TextInput placeholder="Phone number" placeholderTextColor={COLORS.muted} keyboardType="phone-pad" style={styles.input} value={form.phone} onChangeText={value => setForm({ ...form, phone: value })} />
          <TextInput placeholder="Email" placeholderTextColor={COLORS.muted} keyboardType="email-address" style={styles.input} value={form.email} onChangeText={value => setForm({ ...form, email: value })} />
          {!validate() && form.email.length > 0 && <Text style={styles.error}>Please enter a valid name, phone number, and email.</Text>}
        </View>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={step === 0 ? onBack : () => setStep(step - 1)}>
          <Text style={styles.secondaryText}>{step === 0 ? 'Cancel' : 'Back'}</Text>
        </Pressable>
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            if (step === 3 && !validate()) return;
            setStep(Math.min(step + 1, 4));
          }}
        >
          <Text style={styles.primaryText}>{step === 3 ? 'Confirm' : 'Next'}</Text>
        </Pressable>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  cardTitle: {
    color: COLORS.gold,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  carName: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  carMeta: {
    color: COLORS.muted,
    marginTop: 4,
  },
  price: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  option: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderColor: COLORS.gold,
  },
  optionText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  error: {
    color: '#f6a5a5',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  secondaryText: {
    color: COLORS.text,
    fontWeight: '800',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.gold,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: {
    color: COLORS.background,
    fontWeight: '800',
  },
  confirmCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  confirmLabel: {
    color: COLORS.muted,
    marginTop: 12,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  confirmValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
