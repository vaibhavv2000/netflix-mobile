import {Component,ReactNode,Fragment} from "react";
import {Image, View} from "react-native";

interface props {
 children: ReactNode;
};

interface state {
 error: boolean;
};

let image = "https://img.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg";

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
   <Fragment>
    {!error ? children : (
    <View className="flex-1 justify-center items-center bg-white">
     <Image source={{ uri: image}} className="h-80 w-full" />
    </View>
    )}
   </Fragment>
  );
 };
};

export default ErrorBoundary;