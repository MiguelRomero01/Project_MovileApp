import { useNavigation } from "@react-navigation/native";
import { Button, SafeAreaView, Text, StyleSheet} from "react-native"


const Home = () => {
     const navigation = useNavigation();

     return(
          <SafeAreaView style={Styles.container}>
               <Text style={Styles.texto}>Esta es mi App e imagen</Text>
          </SafeAreaView>
     );
};

export default Home

const Styles = StyleSheet.create({
     container:{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
     },

     texto:{
          fontSize:18,
          marginBottom:20,
     },

     imagen:{
          width:100,
          height:100,
     }
});