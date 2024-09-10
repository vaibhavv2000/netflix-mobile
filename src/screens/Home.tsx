import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AuthWrapper from "../HOC/Wrapper";
import Feed from "./Feed";
import Search from "./Search";
import Upload from "./Upload";
import MyList from "./Wishlist";
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Home = () => {
 return (
  <Tab.Navigator
   screenOptions={{
    headerShown: false,
    tabBarStyle: {
     backgroundColor: "#181818",
     borderWidth: 0,
     borderColor: "#111",
     shadowColor: "#111",
     borderTopWidth: 0,
     height: 60,
    },
    tabBarLabelStyle: {color: "#fff",fontFamily: "Inter_500Medium",marginTop: -8,marginBottom: 5},
   }}
  >
   <Tab.Screen
    name="Feed"
    component={Feed}
    options={{
     tabBarIcon: ({focused}) => (
      <MaterialIcons name="rss-feed" size={focused ? 28 : 24} color={focused ? "#fff" : "#777"} />
     ),
     tabBarLabelStyle: {display: "none"}
    }}
   />
   <Tab.Screen
    name="Search"
    component={Search}
    options={{
     tabBarIcon: ({focused}) => (
      <MaterialCommunityIcons name="movie-search" size={focused ? 28 : 24} color={focused ? "#fff" : "#777"} />
     ),
     tabBarLabelStyle: {display: "none"}
    }}
   />
   <Tab.Screen
    name="Upload"
    component={Upload}
    options={{
     tabBarIcon: ({focused}) => (
      <MaterialCommunityIcons name="movie-filter-outline" size={focused ? 28 : 24} color={focused ? "#fff" : "#777"} />
     ),
    tabBarLabelStyle: {display: "none"} 
    }}
   />
   <Tab.Screen
    name="MyList"
    component={MyList}
    options={{
     tabBarIcon: ({focused}) => (
      <MaterialIcons name="local-movies" size={focused ? 28 : 24} color={focused ? "#fff" : "#777"} />
     ),
     tabBarLabelStyle: {display: "none"} 
    }}
   />
  </Tab.Navigator>
 );
};

export default AuthWrapper(Home,true);