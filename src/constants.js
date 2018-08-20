import { fonts, colors } from './theme';
import RNFetchBlob from 'react-native-fetch-blob';

export default {
  BACKGROUNDS: {
    WALLPAPER: 'https://source.unsplash.com/collection/1065412/1242x2208/daily',
    LANDSCAPES: 'https://source.unsplash.com/1242x2208/daily?landscape',
    DEFAULT: 'https://source.unsplash.com/collection/1457745/1242x2208/daily',
    // NATURE: 'https://source.unsplash.com/1242x2208/daily?nature',
    NATURE: 'https://source.unsplash.com/collection/1770663/1242x2208/daily',
    SPACE: 'https://source.unsplash.com/collection/1111575/1242x2208/daily',
    ROADS: 'https://source.unsplash.com/collection/1525589/1242x2208/daily',
    CITY: 'https://source.unsplash.com/collection/1976082/1242x2208/daily',
    ABSTRACT: 'https://source.unsplash.com/collection/1242150/1242x2208/daily',
    ABOVETREE: 'https://source.unsplash.com/collection/1525582/1242x2208/daily'
  },
  colors: {
    white: '#ffffff',
    pink: '#FF1493',
    black: '#000000'
  },
  BACKGROUND_LOCATIONS: RNFetchBlob.fs.dirs.DocumentDir + '/Backgrounds/'
};
