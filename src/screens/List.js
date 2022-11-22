import React from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../../styles';
import {songs} from '../../src/helper/helper';
export default function List(props) {
  const navigation = props.navigation;

  const naviGate = async id => {
    navigation.navigate('Music', {id: id, list: true});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headText}>Music List</Text>
        {songs &&
          songs.map(music => (
            <>
              <TouchableOpacity onPress={() => naviGate(music.id)}>
                <View style={styles.carter}>
                  <View style={styles.cart01}>
                    <Image
                      source={{uri: music.artwork ? music.artwork : Dummy}}
                      style={styles.imgList}></Image>
                  </View>
                  <View style={styles.cart02}>
                    <Text style={styles.listHeadSong}>{music.title}</Text>
                    <Text style={styles.listSubhead}>{music.movie_name}</Text>
                  </View>
                  <View style={styles.cart03}>
                    <Text style={styles.listHeadSong}>{music.duration}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ))}
      </ScrollView>
    </View>
  );
}
