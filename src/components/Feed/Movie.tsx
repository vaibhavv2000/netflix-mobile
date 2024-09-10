import type {movie} from "../../utils/types";
import {Gesture,GestureDetector} from "react-native-gesture-handler";
import Animated,{useAnimatedStyle,useSharedValue} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {Pressable} from "react-native";

interface prop {
 movie: movie;
};
   
const Movie = ({movie}: prop) => {
 const opacity = useSharedValue(1);
 const position = useSharedValue({x: 0,y: 0});
   
 const {navigate} = useNavigation();
   
 const movieStyles = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [{translateX: position.value.x},{translateY: position.value.y}],
 }));
   
 const Drag = Gesture.LongPress();
   
 return (
  // @ts-ignore  
  <Pressable onPress={() =>  navigate(`Movie`,{id: movie.id})}>
   <GestureDetector gesture={Drag}>
    <Animated.Image
     source={{uri: movie.thumbnail}}
     style={[{height: 260,width: 180,margin: 6,borderRadius: 2},movieStyles]}
    />
   </GestureDetector>
   <LinearGradient
    colors={["rgba(0,0,0,0.1111)","rgba(0,0,0,0.222)"]}
    className="absolute top-0 left-0 w-full h-full"
   ></LinearGradient>
  </Pressable>
 );
};

export default Movie;