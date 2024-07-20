import {useState,useEffect} from "react";
import {View,Text,FlatList,Pressable} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {movie} from "./Featured";
import {Gesture,GestureDetector} from "react-native-gesture-handler";
import Animated,{useAnimatedStyle,useSharedValue} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";

interface props {
 title: string;
};

const Lists = (props: props): JSX.Element => {
 const [movies,setMovies] = useState<movie[]>([]);
 const {title} = props;
 const {moviesList, myList} = useSelector((state: RootState) => state.movie);

 useEffect(() => {
  if(title === "My List") return;
  const random_Movies = [...moviesList].sort((a,b) => Math.random() - 0.5);
  setMovies(random_Movies);
 }, [moviesList]);

 useEffect(() => {
  if(title === "My List") setMovies([...myList]);
 }, [myList]);

 return (
  <View className="bg-black">
   <Text className="text-white text-lg font-inter_600 pl-1 my-3">
    {title}
   </Text>
   <FlatList
    // className="px-8 gap-4"
    data={movies}
    extraData={movies}
    keyExtractor={(item,index) => `random_movie-${index}`}
    renderItem={({item}) => <Movie movie={item} />}
    horizontal
    scrollEnabled
   />
  </View>
 );
};

export default Lists;

interface prop {
 movie: movie;
};

function Movie({movie}: prop) {
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
     style={[{height: 240,width: 160,margin: 4,borderRadius: 6},movieStyles]}
    />
   </GestureDetector>
   <LinearGradient
    colors={["rgba(0,0,0,0.1111)","rgba(0,0,0,0.222)"]}
    className="absolute top-0 left-0 w-full h-full"
   ></LinearGradient>
  </Pressable>
 );
};