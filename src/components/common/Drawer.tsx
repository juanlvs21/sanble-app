import React, {useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {primary} from '@/constants/Colors';
import {useAuth} from '@/hooks/useAuth';
import {useApp} from '@/hooks/useApp';
import {noAvatar, logo, logoWhite, logoBigWhite} from '@/helpers/images';
import {DrawerItem} from '@/components/common/DrawerItem';
import {TDrawerItemScreen} from '@/types/drawer';

export type ComponentProps = {
  /**
   * Children component
   */
  children: React.ReactElement | React.ReactElement[];
};

export const Drawer: React.FC<ComponentProps> = ({children}) => {
  const navigation = useNavigation();
  const {name} = useRoute();
  const {user} = useAuth();
  const {showDrawer} = useApp();

  const onPress = (screen: TDrawerItemScreen) => navigation.navigate(screen);

  const avatar = user ? noAvatar : logoBigWhite;
  const isActive = (screen: TDrawerItemScreen) => name === screen;
  const iconColor = (screen: TDrawerItemScreen) =>
    isActive(screen) ? primary[500] : '#FFF';
  const itemLogo = (screen: TDrawerItemScreen) =>
    isActive(screen) ? logo : logoWhite;

  const offsetValue = useRef(new Animated.Value(0)).current;
  //   const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showDrawer) {
      //   Animated.timing(scaleValue, {
      //     toValue: 0.88,
      //     duration: 300,
      //     useNativeDriver: true,
      //   }).start();
      Animated.timing(offsetValue, {
        toValue: 250,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      //   Animated.timing(scaleValue, {
      //     toValue: 1,
      //     duration: 300,
      //     useNativeDriver: true,
      //   }).start();
      Animated.timing(offsetValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDrawer]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.userContainer}>
          <Image
            source={avatar}
            style={styles.userAvatar}
            resizeMode={user ? 'cover' : 'contain'}
          />
          <Text style={styles.userName} numberOfLines={1}>
            {user ? 'Example' : 'Bienvenido a Sanble'}
          </Text>
          <Text style={styles.useEmail} numberOfLines={1}>
            {user ? 'example@example.com' : ''}
          </Text>
        </View>

        <View style={styles.itemsContainer}>
          <DrawerItem
            label="Inicio"
            onPress={() => onPress('Root')}
            active={name === 'Root'}
            icon={
              <MaterialCommunityIcons
                name="home-variant"
                size={30}
                color={iconColor('Root')}
                style={styles.itemIcon}
              />
            }
          />
          {user ? (
            <>
              <DrawerItem
                label="Mi Sanble"
                active={isActive('MySanble')}
                onPress={() => onPress('MySanble')}
                icon={
                  <Image
                    source={itemLogo('MySanble')}
                    style={styles.itemIcon}
                    resizeMode="cover"
                  />
                }
              />
              <DrawerItem
                label="Favoritos"
                active={name === 'Favorites'}
                onPress={() => onPress('Favorites')}
                icon={
                  <AntDesign
                    name="heart"
                    size={30}
                    color={iconColor('Favorites')}
                    style={styles.itemIcon}
                  />
                }
              />
            </>
          ) : null}
          <DrawerItem
            label="Cerca de Ti"
            active={name === 'NearYou'}
            onPress={() => onPress('NearYou')}
            icon={
              <Ionicons
                name="navigate"
                size={30}
                color={iconColor('NearYou')}
                style={styles.itemIcon}
              />
            }
          />
          {user ? (
            <>
              <DrawerItem
                label="Mensajes"
                active={name === 'Messages'}
                onPress={() => onPress('Messages')}
                icon={
                  <MaterialCommunityIcons
                    name="comment-processing"
                    size={30}
                    color={iconColor('Messages')}
                  />
                }
              />
              <DrawerItem
                label="Perfil"
                active={name === 'Profile'}
                onPress={() => onPress('Profile')}
                icon={
                  <FontAwesome
                    name="user"
                    size={30}
                    color={iconColor('Profile')}
                    style={styles.itemIcon}
                  />
                }
              />
            </>
          ) : null}
        </View>

        <View>
          {user ? (
            <DrawerItem
              label="Salir"
              onPress={() => console.log('Salir')}
              icon={
                <MaterialIcons
                  name="logout"
                  size={30}
                  color="#FFF"
                  style={styles.itemIcon}
                />
              }
            />
          ) : (
            <DrawerItem
              label="Iniciar Sesión"
              onPress={() => console.log('Iniciar Sesion')}
              icon={
                <MaterialIcons
                  name="login"
                  // name="logout"
                  size={30}
                  color="#FFF"
                  style={styles.itemIcon}
                />
              }
            />
          )}
        </View>
      </View>
      <Animated.View
        style={[
          styles.childrenContainer,
          {
            transform: [
              // {scale: scaleValue},
              {translateX: offsetValue},
            ],
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary[500],
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  content: {
    justifyContent: 'flex-start',
    padding: 20,
  },
  userContainer: {
    width: 190,
    alignItems: 'center',
  },
  userAvatar: {
    width: 90,
    height: 90,
    borderRadius: 90,
    marginTop: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 20,
  },
  useEmail: {
    color: '#FFF',
    fontSize: 14,
  },
  itemsContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
  itemIcon: {
    height: 30,
    width: 30,
  },
  childrenContainer: {
    flexGrow: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
});
