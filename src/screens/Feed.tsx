import {StatusBar} from "expo-status-bar";
import {View,ScrollView} from "react-native";
import Featured from "../components/Feed/Featured";
import {API} from "../lib/API";
import {useEffect} from "react";
import Lists from "../components/Feed/Lists";
import {addMovies} from "../redux/movieSlice";
import {useAppDispatch, useAppSelector} from "../lib/redux";
import {useNavigation} from "@react-navigation/native";

let lists = ["Featured Movies","New Releases","Popular Movies","Horror Thriller","Comedy Movies"];

const Feed = () => {
 const {movies} = useAppSelector(state => state.movie);
 const dispatch = useAppDispatch();
 const {navigate} = useNavigation();

 useEffect(() => {
  async function fetcher() {
   try {
    let {data} = await API.get(`/movie/movies`);
    dispatch(addMovies(data));
   } catch(error: any) {
    navigate("/" as never);
   };
  };
  
  if(movies.length < 1) fetcher();
 },[movies]);


 if(!movies.length) return <View className="flex-1 bg-black"></View>

 return (
  <View className="flex-1 bg-[#151515]">
   <StatusBar backgroundColor="transparent" style="light" />
   <ScrollView>
    <Featured />
    {lists.map((item: string,index: number) => <Lists title={item} key={`list-${index}`} />)}
   </ScrollView>
  </View>
 );
};

export default Feed;