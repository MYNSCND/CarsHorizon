import React from 'react';
import {ScrollView, StyleSheet,  Text, View, Image, ImageBackground, TextInput, Pressable} from 'react-native';
import {Element3, Receipt21, Clock, Message, SearchNormal} from 'iconsax-react-native';
import { fontType, colors } from './src/assets/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CARS HORIZON</Text>
      </View>
<View style={searchBar.container}>
        <TextInput
            style={searchBar.input}
            placeholder="Search"
          />
          <Pressable style={searchBar.button}>
            <SearchNormal size={20} color={colors.white()} />
          </Pressable>
      </View>
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{...category.item, marginLeft: 24}}>
            <Text style={{...category.title, color: colors.white()}}>
              Popular
            </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>BMW</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>PORSCHE</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>MCLAREN</Text>
          </View>
          <View style={{...category.item, marginRight: 24}}>
            <Text style={category.title}>Mercedes</Text>
          </View>
        </ScrollView>
      </View>
      <ListBlog />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
  },
  header: {
    paddingHorizontal: 98,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height:52,
    elevation: 8,
    paddingTop:8,
    paddingBottom:4
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.black(0.30),
    marginHorizontal:5
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
});
const searchBar = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    backgroundColor: colors.white(0.03),
    borderColor: colors.white(0.2),
    borderRadius: 20,
    borderWidth: 5,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    padding: 10,
    width: '90%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 35,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

const ListBlog = () => {
  return (
    <ScrollView>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, alignItems: 'center'}}>
        <Text style = {{fontFamily: fontType["Pjs-Bold"], fontSize: 24, color: 'white'}}>
          Berita Terbaru
        </Text>
      </View>
      <View style = {styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{gap: 15}}>
          <View style={{...itemHorizontal.cardItem, marginLeft: 24}}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://imgsrv2.voi.id/LelsG-Xawufa0zMdxtM0Q4Ndw9pWDEdr0x1tws4R478/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy80MzczOTIvMjAyNDExMjYxNjE5LW1haW4uY3JvcHBlZF8xNzMyNjEyODUyLmpwZWc.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    Porsche 992 GT 3 RS Launch
                  </Text>
                  <Text style={itemHorizontal.cardText}>17 Desember 2024</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={itemHorizontal.cardItem}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://imgcdnblog.carvaganza.com/wp-content/uploads/2018/09/McLaren-720S-GT3_01.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                    MCLAREN GOES CRAZY ON ROAD
                  </Text>
                  <Text style={itemHorizontal.cardText}>15 Janurai 2025</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{...itemHorizontal.cardItem, marginRight: 24}}>
            <ImageBackground
              style={itemHorizontal.cardImage}
              resizeMode="cover"
              imageStyle={{borderRadius: 15}}
              source={{
                uri: 'https://www.bmw.co.id/content/dam/bmw/common/all-models/m-series/series-overview/bmw-m-series-seo-overview-ms-04.jpg/jcr:content/renditions/cq5dam.resized.img.890.medium.time1674651825572.jpg',
              }}>
              <View style={itemHorizontal.cardContent}>
                <View style={itemHorizontal.cardInfo}>
                  <Text style={itemHorizontal.cardTitle}>
                      BMW MOST CARS BUY IT IN INDONESIA
                  </Text>
                  <Text style={itemHorizontal.cardText}>24 November 2024</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>

        <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16, alignItems: 'center'}}>
        <Text style = {{fontFamily: fontType["Pjs-Bold"], fontSize: 20, color: 'white'}}>
          Paling Banyak Dilihat
        </Text>
      </View>
      
        <View style={itemVertical.listCard}>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://www.topgear.com/sites/default/files/2022/09/1-BMW-3-Series.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '70%'}}>
                  <Text style={itemVertical.cardCategory}>BMW</Text>
                  <Text style={itemVertical.cardTitle}>
                    BMW 3 Series 330I Sale 2000 Unit
                  </Text>
                </View>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>20 Agustus 2024</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>10.000</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqmq2RO0EHsQg1GuE9ZjJnrJloqgGWh8QNg&s',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '100%'}}>
                  <Text style={itemVertical.cardCategory}>Porsche</Text>
                  <Text style={itemVertical.cardTitle}>
                    Porsche 718 Cyaman GT 4 RS Priced Got Lowered
                  </Text>
                </View>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>11 Febuari 2024</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>8200</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://imgcdn.oto.com/medium/gallery/exterior/24/2940/mclaren-senna-24082.jpg',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '100%'}}>
                  <Text style={itemVertical.cardCategory}>McLaren</Text>
                  <Text style={itemVertical.cardTitle}>
                    McLaren Senna Is The Fasttes Cars ?
                  </Text>
                </View>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>21 Juli 2024</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>7200</Text>
              </View>
            </View>
          </View>
          <View style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{
                uri: 'https://awsimages.detik.net.id/visual/2024/03/15/penampakan-porsche-remuk-usai-ditabrak-mobil-xpander-di-showroom-pik-2-kota-tangerang-dok-detikcom_169.jpeg?w=480&q=90',
              }}
            />
            <View style={itemVertical.cardContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{gap: 5, width: '100%'}}>
                  <Text style={itemVertical.cardCategory}>Porsche</Text>
                  <Text style={itemVertical.cardTitle}>
                    XPander Hit Porsche
                  </Text>
                </View>
              </View>
              <View style={itemVertical.cardInfo}>
                <Clock
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>23 Maret 2023</Text>
                <Message
                  size={10}
                  variant="Linear"
                  color={colors.grey(1)}
                />
                <Text style={itemVertical.cardText}>100000000</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 20,
  },
  cardItem: {
    backgroundColor: colors.black(0.40),
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardCategory: {
    color: colors.white(),
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-bold'],
    
    color: colors.grey(1),
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 5,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
const itemHorizontal = StyleSheet.create({
  cardItem: {
    width: 280,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});