import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
    useFonts,
    Poppins_500Medium,
    Poppins_400Regular
} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular
  });

  const navigation = useNavigation();
  const onPress = () => navigation.navigate("Home");

  if (!fontsLoaded) {
    return AppLoading;
  } else {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSection}>
                    <Icon style={styles.inputIcon} name="email" size={20} color="#000"/>
                    <TextInput style={styles.input} placeholder="Email"/>
                </View>
                <View style={styles.inputSection}>
                    <Icon style={styles.inputIcon} name="lock" size={20} color="#000"/>
                    <TextInput style={styles.input} placeholder="Password"/>
                    <Icon style={styles.inputIconEye} type='font-awesome' name="eye-slash" size={20} color="#000"/>
                </View>
            </View>
            <TouchableOpacity style={styles.enterButton} onPress={onPress}><Text style={styles.enterButtonText}>Masuk ke Akun</Text></TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontWeight: "500",
    fontSize: 20,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 263,
    height: 40,
    marginHorizontal: 12,
    fontFamily: "Poppins_500Medium"
  },
  inputSection: {
    width: 330,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginTop: 20,
    paddingBottom: 5
  },
  inputIconEye: {
    zIndex: 1,
  },
  enterButton: {
    marginTop: 40,
    backgroundColor: '#A172FB',
    width: 227,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "center",
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  }
});