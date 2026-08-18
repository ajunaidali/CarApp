import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  cars: Car[];
  onBack: () => void;
  onSelectCar: (car: Car) => void;
};

const questions = [
  { key: 'budget', title: 'What is your budget?', options: ['$30k-50k', '$50k-80k', '$80k-100k', '$100k+'] },
  { key: 'bodyType', title: 'Which body type do you prefer?', options: ['SUV', 'Sedan', 'Coupe', 'Hatchback'] },
  { key: 'fuel', title: 'Fuel preference?', options: ['Electric', 'Petrol', 'Hybrid', 'Diesel'] },
  { key: 'transmission', title: 'Automatic or manual?', options: ['Automatic', 'Manual'] },
  { key: 'passengers', title: 'How many passengers?', options: ['2', '4', '5+', 'Family'] },
  { key: 'purpose', title: 'What is your main purpose?', options: ['Daily drive', 'Weekend trips', 'Performance', 'Luxury'] },
];

export function FindMyCarScreen({ cars, onBack, onSelectCar }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[step];

  const recommendations = useMemo(() => {
    return cars.filter(car => {
      const matchesBudget = !answers.budget || ((answers.budget === '$30k-50k' && car.price <= 50000) || (answers.budget === '$50k-80k' && car.price > 50000 && car.price <= 80000) || (answers.budget === '$80k-100k' && car.price > 80000 && car.price <= 100000) || (answers.budget === '$100k+' && car.price > 100000));
      const matchesBody = !answers.bodyType || car.bodyType === answers.bodyType;
      const matchesFuel = !answers.fuel || car.fuel === answers.fuel;
      const matchesTransmission = !answers.transmission || car.transmission === answers.transmission;
      return matchesBudget && matchesBody && matchesFuel && matchesTransmission;
    }).slice(0, 3);
  }, [answers, cars]);

  const handleSelect = (option: string) => {
    const nextAnswers = { ...answers, [currentQuestion.key]: option };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    onSelectCar(recommendations[0] ?? cars[0]);
  };

  if (step >= questions.length) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Recommended for you</Text>
        {recommendations.length > 0 ? recommendations.map(car => (
          <Pressable key={car.id} style={styles.card} onPress={() => onSelectCar(car)}>
            <Text style={styles.cardTitle}>{car.brand} {car.model}</Text>
            <Text style={styles.cardMeta}>{car.bodyType} • {car.fuel} • {car.transmission}</Text>
            <Text style={styles.cardPrice}>${car.price.toLocaleString()}</Text>
          </Pressable>
        )) : <Text style={styles.empty}>No recommendation matched all preferences.</Text>}
        <Pressable style={styles.button} onPress={onBack}><Text style={styles.buttonText}>Back to home</Text></Pressable>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>{step + 1}/{questions.length}</Text>
      <Text style={styles.title}>{currentQuestion.title}</Text>
      {currentQuestion.options.map(option => (
        <Pressable key={option} style={styles.option} onPress={() => handleSelect(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}
      <Pressable style={styles.backButton} onPress={onBack}><Text style={styles.buttonText}>Cancel</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
  },
  content: {
    paddingBottom: 28,
  },
  progress: {
    color: COLORS.gold,
    fontWeight: '700',
    marginBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  option: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 18,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  button: {
    marginTop: 18,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: '800',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  cardMeta: {
    color: COLORS.muted,
    marginTop: 6,
  },
  cardPrice: {
    color: COLORS.gold,
    marginTop: 10,
    fontWeight: '800',
  },
  empty: {
    color: COLORS.muted,
    marginBottom: 14,
  },
});
