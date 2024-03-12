import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Meeting = props => {

    const post = props.post;

    // console.log(post);

    const navigation = useNavigation();

    const onPress = () => {
        //navigation.navigate('Existing List', {post: post});
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 1}}>
                <Text style={styles.titleLabel}>Title</Text>
                <Text style={styles.locationLabel}>Location</Text>
                <Text style={styles.dateLabel}>Date</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
                <Text style={styles.location} numberOfLines={1}>{post.location}</Text>
                <Text style={styles.date} numberOfLines={1}>{post.date}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Meeting;

