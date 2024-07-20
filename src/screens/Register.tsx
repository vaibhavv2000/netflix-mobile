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
import {API} from "../utils/API";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";
import {login} from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import NotAuthWrapper from "../HOC/Wrapper";

type user = {email: string; password: string; name: string};

const Register = (): JSX.Element => {
 const [name,setName] = useState<string>("");
 const [email,setEmail] = useState<string>("");
 const [password,setPassword] = useState<string>("");
 const [error,setError] = useState<string>("");
 const [pwd,setPwd] = useState<boolean>(false);

 const dispatch: AppDispatch = useDispatch();

 const navigation = useNavigation();

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 }, [error]);

 const {mutate} = useMutation({
  mutationFn: async (user: user) => {
   const res = await API.post("/auth/register",user);
   return res.data;
  },
  onSuccess: async () => {
   dispatch(login({email,name}));
   await SecureStore.setItemAsync("netflix-user", JSON.stringify({email}));
   navigation.navigate("Home" as never);
  },
  onError: (error: any) => setError(error.response.data.message)
 });

 const handleLogin = async () => {
  if(!password || !email || !name) return setError("All fields are required");
  if(password.length < 6) return setError("Password must be atleast 6 characters");

  mutate({email,password,name});
 };

 return (
  <View className="flex-1 bg-red-600">
   <ImageBackground
    source={{uri: "https://ceotudent.com/wp-content/uploads/2020/05/netflix-poster.jpg",}}
    className="h-full w-full justify-center items-center"
    resizeMethod="scale"
   >
    <View className="w-[90%] py-7 flex-col space-y-3 items-center"
     style={{backgroundColor: "bg-[rgba(0,0,0,0.7)]", maxWidth: 380}}
    >
     <Text className="text-5xl text-red-500 text-center font-inter_500 mb-3">
      Register
     </Text>
     <TextInput
      placeholder="Name"
      cursorColor={"#c4c2c2"}
      onChangeText={(text: string) => setName(text)}
      className="p-3 py-2.5 my-1 mt-3 bg-white font-inter_400 text-[16px] w-[90%]"
      autoCapitalize="none"
     />
     <TextInput
      placeholder="Email"
      cursorColor={"#c4c2c2"}
      onChangeText={(text: string) => setEmail(text)}
      className="p-3 py-2.5 my-1 mt-3 bg-white font-inter_400 text-[16px] w-[90%]"
      autoCapitalize="none"
     />
     <View className="w-[90%] relative">
      <TextInput
       placeholder="Password"
       secureTextEntry={pwd ? false : true}
       cursorColor={"#c4c2c2"}
       onChangeText={(text: string) => setPassword(text)}
       className="p-3 py-2.5 pr-11 bg-white font-inter_400 text-[16px] w-full"
       autoCapitalize="none"
      />
      <View className="absolute right-0 top-0 justify-center items-center w-10 h-full">
       <Ionicons
        name={!pwd ? "eye" : "eye-off"}
        size={24}
        color="#666"
        onPress={() => setPwd(!pwd)}
       />
      </View>
     </View>
     {error && <Text className="text-red-500 w-[90%] font-inter_500">{error}</Text>}
     {Platform.OS === "android" ? (
      <Pressable
       className="p-3 bg-red-500 w-[90%] rounded-full"
       android_ripple={{color: "#ffffffc5"}}
       onPress={handleLogin}
      >
       <Text className="font-inter_700 text-[16px] text-center text-white">
        Register
       </Text>
      </Pressable>
     ) : (
      <TouchableOpacity
       className="p-3 bg-red-500 w-[90%] rounded-full"
       activeOpacity={0.8}
       onPress={handleLogin}
      >
       <Text className="font-inter_700 text-[16px] text-center text-white">
        Register
       </Text>
      </TouchableOpacity>
     )}
     <View className="w-[90%] -my-2 text-white justify-center flex-row items-center gap-2">
      <Text className="text-white font-inter_400 text-sm">
       Already Have an Account?
      </Text>
      <Text className="underline text-red-500">
       <Link to={"/Login"}>Login</Link>
      </Text>
     </View>
    </View>
   </ImageBackground>
  </View>
 );
};

export default NotAuthWrapper(Register);