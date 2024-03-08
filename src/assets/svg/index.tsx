import { View } from 'react-native';
import Svg, { Circle, G, Path, Rect, Defs, ClipPath } from 'react-native-svg';

export const SEARCH_ICON = () => {
    return(
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#7378DE" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M20.9999 21L16.6499 16.65" stroke="#7378DE" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}

export const HELP_CIRCLE = () => {
    return(
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
            <G clipPath="url(#clip0_7815_826)">
            <Path d="M8.00016 14.6663C11.6821 14.6663 14.6668 11.6816 14.6668 7.99967C14.6668 4.31778 11.6821 1.33301 8.00016 1.33301C4.31826 1.33301 1.3335 4.31778 1.3335 7.99967C1.3335 11.6816 4.31826 14.6663 8.00016 14.6663Z" stroke="#7378DE" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M6.06006 6.00038C6.21679 5.55482 6.52616 5.17912 6.93336 4.9398C7.34056 4.70049 7.81932 4.61301 8.28484 4.69285C8.75036 4.7727 9.1726 5.01473 9.47678 5.37606C9.78095 5.7374 9.94743 6.19473 9.94673 6.66705C9.94673 8.00038 7.94673 8.66705 7.94673 8.66705" stroke="#7378DE" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M8 11.333H8.00667" stroke="#7378DE" strokeLinecap="round" strokeLinejoin="round"/>
            </G>
            <Defs>
            <ClipPath id="clip0_7815_826">
            <Rect width="16" height="16" fill="white"/>
            </ClipPath>
            </Defs>
        </Svg>
    )
}