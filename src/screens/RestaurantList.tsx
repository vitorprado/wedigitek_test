import React, {useContext} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import RestaurantServices from '../services/RestaurantServices';
import {Restaurant, RestaurantPage} from '../types/Restaurant';
import {FavoritesContext} from '../Favorites';

const fetchRestaurantPage = (pageParam?: {limit: number; offset: number}) => {
  return RestaurantServices.fetchRestaurants(
    pageParam?.limit ?? 10,
    pageParam?.offset ?? 0,
  );
};

const nextPageParams = (lastPage: RestaurantPage) => {
  const pageParams = {
    limit: lastPage.limit,
    offset: lastPage.offset + lastPage.limit,
  };
  return lastPage.docs.length > 0 ? pageParams : undefined;
};

export const RestaurantList = ({navigation}) => {
  const {isFavorite} = useContext(FavoritesContext);
  const {
    isInitialLoading,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['restaurants'],
    ({pageParam}) => fetchRestaurantPage(pageParam),
    {getNextPageParam: nextPageParams},
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage().then();
    }
  };

  const placeholderImage = 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';
  const renderItem = (item: Restaurant) => (
    <Pressable onPress={() => navigation.navigate('details', {id: item._id})}>
      <View style={styles.itemContainer}>
        <View>
          <Image
            source={{
              uri: item.image?.url ?? placeholderImage,
            }}
            style={styles.itemImage}
          />
          {isFavorite(item._id) ? (
            <View style={styles.likeContainer}>
              <Image
                source={require('../../assets/images/favoritefull.png')}
                style={styles.likeIcon}
              />
            </View>
          ) : undefined}
        </View>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </Pressable>
  );

  if (isInitialLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages?.flatMap(item => item.docs) ?? []}
        renderItem={({item}) => renderItem(item)}
        onEndReached={loadMore}
      />
      {isFetchingNextPage ? (
        <View>
          <Text>Loading next page...</Text>
        </View>
      ) : undefined}
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
    backgroundColor: 'white',
  },
  itemContainer: {
    flex: 1,
    paddingVertical: 7,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  itemTitle: {
    paddingVertical: 5,
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
