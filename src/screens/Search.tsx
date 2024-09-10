import {useState,useEffect} from "react";
import {
 View,
 Text,
 Image,
 TextInput,
 Pressable,
 ScrollView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native"
import {StatusBar} from "expo-status-bar";
import {movie} from "../utils/types";
import {useAppSelector} from "../lib/redux";
import Recommended from "../components/Movie/Recommended";

const Search = () => {
 const [query,setQuery] = useState("");
 const [list,setList] = useState<movie[]>([]);
 const [randomMovies,setRandomMovies] = useState<movie[]>();

 const {movies} = useAppSelector(state => state.movie);

 const navigation = useNavigation();

 useEffect(() => {
  if(query) {
   let name = query.toLocaleLowerCase();
   setList(movies.filter(item => item.movie_name.toLowerCase().includes(name)));
  } else setList([]);
 }, [query]);

 useEffect(() => {
  setRandomMovies([...movies].sort(() => Math.random() - 0.5).slice(0,8));
 },[]);

 return (
  <ScrollView 
   className="flex-1 bg-[#151515] py-10" 
   contentContainerStyle={{paddingBottom: 30}}
  >
   <StatusBar style="light" />
   <View className="bg-black w-[95%] flex-row items-center mx-auto p-1 px-3 rounded-sm">
    <Ionicons name="search" size={24} color={"#fff"} />
    <TextInput
     className="text-white font-inter/500 p-2.5 flex-1"
     cursorColor={"#999"}
     value={query}
     placeholderTextColor={"#999"}
     placeholder="Search Movies..."
     onChangeText={(text: string) => setQuery(text)}
    />
    <Feather name="x" size={24} color={"#fff"} onPress={() => setQuery('')} />
   </View>
   <View className="pt-3">
    <Text className="text-xl font-inter/600 mb-1 text-white/90 pl-3">Recommended Movies</Text>
    {randomMovies?.map((item) => <Recommended item={item} key={`movie-${item.id}`} />)}
   </View>
   <View className={`bg-black w-[95%] mx-auto mt-0 ${list.length && 'border-t-0.5 border-t-gray-500'} absolute top-14 left-2.5`}>
    <ScrollView>
    {list.map((movie,index) => (
     <Pressable
      key={`movie_${index}`}
      android_ripple={{color: "rgba(255,255,255,0.15555)"}}
      className="space-x-2 flex-row items-center py-3 px-2 overflow-hidden"
      // @ts-ignore
      onPress={() => navigation.navigate("Movie",{id: m.id})}
     >
      <Image
       source={{uri: movie?.thumbnail}}
       className="h-10 w-10 rounded-md"
      />
      <View className="space-y-0">
       <Text className="text-white font-inter/700">
        {movie?.movie_name}
       </Text>
       <Text className="text-white/80">
        {movie?.description.slice(0,35)}...
       </Text>
      </View>
     </Pressable>
     ))}
    </ScrollView>
   </View>
  </ScrollView>
 );
};

export default Search;