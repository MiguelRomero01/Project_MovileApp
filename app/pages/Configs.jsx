import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const segmentos = ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Naranja', 'Morado'];

const ScreenConfigs = () => {
  const [resultado, setResultado] = useState('');
  const spinValue = useRef(new Animated.Value(0)).current;

  const girarRuleta = () => {
    const randomSpin = Math.floor(Math.random() * 360) + 720; // Giros aleatorios

    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 5000, // Duración del giro
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      const finalRotation = randomSpin % 360;
      const indiceResultado = Math.floor((finalRotation % 360) / (360 / segmentos.length));
      const color = segmentos[indiceResultado];
      setResultado(color);
      console.log(`El resultado es: ${color}`);
    });
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'], // Giros
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ruleta, { transform: [{ rotate }] }]}>
        {segmentos.map((segmento, index) => (
          <View key={index} style={[styles.segmento, { backgroundColor: colorPorIndice(index) }]}>
            <Text style={styles.texto}>{segmento}</Text>
          </View>
        ))}
      </Animated.View>
      <Button title="Girar" onPress={girarRuleta} />
      <Text style={styles.resultado}>Resultado: {resultado}</Text>
    </View>
  );
};

const colorPorIndice = (index) => {
  const colores = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
  return colores[index % colores.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  ruleta: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#333',
    position: 'relative',
    overflow: 'hidden',
  },
  segmento: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    clipPath: 'polygon(100% 100%, 0 100%, 0 0)',
    borderColor: '#fff',
    borderWidth: 1,
  },
  texto: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontWeight: 'bold',
    color: '#fff',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default ScreenConfigs;
