// import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
// import React from 'react'
// import {styles} from './style'
// import { Images } from 'theme/config'
// import ResetPasswordHeader from './components/ResetPasswordHeader'
// import ForgetPassword from '../forget-password'
// import VerifyAccount from '../verify-account'
// import { ProgressHeader } from 'components'
// import { wp } from 'constants/layout'




// export default function ResetPassword() {
//   const [activeIndex, setActiveIndex] = React.useState(0);

//   const getResetPasswordDetials = () => {
//     switch (activeIndex) {
//       case 0:
//         return  ForgetPassword;

//       case 1:
//         return VerifyAccount;

//       default:
//         return;
//     }
//   };

//   const data =  getResetPasswordDetials();

//   return (
//     <SafeAreaView style={styles.container}>
//     <ImageBackground source={Images.background} style={styles.imageBg}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={Images.logo}
//           resizeMode="contain"
//           style={styles.logo}
//         />
//       </View>
//       <View>
//        <ResetPasswordHeader
//         progressWidth={wp(98)} firstProgress={1} />
       
       
       
//       </View>
//     </ImageBackground>
//     </SafeAreaView>
//   )
// }