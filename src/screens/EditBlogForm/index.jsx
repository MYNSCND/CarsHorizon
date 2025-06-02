import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Add, AddSquare, ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import axios from 'axios';
import { doc, getFirestore, onSnapshot, updateDoc } from '@react-native-firebase/firestore';
import FastImage from '@d11/react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';

const EditBlogForm = ({ route }) => {
  const { blogId } = route.params;
  const dataCategory = [
    { id: 1, name: 'BMW' },
    { id: 2, name: 'Porsche' },
    { id: 3, name: 'McLaren' },
    { id: 4, name: 'Mercedes' },
  ];

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: '',
    category: { id: 1, name: 'BMW' },
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();


  const handleChange = (key, value) => {
    setBlogData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    try {
      if (image !== oldImage && oldImage) {
        await fetch(`https://backend-file-praktikum.vercel.app/delete/${image}`, {
          method: 'POST',
        });
      }

      let newImageUrl = image;

      if (image !== oldImage) {
        const imageFormData = new FormData();
        imageFormData.append('file', {
          uri: image,
          type: `image/${extension}`, // or 'image/png'
          name: filename,
        });

        const result = await fetch('https://backend-file-praktikum.vercel.app/upload/', {
          method: 'POST',
          body: imageFormData,
        });
        if (result.status !== 200) {
          throw new Error("failed to upload image");
        }

        const { url } = await result.json();
        newImageUrl = url;
      }

      const url = image !== oldImage ? newImageUrl : oldImage;
      const db = getFirestore();
      const blogRef = doc(db, 'Cars', blogId);
      updateDoc(blogRef, {
        title: blogData.title,
        category: blogData.category,
        image: url,
        content: blogData.content,
      });

      setLoading(false);
      console.log('Blog Updated!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };


  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  const handleImagePick = async () => {
    ImageCropPicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(img => {
        console.log(img);
        setImage(img.path);
      })
      .catch(error => {
        console.log(error);
      });
  };



  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const blogRef = doc(db, 'Cars', blogId);

      const unsub = onSnapshot(blogRef, (documentSnapshot) => {
        const blogData = documentSnapshot.data();
        if (blogData) {
          console.log('Blog data: ', blogData);
          setBlogData({
            title: blogData.title,
            content: blogData.content,
            category: {
              id: blogData.category.id,
              name: blogData.category.name,
            },
          });
          setOldImage(blogData.image);
          setImage(blogData.image);
          setLoading(false);
        } else {
          console.log(`Blog with ID ${blogId} not found.`);
        }

      });
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load blog data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [blogId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white()} />
      </View>
    );
  }

  if (!blogData) {
    return (
      <View style={styles.loadingContainer}>
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
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Edit Blog</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={blogData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.white(0.6)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            value={blogData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor={colors.white(0.6)}
            multiline
            style={[styles.input, { minHeight: 150 }]}
          />
        </View>

        {image ? (
          <View style={{ position: 'relative' }}>
            <FastImage
              style={{ width: '100%', height: 127, borderRadius: 5 }}
              source={{
                uri: image,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: colors.blue(),
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color={colors.white()}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <View
              style={[
                textInput.borderDashed,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color={colors.white(0.6)} variant="Linear" size={42} />
              <Text
                style={{
                  fontFamily: fontType['Pjs-Regular'],
                  fontSize: 12,
                  color: colors.white(0.6),
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {dataCategory.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleChange('category', item)}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor:
                      blogData.category.id === item.id
                        ? colors.white()
                        : colors.white(0.08),
                  }
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        blogData.category.id === item.id
                          ? colors.black()
                          : colors.white(),
                    }
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleUpdate}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Updating...' : 'Update Blog'}
          </Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  errorText: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#808080',
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 18,
    color: colors.white(),
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(0.8),
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white(0.1),
    borderRadius: 8,
    padding: 12,
    color: colors.white(),
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.white(0.3),
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Medium'],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#808080',
    borderTopWidth: 1,
    borderTopColor: colors.white(0.2),
  },
  submitButton: {
    backgroundColor: colors.white(),
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.black(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 16,
  },
});

const textInput = StyleSheet.create({
  borderDashed: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: colors.white(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
    padding: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.white(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.white(0.6),
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  }
})

export default EditBlogForm;