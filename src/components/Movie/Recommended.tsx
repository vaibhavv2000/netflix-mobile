import {memo} from "react";
import type {movie} from "../../utils/types";
import {useNavigation} from "@react-navigation/native";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const Recommended = memo(({item}: {item: movie}) => {
 const navigation = useNavigation();
  
 return (
  <TouchableOpacity
   className="flex-row items-start p-3 space-x-2"
   activeOpacity={0.8}
   // @ts-ignore
   onPress={() => navigation.push("Movie",{id: item.id})}
  >
   <Image source={{uri: item.thumbnail}} className="h-24 w-24 rounded-md" />
   <View className="flex-1 w-full">
    <View className="flex-row items-center space-x-4">
     <Text className="text-white font-inter/600">
      {item.movie_name}
     </Text>
     <View className="flex-row items-center space-x-2">
      <FontAwesome name="star" size={18} color={"gold"} />
      <Text className="text-white font-inter/500 text-[12px]">
       {item.rating}
      </Text>
     </View>
    </View>
    <Text
     className="text-white/80 font-inter/500"
     style={{flexWrap: "wrap",width: "100%"}}
    >
     {item.description.slice(0,100)}...
    </Text>
   </View>
  </TouchableOpacity>
 );
});

export default Recommended;