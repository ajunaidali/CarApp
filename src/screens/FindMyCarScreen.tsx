import React, { useMemo, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CarCard } from '../components/CarCard';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectCar: (car: Car) => void;
};

const questions = [
  { key: 'budget', title: "What's your budget?", options: ['Under $20,000', '$20,000-$40,000', '$40,000-$60,000', '$60,000+'] },
  { key: 'bodyType', title: 'Which body type do you prefer?', options: ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Electric'] },
  { key: 'fuel', title: 'Which fuel type suits you?', options: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  { key: 'transmission', title: 'Which transmission do you prefer?', options: ['Automatic', 'Manual'] },
  { key: 'passengers', title: 'How many people do you usually travel with?', options: ['1-2', '3-4', '5+'] },
  { key: 'purpose', title: 'What is your main purpose?', options: ['Daily commute', 'Family', 'Long trips', 'Luxury', 'Performance'] },
] as const;

type Answers = Record<string, string>;

const matchesBudget = (price: number, budget?: string) => {
  if (!budget) return false;
  if (budget === 'Under $20,000') return price < 20000;
  if (budget === '$20,000-$40,000') return price >= 20000 && price <= 40000;
  if (budget === '$40,000-$60,000') return price > 40000 && price <= 60000;
  return price > 60000;
};

const scoreCar = (car: Car, answers: Answers) => {
  let score = 0;
  if (matchesBudget(car.price, answers.budget)) score += 2;
  if (answers.bodyType && (car.bodyType === answers.bodyType || car.category === answers.bodyType || (answers.bodyType === 'Electric' && car.fuel === 'Electric'))) score += 1;
  if (answers.fuel && car.fuel === answers.fuel) score += 1;
  if (answers.transmission && car.transmission === answers.transmission) score += 1;
  if (answers.passengers === '5+' && car.bodyType === 'SUV') score += 1;
  if (answers.passengers === '3-4' && ['SUV', 'Sedan', 'Hatchback'].includes(car.bodyType)) score += 1;
  if (answers.passengers === '1-2' && ['Coupe', 'Hatchback'].includes(car.bodyType)) score += 1;
  if (answers.purpose === 'Family' && car.bodyType === 'SUV') score += 1;
  if (answers.purpose === 'Performance' && car.horsepower >= 300) score += 1;
  if (answers.purpose === 'Luxury' && car.price >= 70000) score += 1;
  if (answers.purpose === 'Daily commute' && ['Hybrid', 'Electric'].includes(car.fuel)) score += 1;
  if (answers.purpose === 'Long trips' && ['SUV', 'Sedan'].includes(car.bodyType)) score += 1;
  return score;
};

export function FindMyCarScreen({ cars, favorites, onToggleFavorite, onBack, onSelectCar }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);

  const currentQuestion = questions[step];

  const recommendations = useMemo(() => cars.map(car => ({ car, score: scoreCar(car, answers) })).sort((a, b) => b.score - a.score).slice(0, 3), [answers, cars]);
  const dealers = useMemo(() => Array.from(new Map(cars.map(car => [car.dealer.name, car])).values()), [cars]);

  const handleSelect = (option: string) => {
    setAnswers(current => ({ ...current, [currentQuestion.key]: option }));
  };

  if (finished) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>Your results</Text>
        <Text style={styles.title}>Your Recommended Cars</Text>
        {recommendations.map(({ car, score }) => <CarCard key={car.id} car={car} isFavorite={favorites.includes(car.id)} onToggleFavorite={() => onToggleFavorite(car.id)} matchPercentage={Math.round(50 + (score / 11) * 50)} showDetailsLabel onPress={() => onSelectCar(car)} />)}
        <Text style={styles.sectionTitle}>Nearby Dealerships</Text>
        <Text style={styles.locationMessage}>Location access is disabled. Showing nearby dealerships in the default area.</Text>
        <MapView style={styles.map} initialRegion={{ latitude: 34.0522, longitude: -118.2437, latitudeDelta: 0.18, longitudeDelta: 0.18 }}>
          {dealers.map((car, index) => <Marker key={car.dealer.name} coordinate={{ latitude: 34.0522 + index * 0.025, longitude: -118.2437 + index * 0.03 }} title={car.dealer.name} description={car.dealer.location} onPress={() => setSelectedDealer(car.dealer.name)} />)}
        </MapView>
        {selectedDealer && (() => { const car = dealers.find(item => item.dealer.name === selectedDealer); if (!car) return null; return <View style={styles.dealerCard}><Text style={styles.cardTitle}>{car.dealer.name}</Text><Text style={styles.cardMeta}>{car.dealer.location}</Text><Text style={styles.cardMeta}>{cars.filter(item => item.dealer.name === selectedDealer).length} cars available</Text><Pressable style={styles.button} onPress={() => onSelectCar(car)}><Text style={styles.buttonText}>View Dealer Cars</Text></Pressable></View>; })()}
        <Pressable style={styles.backButton} onPress={onBack}><Text style={styles.buttonText}>Back to home</Text></Pressable>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Step {step + 1} of {questions.length}</Text>
      <View style={styles.progressTrack}>{questions.map((question, index) => <View key={question.key} style={[styles.progressDot, index <= step && styles.progressActive]} />)}</View>
      <Text style={styles.title}>{currentQuestion.title}</Text>
      <ScrollView contentContainerStyle={styles.options} keyboardShouldPersistTaps="handled">
      {currentQuestion.options.map(option => (
        <Pressable key={option} style={({ pressed }) => [styles.option, answers[currentQuestion.key] === option && styles.optionSelected, pressed && styles.pressed]} onPress={() => handleSelect(option)}>
          <Text style={styles.optionText}>{option}</Text>
          <Text style={styles.radio}>{answers[currentQuestion.key] === option ? '●' : '○'}</Text>
        </Pressable>
      ))}
      </ScrollView>
      <View style={styles.actions}>
        <Pressable style={styles.backButton} onPress={() => step === 0 ? onBack() : setStep(current => current - 1)}><Text style={styles.buttonText}>{step === 0 ? 'Cancel' : 'Back'}</Text></Pressable>
        <Pressable disabled={!answers[currentQuestion.key]} style={[styles.button, !answers[currentQuestion.key] && styles.disabled]} onPress={() => step === questions.length - 1 ? setFinished(true) : setStep(current => current + 1)}><Text style={styles.buttonText}>{step === questions.length - 1 ? 'Finish' : 'Next'}</Text></Pressable>
      </View>
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
    flexGrow: 1,
  },
  eyebrow: { color: COLORS.gold, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', marginBottom: 6 },
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  options: { paddingBottom: 12 },
  optionSelected: { borderColor: COLORS.gold, backgroundColor: 'rgba(212, 175, 55, 0.12)' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  radio: { color: COLORS.gold, fontSize: 20 },
  progressTrack: { flexDirection: 'row', gap: 6, marginBottom: 22 },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: COLORS.border },
  progressActive: { backgroundColor: COLORS.gold },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
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
  disabled: { opacity: 0.4 },
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
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginTop: 22, marginBottom: 10 },
  locationMessage: { color: COLORS.muted, lineHeight: 20, marginBottom: 12 },
  map: { width: '100%', height: 230, borderRadius: 18, overflow: 'hidden' },
  dealerCard: { backgroundColor: COLORS.card, borderColor: COLORS.gold, borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 12 },
});
