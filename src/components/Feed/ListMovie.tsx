import {Image,View,Text} from "react-native";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import type {movie} from "../../utils/types";

const ListMovie = ({movie}: {movie: movie;}) => {
 const navigation = useNavigation();

 return (
  <TouchableOpacity
   className="space-x-2 bg-black my-4"
   activeOpacity={0.8}
//    @ts-ignore
   onPress={() => navigation.push("Movie",{id: movie.id})}
  >
   <Image source={{uri: movie.thumbnail}} className="h-44 w-full rounded-sm" />
   <View className="flex-1 w-full p-2 py-4">
    <View className="flex-row items-center space-x-4">
     <Text className="text-white font-inter/600 text-xl">
      {movie.movie_name}
     </Text>
     <View className="flex-row items-center space-x-2">
      <FontAwesome name="star" size={18} color={"gold"} />
      <Text className="text-white font-inter/600">
       {movie.rating}
      </Text>
     </View>
    </View>
    <View className="flex-row mt-2">
     <Text className="text-white/80 rounded-full text-xs font-inter/600 bg-[#151515] p-2 max-w-max">
      {movie.genre}
     </Text>  
    </View>
    <Text className="text-white/90 font-inter/400 text-[15px] flex-wrap my-2 w-full">
     {movie.description.length > 200 ? `${movie.description.slice(0,)}...` : movie.description}
    </Text>
    <View className="mt-1 flex-row space-x-3">
     <View className="flex-row space-x-2 items-center">
      <AntDesign name="calendar" size={18} color={"#fff"} />
      <Text className="font-inter/600 text-[12px] text-white">
       {movie?.release_year}
      </Text>
     </View>
     <View className="flex-row items-center space-x-2">
      <Ionicons name="time-outline" size={20} color="#fff" />
      <Text className="font-inter/600 text-[12px] text-white">{movie?.length}</Text>
     </View>
    </View>
   </View>
  </TouchableOpacity>
 );
};

export default ListMovie;