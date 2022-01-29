import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {primary} from '@/constants/Colors';
import {DrawerItem} from '@/components/common/DrawerItem';
import {noAvatar, logo, logoWhite, logoBigWhite} from '@/helpers/images';
import {TDrawerItemScreen} from '@/types/drawer';
import {TUser} from '@/types/user';

export type ComponentProps = DrawerContentComponentProps & {user: TUser | null};

export const DrawerContent: React.FC<ComponentProps> = ({user, ...props}) => {
  const avatar = user ? noAvatar : logoBigWhite;
  //   const isActive = (screen: TDrawerItemScreen) => name === screen;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isActive = (screen: TDrawerItemScreen) => false;
  const iconColor = (screen: TDrawerItemScreen) =>
    isActive(screen) ? primary[500] : '#FFF';
  const itemLogo = (screen: TDrawerItemScreen) =>
    isActive(screen) ? logo : logoWhite;

  const onPress = (screen: TDrawerItemScreen) => {
    props.navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}>
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
          icon={() => (
            <MaterialCommunityIcons
              name="home-variant"
              size={30}
              color={iconColor('Root')}
              style={styles.itemIcon}
            />
          )}
        />
        {user ? (
          <>
            <DrawerItem
              label="Mi Sanble"
              onPress={() => onPress('MySanble')}
              icon={() => (
                <Image
                  source={itemLogo('MySanble')}
                  style={styles.itemIcon}
                  resizeMode="cover"
                />
              )}
            />
            <DrawerItem
              label="Favoritos"
              onPress={() => onPress('Favorites')}
              icon={() => (
                <AntDesign
                  name="heart"
                  size={28}
                  color={iconColor('Favorites')}
                  style={styles.itemIcon}
                />
              )}
            />
          </>
        ) : null}
        <DrawerItem
          label="Cerca de Ti"
          onPress={() => onPress('NearYou')}
          icon={() => (
            <Ionicons
              name="navigate"
              size={30}
              color={iconColor('NearYou')}
              style={styles.itemIcon}
            />
          )}
        />
        {user ? (
          <>
            <DrawerItem
              label="Mensajes"
              onPress={() => onPress('Messages')}
              icon={() => (
                <MaterialCommunityIcons
                  name="comment-processing"
                  color={iconColor('Messages')}
                  size={30}
                />
              )}
            />
            <DrawerItem
              label="Perfil"
              onPress={() => onPress('Profile')}
              icon={() => (
                <FontAwesome
                  name="user"
                  size={30}
                  color={iconColor('Profile')}
                  style={styles.itemIcon}
                />
              )}
            />
          </>
        ) : null}
      </View>
      <View>
        {user ? (
          <DrawerItem
            label="Salir"
            onPress={() => console.log('Salir')}
            icon={() => (
              <MaterialIcons
                name="logout"
                size={30}
                color="#FFF"
                style={styles.itemIcon}
              />
            )}
          />
        ) : (
          <DrawerItem
            label="Iniciar Sesión"
            onPress={() => console.log('Iniciar Sesion')}
            icon={() => (
              <MaterialIcons
                name="login"
                // name="logout"
                size={30}
                color="#FFF"
                style={styles.itemIcon}
              />
            )}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: primary[500],
  },
  userContainer: {
    width: 190,
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
  },
  userAvatar: {
    width: 90,
    height: 90,
    borderRadius: 90,
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
  item: {
    color: '#FFF',
  },
  itemIcon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
