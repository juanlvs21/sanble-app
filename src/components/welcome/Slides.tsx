import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Animated, StyleSheet} from 'react-native';
import {View, Button} from 'native-base';

import {width} from '@/constants/Layout';
import {useApp} from '@/hooks/useApp';
import {WelcomeSlideItem} from '@/components/welcome/SlideItem';
import {WelcomeSlideHelp} from '@/components/welcome/SlideHelp';
import {TWelcomeSlides} from '@/types/welcome';
import {primary} from '@/constants/Colors';

type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement;
};

export const WelcomeSlides: React.FC<ComponentProps> = ({children}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {handleSetHideWelcome, hideWelcome} = useApp();
  const hideAnimation = useRef(new Animated.Value(0)).current;
  const dots1Animation = useRef(new Animated.Value(1)).current;
  const dots2Animation = useRef(new Animated.Value(0)).current;
  const dots3Animation = useRef(new Animated.Value(0)).current;
  const dots4Animation = useRef(new Animated.Value(0)).current;
  const dots5Animation = useRef(new Animated.Value(0)).current;

  const dotsAnimations = [
    dots1Animation,
    dots2Animation,
    dots3Animation,
    dots4Animation,
    dots5Animation,
  ];

  const onLater = () => {
    handleSetHideWelcome(true);
  };

  const onSignup = () => {
    handleSetHideWelcome(true);
  };

  const data: TWelcomeSlides[] = [
    {
      title: 'Bienvenido',
      description:
        '¿Estás listo para vivir tus ferias favoritas de una manera más cercana a ti?',
      bg1: require('@/assets/images/welcome/wave_welcome_1_1.png'),
      bg2: require('@/assets/images/welcome/wave_welcome_1_2.png'),
      image: require('@/assets/images/welcome/illustration_welcome_1.png'),
      buttons: <WelcomeSlideHelp text="Deliza para ver más" />,
    },
    {
      title: 'Disfruta lo mejor',
      description:
        'Las Ferias y Stands más populares, y además, ¡tú mismo puedes dar tu opinión sobre ellos!',

      bg1: require('@/assets/images/welcome/wave_welcome_2_1.png'),
      bg2: require('@/assets/images/welcome/wave_welcome_2_2.png'),
      bg2Top: 100,
      image: require('@/assets/images/welcome/illustration_welcome_2.png'),
      buttons: <WelcomeSlideHelp text="Ver más" />,
    },
    {
      title: 'Encuéntralas',
      description:
        'Encuentra las Ferias que más te gusten y los Stands más llamativos en cualquier lugar',
      bg1: require('@/assets/images/welcome/wave_welcome_3_1.png'),
      bg2: require('@/assets/images/welcome/wave_welcome_3_2.png'),
      image: require('@/assets/images/welcome/illustration_welcome_3.png'),
      buttons: <WelcomeSlideHelp text="Ya casi" />,
    },
    {
      title: '¡Emprende!',
      description:
        'Crea tu propio Stand o incluso ¡Tu Feria! Y luego mira lo que la gente piensa de ellos',
      bg1: require('@/assets/images/welcome/wave_welcome_4_1.png'),
      bg2: require('@/assets/images/welcome/wave_welcome_4_2.png'),
      image: require('@/assets/images/welcome/illustration_welcome_4.png'),
      buttons: <WelcomeSlideHelp text="Y ahora..." />,
    },
    {
      title: '¿Bueno, qué estás esperando?',
      bg1: require('@/assets/images/welcome/wave_welcome_5_1.png'),
      bg2: require('@/assets/images/welcome/wave_welcome_5_2.png'),
      image: require('@/assets/images/welcome/illustration_welcome_5.png'),
      buttons: (
        <>
          <Button style={styles.btn} onPress={onSignup}>
            Registrarse
          </Button>
          <Button style={styles.btn} variant="link" onPress={onLater}>
            Quizás mas tarde
          </Button>
        </>
      ),
    },
  ];

  const onScrollEnd = (e: any) => {
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
      data.length,
    );
    setCurrentIndex(pageNumber - 1);
  };

  useEffect(() => {
    Animated.timing(hideAnimation, {
      toValue: hideWelcome ? -width : 0,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideWelcome]);

  useEffect(() => {
    dotsAnimations.map((animation, index) => {
      Animated.timing(animation, {
        toValue: currentIndex === index ? 1 : 0,
        useNativeDriver: true,
      }).start();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateX: hideAnimation}],
          },
        ]}>
        <FlatList
          onMomentumScrollEnd={onScrollEnd}
          data={data}
          renderItem={({item, index}) => (
            <WelcomeSlideItem
              item={{...item, index}}
              currentIndex={currentIndex}
            />
          )}
          keyExtractor={(_, index) => `welcome-${index}`}
          bounces={false}
          scrollEventThrottle={32}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
        />
        <View style={styles.dotsContainer}>
          {dotsAnimations.map((animation, index) => (
            <View key={index}>
              <View style={styles.dots} />
              <Animated.View
                style={[
                  styles.dots,
                  styles.dotsActive,
                  {
                    transform: [{scale: animation}],
                  },
                ]}
              />
            </View>
          ))}
        </View>
      </Animated.View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
  },
  btn: {
    width: '100%',
    marginTop: 10,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width,
  },
  dotsActive: {
    backgroundColor: primary[500],
    marginTop: -20,
  },
  dots: {
    backgroundColor: '#FFE2CE',
    width: 15,
    height: 15,
    borderRadius: 15,
    margin: 5,
  },
});
