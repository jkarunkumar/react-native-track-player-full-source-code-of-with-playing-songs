import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import MenuButton from './MenuButton';

export default function DrawerContainer(props) {
  const {navigation} = props;

  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerContainer}>
        <MenuButton
          title="Movie Wise Songs"
          // source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate('Movie', {newRealease: false});
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Singer Wise Songs"
          // source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate('Singer');
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
