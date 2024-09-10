import {Fragment} from "react";
import {View,Text,ScrollView} from "react-native";
import Player from "../components/Movie/Player";
import {StatusBar} from "expo-status-bar";
import {useState,useEffect} from "react";
import {useRoute} from "@react-navigation/native";
import {AirbnbRating} from "react-native-ratings";
import {AntDesign} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {API} from "../lib/API";
import * as ScreenOrientation from 'expo-screen-orientation';
import {BackHandler} from "react-native";
import {useAppDispatch, useAppSelector} from "../lib/redux";
import type {movie} from "../utils/types";
import {updateWishlist} from "../redux/userSlice";
import ListMovie from "../components/Feed/ListMovie";

const Movie = () => {
 const [movie,setMovie] = useState<movie>();
 const [randomMovies,setRandomMovies] = useState<movie[]>();
 const [isAdded,setIsAdded] = useState<boolean>(false);
 const [isFullScreen,setIsFullScreen] = useState<boolean>(false);

 useEffect(() => {
  const backAction = () => {
   if(!isFullScreen) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    .then(() => setIsFullScreen(false))
    .then(() => false);
    return false;
   } else {
    setIsFullScreen(false);
    // navigation.goBack();
    return true;
   };
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction);

  return () => {
   backHandler.remove(); 
  };
 },[]);
  
 const {id} = useRoute().params as {id: number};
 const {movies} = useAppSelector(state => state.movie);
 const {wishlist} = useAppSelector(state => state.user.user);

 const dispatch = useAppDispatch();

 useEffect(() => {
  setMovie(movies.find(item => item.id === id));
  setRandomMovies([...movies].sort(() => Math.random() - 0.5).slice(0,5));
 }, []);

 useEffect(() => {
  setIsAdded(wishlist.includes(id));
 }, [wishlist]);

 const handleMovie = async (like = false,id: number) => {
  dispatch(updateWishlist({id, add: like}));
  await API.patch(`/movie/updatewishlist?id=${id}&${like && "add=true"}`);
 };

 async function changeScreenOrientation(opt: "horizontal" | "vertical") {
  if(opt === "horizontal") {
   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
   setIsFullScreen(true);
  } else {
   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
   setIsFullScreen(false);
  };
 };

 return (
  <ScrollView 
   className={isFullScreen ? "pt-0" : "pt-7"} 
   contentContainerStyle={{paddingBottom: isFullScreen ? 0 : 24, backgroundColor: isFullScreen ? "transparent" : "#151515", flexGrow: 1}}
  >
   <StatusBar style="light" hidden={isFullScreen} backgroundColor="#111" />
   <Fragment>
    <Player isFullScreen={isFullScreen} toggleScreen={changeScreenOrientation} />
    {!isFullScreen && <View className="p-2 space-y-1.5">
     <View className="flex-row items-center justify-between pr-2 pt-2">
      <Text className="text-xl font-inter/600 text-white">
       {movie?.movie_name}
      </Text>
      {isAdded ? (
      <AntDesign
       name="heart"
       size={24}
       color="#E02802"
       onPress={() => movie && handleMovie(true,movie.id)}
      />
      ) : (
      <AntDesign
       name="hearto"
       size={24}
       color="#FFF"
       onPress={() => movie && handleMovie(false,movie.id)}
      />
     )}
     </View>
     <View className="flex-row items-center justify-start">
      <View>
       <Text className="text-white/60 capitalize font-inter/500 text-[10px] px-2 py-1.5 rounded-full bg-gray-500">
        {movie?.genre}
       </Text>
      </View>
      <View className="flex-row items-center space-x-2 flex-1 justify-center">
       <AntDesign name="calendar" size={18} color={"#fff"} />
       <Text className="text-white font-inter/500 text-[12px]">
        {movie?.release_year}
       </Text>
      </View>
      <View className="flex-row items-center space-x-1 flex-1">
       <Ionicons name="time-outline" size={20} color={"#fff"} />
       <Text className="text-white font-inter/500 text-[12px]">
        {movie?.length}
       </Text>
      </View>
     </View>
     <View className="flex-row items-center space-x-2">
      <AirbnbRating
       count={5}
       defaultRating={movie?.rating}
       size={16}
       isDisabled
       showRating={false}
      />
      <Text className="text-white/90 font-inter/600 text-[14px]">
       {movie?.rating}
      </Text>
     </View>
     <Text className="font-inter/500 text-white/80">
      {movie?.description}
     </Text>
    </View>}
   </Fragment>
   {!isFullScreen && <View className="p-3">
    <Text className="text-white text-2xl font-inter/500 mb-1">Recommended Movies</Text>
    <View>
     {randomMovies?.map((item) => <ListMovie movie={item} key={`random-${item.id}`} />)}
    </View>
   </View>}
  </ScrollView>
 );
};

export default Movie;