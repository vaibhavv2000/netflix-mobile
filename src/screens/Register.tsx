import {useEffect,useState} from "react";
import {
 View,
 Text,
 ImageBackground,
 TextInput,
 Pressable,
 TouchableOpacity,
 Platform,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Link,useNavigation} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";
import {API} from "../lib/API";
import {login} from "../redux/userSlice";
import * as SecureStore from "expo-secure-store";
import NotAuthWrapper from "../HOC/Wrapper";
import {useAppDispatch} from "../lib/redux";
import type {user} from "../utils/types";
import {validateEmail} from "../utils/emailValidator";

const Register = () => {
 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [error,setError] = useState("");
 const [showPassword,setShowPassword] = useState(false);

 const dispatch = useAppDispatch();

 const navigation = useNavigation();

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 }, [error]);

 const {mutate} = useMutation({
  mutationFn: async (user: user) => {
   const res = await API.post("/auth/register",user);
   return res.data;
  },
  onSuccess: async ({user, token}: {user: user, token: string}) => {
   dispatch(login(user));
   await SecureStore.setItemAsync("netflix-token", token);
   navigation.navigate("Home" as never);
  },
  onError: (error: any) => setError(error?.response?.data?.message)
 });

 const handleLogin = async () => {
  if(!password.trim() || !email.trim() || !name.trim()) return setError("All fields are required");
  if(password.length < 8) return setError("Password must be atleast 8 characters");
  if(password.includes(" ")) return setError("Space should not be included in password");
  if(!validateEmail(email)) return setError("Email is Invalid");

  mutate({email,password,name} as any);
 };

 return (
  <View className="flex-1 bg-red-600">
   <ImageBackground
    source={require("../../assets/Images/Cover.jpg")}
    className="h-full w-full justify-center items-center"
    resizeMethod="scale"
   >
    <View className="w-[90%] py-7 flex-col space-y-3 items-center"
     style={{backgroundColor: "bg-[rgba(0,0,0,0.7)]", maxWidth: 380}}
    >
     <Text className="text-4xl text-red-500 w-full px-4 font-inter/500 mb-3">
      Register
     </Text>
     <TextInput
      placeholder="Name"
      cursorColor={"#c4c2c2"}
      onChangeText={(text: string) => setName(text)}
      className="p-3 my-1 mt-3 bg-white font-inter/400 text-[14px] w-[90%]"
      autoCapitalize="none"
     />
     <TextInput
      placeholder="Email"
      cursorColor={"#c4c2c2"}
      onChangeText={(text: string) => setEmail(text)}
      className="p-3 my-1 mt-3 bg-white font-inter/400 text-[14px] w-[90%]"
      autoCapitalize="none"
     />
     <View className="w-[90%] relative my-2">
      <TextInput
       placeholder="Password"
       secureTextEntry={showPassword ? false : true}
       cursorColor={"#c4c2c2"}
       onChangeText={(text: string) => setPassword(text)}
       className="p-3 pr-11 bg-white font-inter/400 text-[14px] w-full"
       autoCapitalize="none"
      />
      <View className="absolute right-0 top-0 justify-center items-center w-10 h-full">
       <Ionicons
        name={!showPassword ? "eye" : "eye-off"}
        size={24}
        color="#666"
        onPress={() => setShowPassword(prev => !prev)}
       />
      </View>
     </View>
     {error && <Text className="text-red-500 w-[90%] font-inter/500">{error}</Text>}
     {Platform.OS === "android" ? (
      <Pressable
       className="p-4 bg-red-500 w-[90%]"
       android_ripple={{color: "#ffffffc5"}}
       onPress={handleLogin}
      >
       <Text className="font-inter/700 text-[16px] text-center text-white">
        Register
       </Text>
      </Pressable>
     ) : (
      <TouchableOpacity
       className="p-3 bg-red-500 w-[90%] rounded-full"
       activeOpacity={0.8}
       onPress={handleLogin}
      >
       <Text className="font-inter/700 text-[14px] text-center text-white">
        Register
       </Text>
      </TouchableOpacity>
     )}
     <View className="w-[90%] -my-2 justify-center flex-row items-center gap-2">
      <Text className="text-white/80 font-inter/400 text-sm">
       Already Have an Account?
      </Text>
      <Text className="underline text-red-500 text-[16px]">
       <Link to={"/Login"}>Login</Link>
      </Text>
     </View>
    </View>
   </ImageBackground>
  </View>
 );
};

export default NotAuthWrapper(Register);