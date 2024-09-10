import {useState,useEffect} from "react";
import {View,Text,FlatList} from "react-native";
import type {movie} from "../../utils/types";
import {useAppSelector} from "../../lib/redux";
import Movie from "./Movie";

interface props {
 title: string;
};

const Lists = (props: props) => {
 const {title} = props;
 const [list,setList] = useState<movie[]>([]);
 const {movies} = useAppSelector(state => state.movie);
 const {wishlist} = useAppSelector(state => state.user.user);

 useEffect(() => {
  setList([...movies].sort(() => Math.random() - 0.5));
 }, []);

 return (
  <View className="bg-black">
   <Text className="text-white text-xl font-inter/600 pl-1 my-2 mt-4">
    {title}
   </Text>
   <FlatList
    // className="px-8 gap-4"
    data={list}
    extraData={[list, movies, wishlist]}
    keyExtractor={(_,index) => `random_movie-${index}`}
    renderItem={({item}) => <Movie movie={item} />}
    horizontal
    scrollEnabled
   />
  </View>
 );
};

export default Lists;