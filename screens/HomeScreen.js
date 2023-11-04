import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput
} from "react-native";
import AppLoading from "expo-app-loading";
import { Icon } from "@rneui/base";
import ItemCard from "../components/ItemCard";
import {
    useFonts,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium
} from "@expo-google-fonts/dev";
import ellipse1 from "../assets/Ellipse_25.png";
import ellipse2 from "../assets/Ellipse_24.png";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium
  });

  useEffect(() => {
    fetch("https://www.jsonkeeper.com/b/DCQG")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something wrong!");
        }
        return response.json();
      })
      .then((data) => {
        let results = data.data;
        setData(results)
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <Text>
        It seems we ran into some troubles. Please try again in a few minutes.
      </Text>
    );
  }

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginTop: 15 }}
      />
    );
  }

  const renderItem = ({ item }) => <ItemCard item={item} />;
  if (!fontsLoaded) {
    return AppLoading;
  } else {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.searchSection}>
                    <TextInput style={styles.input} placeholder="Cari Aset"/>
                    <Icon style={styles.searchIcon} type='font-awesome' name="search" size={20} color="#8D93A6"/>
                </View>
            </View>
            <View style={styles.ellipse1Container}>
                <Image source={ellipse1} style={styles.ellipse1}></Image>
            </View>
            <View style={styles.ellipse2Container}>
                <Image source={ellipse2} style={styles.ellipse2}></Image>
            </View>
            <View style={styles.cards}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.symbol}
                horizontal={false}
                numColumns={1}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  cards: {
    flex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#DFDFDF',
    borderRadius: 20,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 45
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
  circle1: {
    width: 352,
    height: 352,
    flexShrink: 0,
    borderRadius: 352,
    borderStyle: 'solid',
    borderColor: 'rgba(249, 0, 254, 0.31)',
    border: 60,
  },
  ellipse1Container: {
    position: 'absolute',
    top: 70,
  },
  ellipse2Container: {
    position: 'absolute',
    top: 380,
    left: 280
  }
});