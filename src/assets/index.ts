// src/assets/index.ts

export const IMAGES = {
  splashBg: require('./Images/splashbg.png'),
  showIcon: require('./Images/show.png'),
  profilePic: require('./Images/profile-pic.jpg'),
  // Baaki images bhi yahan add karein
};

// Re-export Images from Images/index.ts
export { Images } from './Images';

// Agar aap SVGs use kar rahe hain (react-native-svg-transformer ke sath)
import StarIcon from './Images/staricon.svg';
import PrivacyIcon from './Images/privacy.svg';

export { StarIcon, PrivacyIcon };