import {StyleSheet, Dimensions} from 'react-native';

const {width: viewportWidth} = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const SLIDER_WIDTH = Dimensions.get('window').width + 80;

const {width: screenWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
  // Global css
  headText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Drawer Css

  drawerContent: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  // Drawer Css End

  // Drawer Menu Css
  sidemenubtnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  sidemenubtnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sidemenubtnText: {
    color: '#000',
    fontSize: 14,
    marginLeft: 5,
    marginTop: 2,
    fontWeight: 'bold',
  },

  // Drawer Css End

  // List Css
  carter: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 10,
  },
  cart01: {
    width: '20%',
  },
  cart02: {
    width: '60%',
  },
  cart03: {
    width: '10%',
  },
  imgList: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  listHeadSong: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
  // List Css End

  // Music screen css
  imgList: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  listIcon: {},
  itemText: {
    backgroundColor: 'blue',
    fontSize: 20,
    padding: 20,
  },
  headeText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  listHead: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
  },
  listSubhead: {
    marginVertical: 5,
    fontSize: 14,
    color: '#fff',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#191a2c',
    height: Dimensions.get('window').height,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#191a2c',
    height: Dimensions.get('window').height,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    // marginVertical:20
  },
  detailsContainer: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 0.45,
    justifyContent: 'flex-start',
  },
  albumImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    borderRadius: 200,
  },
  progressBar: {
    height: 20,
    paddingBottom: 90,
  },
  songTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    // marginVertical:10
  },
  artist: {
    fontSize: 20,
    color: '#7a7daf',
  },
  playManage: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  playButton: {},
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  textCon: {
    // width: 320,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrey: {
    color: '#d3d3d3',
  },
  colorYellow: {
    color: 'rgb(252, 228, 149)',
  },
});
export default styles;
