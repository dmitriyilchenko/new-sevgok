import React from 'react';

import styles from './styles';


function WelcomeSlide(props) {
  const { image } = props;

  return (
    <View style={styles.container}>
      <View>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{I18n.t('slide1_main_text')}</Text>
        <Text style={styles.description}>{I18n.t('slide1_description')}</Text>
      </View>
    </View>
  );
}

export default WelcomeSlide;
