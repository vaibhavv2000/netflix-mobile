import {Component,type ReactNode} from "react";
import {Image, View} from "react-native";

interface props {
 children: ReactNode;
};

interface state {
 error: boolean;
};

class ErrorBoundary extends Component<props,state> {
 constructor(props: props) {
  super(props);
  this.state = {
   error: false,
  };
 };

 static getDerivedStateFromError() {
  return {error: true};
 };
 
 render() {
  const {error} = this.state;
  const {children} = this.props;
 
  return (
   <>
    {!error ? children : 
    <View className="flex-1 justify-center items-center bg-white">
     <Image source={require("../../assets/Images/Error.jpg")} className="h-80 w-full" />
    </View>}
   </>  
  );
 };
};

export default ErrorBoundary;