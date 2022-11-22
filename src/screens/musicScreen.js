import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  RepeatMode,
  Capability,
  usePlaybackState,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {songs} from '../helper/helper';
export default function RecipeScreen(props) {
  const {navigation, route} = props;
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackImage, setTrackImage] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const {position, duration} = useProgress(250);

  // const { position, bufferedPosition, duration } = useTrackPlayerProgress(1000, null)
  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }
    if (repeatMode == 'track') {
      return 'repeat-once';
    }
    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changerepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }
    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };
  useEffect(async () => {
    await TrackPlayer.setupPlayer();
    const songs = await TrackPlayer.getQueue();
    console.log(`First title: ${songs[0].title}`);
  }, []);
  const trackPlayerInit = async () => {
    // await TrackPlayer.setupPlayer();
    await TrackPlayer.reset();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
    });
    const activeTrack = songs.find(track => track.id === props.route.params.id);
    console.log(props.route.params.id, 'getIds');
    await TrackPlayer.add(songs);
    const changeNumber = parseFloat(activeTrack.id);

    if (props.route.params.list) {
      TrackPlayer.skip(changeNumber);
    }
    await TrackPlayer.play();
    setIsPlaying(true);
    return true;
  };
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artist, artwork} = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackImage(artwork);
    }
  });
  useEffect(() => {
    TrackPlayer.setVolume(0.9);
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);
  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };
  const onButtonNext = async () => {
    TrackPlayer.skipToNext();
  };
  const onButtonPrev = () => {
    TrackPlayer.skipToPrevious();
  };
  useEffect(() => {
    if (sliderValue == 1) {
      TrackPlayer.stop();
      TrackPlayer.reset();
      setIsPlaying(false);
    }
  });
  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      //   headerTransparent: "true",
      headerLeft: () => (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            style={styles.BackIcon}
            name="chevron-back-circle"
            size={30}
            color="#FFF"
          />
        </TouchableWithoutFeedback>
      ),
      //   headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({item}) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item}} />
      </View>
    </TouchableHighlight>
  );

  const onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    navigation.navigate('Ingredient', {ingredient, name});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: trackImage,
            }}
            resizeMode="contain"
            style={styles.albumImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.songTitle}>{trackTitle}</Text>
          <Text style={styles.artist}>{trackArtist}</Text>
        </View>
        <View style={styles.controlsContainer}>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            minimumTrackTintColor="#111000"
            maximumTrackTintColor="#ffffff"
            onSlidingStart={slidingStarted}
            onSlidingComplete={slidingCompleted}
            thumbTintColor="#ffffff"
          />
          <View style={styles.textCon}>
            <Text style={styles.colorGrey}>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </Text>
            <Text style={styles.colorGrey}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substr(14, 5)}{' '}
            </Text>
          </View>
          <View style={styles.playManage}>
            <Icon
              style={styles.shadow}
              onPress={onButtonPressed}
              name={'shuffle'}
              size={40}
              color="#000"
            />
            <Icon
              style={styles.shadow}
              onPress={onButtonPrev}
              name={'play-skip-back'}
              size={40}
              color="#000"
            />
            <Icon
              onPress={onButtonPressed}
              disabled={!isTrackPlayerInit}
              style={styles.playButton}
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={100}
              color="#000"
            />
            <Icon
              onPress={onButtonNext}
              name={'play-skip-forward'}
              size={40}
              color="#000"
            />
            <MaterialCommunityIcons
              onPress={changerepeatMode}
              name={`${repeatIcon()}`}
              size={40}
              color={repeatMode !== 'off' ? '#fff' : '#000'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
