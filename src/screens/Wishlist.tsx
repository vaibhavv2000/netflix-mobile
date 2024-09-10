import {View,Text,FlatList} from "react-native";
import ListMovie from "../components/Feed/ListMovie";
import {useAppSelector} from "../lib/redux";

const Wishlist = () => {
 const {wishlist} = useAppSelector(state => state.user.user);
 const {movies} = useAppSelector(state => state.movie);

 return (
  <View className="bg-[#121212] flex-1 p-3 pt-8">
   <Text className="text-white/90 font-inter/600 text-3xl my-2 mb-4">Your Wishlist</Text>
   <FlatList
    data={movies.filter(item => wishlist.includes(item.id))}
    numColumns={1}
    extraData={wishlist}
    className="flex-1"
    renderItem={({item}) => <ListMovie movie={item} />}
   />
  </View>
 );
};

export default Wishlist;