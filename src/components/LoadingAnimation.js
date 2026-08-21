import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export function LoadingAnimation({
  size = 220,
  autoPlay = true,
  loop = true,
  style = undefined,
  source = undefined,
}) {
  const animationRef = useRef(null);

  React.useEffect(() => {
    if (autoPlay && animationRef.current) {
      animationRef.current.play();
    }
  }, [autoPlay]);

  return (
    <View style={[styles.wrapper, { width: size, height: size }, style]}>
      <LottieView
        ref={animationRef}
        source={source ?? require('../assets/animations/loading-animation.json')}
        autoPlay={autoPlay}
        loop={loop}
        resizeMode="contain"
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
