import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { fontType, colors } from '../../theme';
import axios from 'axios';

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

  const handleSubmit = async () => {
    if (!blogData.title || !blogData.content || !blogData.image) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://6833dbc5464b499636007f25.mockapi.io/api/cars/${blogId}`,
        blogData
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Blog updated successfully!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://6833dbc5464b499636007f25.mockapi.io/api/cars/${blogId}`
      );
      setBlogData(response.data);
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            value={blogData.image}
            onChangeText={text => handleChange('image', text)}
            placeholderTextColor={colors.white(0.6)}
            style={styles.input}
          />
        </View>

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
          onPress={handleSubmit}
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

export default EditBlogForm;