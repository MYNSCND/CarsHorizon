import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Alert, ActivityIndicator, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More, Edit2 } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { fontType, colors } from '../../theme';
import axios from 'axios';
import { collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot } from '@react-native-firebase/firestore';

const formatNumber = number => {
  if (!number) return '0';
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};

const BlogDetail = ({ route }) => {
  const { blogId } = route.params;
  const [iconStates, setIconStates] = useState({
    liked: { variant: 'Linear', color: colors.white(0.6) },
    bookmarked: { variant: 'Linear', color: colors.white(0.6) },
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color: prevStates[iconName].variant === 'Linear' ? colors.white() : colors.white(0.6),
      },
    }));
  };

  // Animasi
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const fetchDetail = async () => {
    setLoading(true);
    try {
      // const res = await axios.get(`https://6833dbc5464b499636007f25.mockapi.io/api/cars/${blogId}`);
      // setSelectedBlog(res.data);
      const db = getFirestore();
      const blogRef = doc(db, 'Cars', blogId);

      const unsub = onSnapshot(blogRef, (documentSnapshot) => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          // console.log('Blog data: ', blogData);
          setSelectedBlog(blogData);
        } else {
          console.log(`Blog with ID ${blogId} not found.`);
        }
      });

    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to get blog detail');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      // let res = await axios.delete(`https://6833dbc5464b499636007f25.mockapi.io/api/cars/${blogId}`);
      const db = getFirestore();
      const blogRef = doc(db, 'Cars', blogId);
      blogRef.delete();
      Alert.alert('Success!', 'Data deleted successfully!');
      navigation.goBack();
      // Anda mungkin ingin menambahkan notifikasi/alert sukses di sini
    } catch (error) {
      Alert.alert('Error', 'Failed to delete blog');
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    fetchDetail();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [blogId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.white()} />
      </View>
    );
  }

  if (!selectedBlog) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>Data not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.white()} variant="Linear" size={24} />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('EditBlog', { blogId: blogId })}
          >
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => {
              Alert.alert(
                'Delete Blog',
                'Are you sure you want to delete this blog?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => handleDeleteBlog(),
                  },
                ]
              );
            }}
          >
            <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
          <FastImage
            style={styles.image}
            source={{
              uri: selectedBlog.image,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Animated.View>

        <View style={styles.infoContainer}>
          <Text style={styles.category}>{selectedBlog.category.name}</Text>
          <Text style={styles.date}>{selectedBlog.createdAt}</Text>
        </View>

        <Text style={styles.title}>{selectedBlog.title}</Text>
        <Text style={styles.content}>{selectedBlog.content}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => toggleIcon('liked')}>
            <Like1
              color={iconStates.liked.color}
              variant={iconStates.liked.variant}
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.info}>{formatNumber(selectedBlog.totalLikes)}</Text>
        </View>

        <View style={[styles.iconContainer, { paddingHorizontal: 20 }]}>
          <Message color={colors.white(0.6)} variant="Linear" size={24} />
          <Text style={styles.info}>{formatNumber(selectedBlog.totalComments)}</Text>
        </View>

        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 16,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    // paddingTop: 62,
    paddingBottom: 54,
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  category: {
    color: colors.white(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  date: {
    color: colors.white(0.6),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    marginTop: 10,
    marginBottom: 5,
  },
  content: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 12,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#808080',
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  info: {
    color: colors.white(0.6),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  header: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  }
});

export default BlogDetail;