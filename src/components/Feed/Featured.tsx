import {useState,useEffect} from "react";
import {
 View,
 Text,
 Image,
 Pressable,
 ImageBackground,
 TouchableOpacity,
 useWindowDimensions,
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {EvilIcons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";
import {logout} from "../../redux/userSlice";
import type {movie} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../lib/redux";

const Featured = () => {
 const [movie,setMovie] = useState<movie>();
 const [showLogout,setShowLogout] = useState<boolean>(false);

 const {navigate} = useNavigation();
 const dispatch = useAppDispatch();
 const {width} = useWindowDimensions();

 const {movies} = useAppSelector(state => state.movie);

 useEffect(() => {
  const movie = movies[Math.floor(Math.random() * movies.length)];
  setMovie(movie);
 }, [movies]);

 const handleLogout = async () => {
  await SecureStore.deleteItemAsync("netflix-token");
  dispatch(logout());
 };

 return (
  <View className="bg-black">
   <ImageBackground
    className={`w-full h-full justify-between pt-10 relative`}
    source={{uri: movie?.thumbnail}}
    resizeMode="cover"
    style={{height: width}}
   >
    <View className="w-full flex-row items-center justify-between z-50">
     <Image source={require("../../../assets/Images/logo.png")} className="h-10 w-12" />
     <View className="flex-row items-center gap-5 px-2 relative">
      <EvilIcons name="search" size={30} color={"#fff"} onPress={() => navigate("Upload" as never)} />
      <TouchableOpacity onPress={() => setShowLogout(prev => !prev)}>
       <Image source={require("../../../assets/Images/Avatar.png")} className="h-9 w-9 rounded-sm" />
      </TouchableOpacity>
      {showLogout && (
      <Pressable onPress={handleLogout}
       className="bg-black/80 p-2.5 absolute top-11 right-2 flex-row items-center space-x-2 rounded-sm"
      >
       <AntDesign name="logout" size={18} color={"#fff"} />
       <Text className="text-white font-inter/600 text-[12px]">
        Logout
       </Text>
      </Pressable>
     )}
     </View>
    </View>
    <LinearGradient
     colors={["rgba(0,0,0,0.111)","rgba(0,0,0,0.444)"]}
     className="absolute top-0 left-0 w-full h-[420px]"
    ></LinearGradient>
    <Image source={{uri: movie?.title_img}} className="w-96 h-40" resizeMethod="resize" resizeMode="contain" />
    <View className="py-3 items-center">   
     <View className="flex-row items-center space-x-3 my-6">
      <Text className="text-white font-inter/400 text-lg">{movie?.movie_name}</Text>
      <Text className="text-white font-inter/400 text-lg">|</Text>
      <Text className="text-white font-inter/400 text-lg">{movie?.genre}</Text>
      <Text className="text-white font-inter/400 text-lg">|</Text>
      <Text className="text-white font-inter/400 text-lg">{movie?.length}</Text>
     </View>
     <View className="items-center w-[100%] space-x-5 px-5 flex-row justify-evenly">
      <View className="flex-row items-center space-x-2">
       <FontAwesome name="star" size={16} color="#ffa900" />
       <Text className="font-inter/500 text-white text-[14px]">{movie?.rating}</Text>
      </View>
      <TouchableOpacity
       className="items-center flex-row p-2.5 bg-blue-500 px-6 rounded-sm justify-center space-x-2"
       activeOpacity={0.7}
       // @ts-ignore
       onPress={() => navigate("Movie",{id: movie?.id})}
      >
       <FontAwesome name="play" size={16} color={"#fff"} />
       <Text className="text-white font-inter/600">Play</Text>
      </TouchableOpacity>
      <View className="flex-row space-x-2 items-center">
       <AntDesign name="calendar" size={20} color={"#fff"} />
       <Text className="font-inter/500 text-[14px] text-white">
        {movie?.release_year}
       </Text>
      </View>
     </View>
    </View>
   </ImageBackground>
  </View>
 );
};

export default Featured;