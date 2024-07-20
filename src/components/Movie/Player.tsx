import {useRef,useState,memo} from "react";
import {View,Text,TouchableOpacity} from "react-native";
import {Video,ResizeMode} from "expo-av";
import Slider from "@react-native-community/slider";
import {SimpleLineIcons} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const url = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

interface props {
 toggleScreen: any;
 isFullScreen: boolean;
};

const Player = ({toggleScreen,isFullScreen}: props) => {
 const [isPlaying,setIsPlaying] = useState<boolean>(false);
 const videoRef = useRef<Video>(null);
 const [duration,setDuration] = useState<string>("00:00");
 const [currentTime,setCurrentTime] = useState<string>("00:00");
 const [progress,setProgress] = useState<number>(0);

 const getCurrentTime = (time: number) => {
  let currentMin = Math.floor(time / 60);
  let currentSec: string | number = Math.floor(time % 60);
  if(currentSec < 10) currentSec = `0${currentSec}`;
  setCurrentTime(`${currentMin}:${currentSec}`);
 };

 const getDuration = (time: number) => {
  let totalMin = Math.floor(time / 60);
  let totalSec: string | number = Math.floor(time % 60);
  if(totalSec < 10) totalSec = `0${totalSec}`;
  setDuration(`${totalMin}:${totalSec}`);
 };

 const getProgress = (cT: number,tT: number) => {
  let progress = (cT / tT) * 100;
  setProgress(progress);
 };

 const handlePlay = () => {
  if(!videoRef.current) return;

  if(isPlaying) {
   setIsPlaying(false);
   videoRef.current.pauseAsync();
  } else {
   setIsPlaying(true);
   videoRef.current.playAsync();
  };
 };

 return (
  <View className="relative">
   <Video
    ref={videoRef}
    className={`w-full ${isFullScreen ? "h-full" : "h-60"}`}
    source={{uri: url}}
    useNativeControls={false}
    resizeMode={ResizeMode.COVER}
    isLooping={false}
    onPlaybackStatusUpdate={(status: any) => {
     getCurrentTime(status.positionMillis / 1000);
     getDuration(status.playableDurationMillis / 1000);
     getProgress(
      status.positionMillis / 1000,
      status.playableDurationMillis / 1000
     );
    }}
   />
   <View className="absolute top-0 left-0 h-full w-full">
    <View className="flex-1 justify-center items-center z-50">
     <TouchableOpacity onPress={handlePlay} className="h-8 w-8 justify-center items-center">
     {!isPlaying ? <FontAwesome name="play" size={24} color={"#fff"} /> : 
      <MaterialCommunityIcons name="pause" size={32} color={"#fff"} />
     }
     </TouchableOpacity>
    </View>
    <View className="flex-row items-center px-6 space-x-2 py-4 z-50">
     <Text className="text-white font-inter_400 text-[12px]">
      {currentTime}
     </Text>
     <Slider
      style={{flex: 1}}
      minimumValue={0}
      maximumValue={100}
      value={progress}
      minimumTrackTintColor="red"
      maximumTrackTintColor="#999"
      thumbTintColor="red"
     />
     <Text className="text-white font-inter_400 text-[12px] mr-3">
      {duration}
     </Text>
     <SimpleLineIcons
      name={isFullScreen ? "size-actual" : "size-fullscreen"}
      size={18}
      color="#fff"
      onPress={() => toggleScreen(isFullScreen ? "vert" : "horiz")}
     />
    </View>
   </View>
  </View>
 );
};

export default memo(Player);