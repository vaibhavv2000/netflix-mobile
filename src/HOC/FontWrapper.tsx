import {useFonts} from "expo-font";
import {
 Inter_100Thin,
 Inter_200ExtraLight,
 Inter_300Light,
 Inter_400Regular,
 Inter_500Medium,
 Inter_600SemiBold,
 Inter_700Bold,
 Inter_800ExtraBold,
 Inter_900Black,
} from "@expo-google-fonts/inter";
import {ActivityIndicator,View} from "react-native";
import type {ReactNode} from "react";
import {useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {login} from "../redux/userSlice";
import {API} from "../lib/API";
import {useAppDispatch} from "../lib/redux";

const FontWrapper = ({children}: {children: ReactNode})=> {
 const [fontsLoaded] = useFonts({
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
 });

 const dispatch = useAppDispatch();

 useEffect(() => {
  const checkAuth = async () => {
   try {
    const token = await SecureStore.getItemAsync("netflix-token");
    if(!token) return;

    const res = await API.get(`/auth/checkauth`);
    dispatch(login(res.data));
   } catch(error) {
    SecureStore.deleteItemAsync("netflix-token");
   };
  };

  checkAuth();
 }, []);

 if(!fontsLoaded) {
  return (
   <View className="flex-1 justify-center items-center">
    <ActivityIndicator size={"large"} color={"red"} />
   </View>
  );
 };

 return children;
};

export default FontWrapper;