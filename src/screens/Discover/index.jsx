import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { BlogList } from '../../data';
import { ItemSmall } from '../../components';
import { SearchNormal1 } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import axios from 'axios';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { collection, getFirestore, onSnapshot } from '@react-native-firebase/firestore';
const data = [
  { id: 1, label: 'Popular' },
  { id: 2, label: 'BMW' },
  { id: 3, label: 'Porsche' },
  { id: 4, label: 'McLaren' },
  { id: 5, label: 'Mercedes' },
];
const ItemRecent = ({ item }) => {
  return (
    <View style={recent.button}>
      <Text style={recent.label}>{item.label}</Text>
    </View>
  );
};
const FlatListRecent = () => {
  const renderItem = ({ item }) => {
    return <ItemRecent item={item} />;
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
const Discover = () => {

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // const res = await axios.get('https://6833dbc5464b499636007f25.mockapi.io/api/cars');
      // console.log(res.data);

      const db = getFirestore();
      const blogRef = collection(db, 'Cars');

      const unsub = onSnapshot(blogRef, (snapshot) => {
        const newBlogs = [];
        snapshot.forEach((doc) => {
          newBlogs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setBlogs(newBlogs);
        console.log(newBlogs);
        
      });
    } catch (e) {
      console.log(`ERROR FETCH BLOGS : ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBlogs();
    }, []));

  return (
    <View style={styles.container}>
      <View>
        <Text style={recent.text}>Pencarian Topik</Text>
        <FlatListRecent />
      </View>
      <View style={styles.header}>
        <View style={styles.bar}>
          <SearchNormal1 size={18} color={colors.white(1)} variant="Linear" />
          <Text style={styles.placeholder}>Search</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={styles.listCard}>
            {blogs.length < 1 ? (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text>Data not available</Text>
              </View>
            ) : blogs.map((item, index) => (
              <ItemSmall key={index} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default Discover;
const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#808080",
  },
  header: {
    paddingHorizontal: 24,
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 20,
  },
  bar: {
    flexDirection: 'row',
    padding: 5,
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.white(0.5),
    borderRadius: 10,
    flex: 1,
  },
  placeholder: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(1),
    lineHeight: 10,
  },
});
const recent = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderColor: colors.white(0.15),
    borderWidth: 1,
    backgroundColor: colors.black(0.3),
  },
  label: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(1),
  },
  text: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    paddingVertical: 5,
    paddingHorizontal: 100,

  },
});