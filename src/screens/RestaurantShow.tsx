import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import RestaurantServices from '../services/RestaurantServices';
import {FavoritesContext} from '../Favorites';

export const RestaurantShow = ({route}) => {
  const {id} = route.params;
  const {isFavorite, toggleFavorite} = useContext(FavoritesContext);
  const {data, isLoading} = useQuery(['show'], () =>
    RestaurantServices.fetchRestaurantDetails(id),
  );
  const placeholderImage =
    'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';
  const [liked, setLiked] = useState(isFavorite(id));
  const likeImage = {
    full: require('../../assets/images/favoritefull.png'),
    empty: require('../../assets/images/favoriteempty.png'),
  };

  const updateLiked = () => {
    setLiked(!liked);
    toggleFavorite(id);
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: data?.image?.url ?? placeholderImage,
          }}
          style={styles.image}
        />
        <View style={styles.likeContainer}>
          <Pressable onPress={() => updateLiked()}>
            <Image source={likeImage[liked ? 'full' : 'empty']} style={styles.likeIcon} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.headline}>{data?.name}</Text>
      <Text style={styles.description}>
        {data?.addressInfo?.address}
        {'\n'}
        {data?.addressInfo?.city}/{data?.addressInfo?.country}
      </Text>
      <Text style={styles.title}>Contacts</Text>
      <Text style={styles.description}>{data?.contacts.phoneNumber}</Text>
      <Text style={styles.description}>{data?.contacts.email}</Text>
      <Text style={styles.title}>Cuisines</Text>
      <FlatList
        data={data?.cuisines ?? []}
        renderItem={({item}) => (
          <View>
            <Text style={styles.description}>{item.name['pt-BR']}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 7,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 3,
  },
  description: {
    fontSize: 16,
    paddingVertical: 1,
  },
  likeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
  likeIcon: {
    tintColor: 'red',
  },
});
