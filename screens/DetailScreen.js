import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium
} from "@expo-google-fonts/dev";
import ellipse1 from "../assets/Ellipse_25.png";
import ellipse2 from "../assets/Ellipse_24.png";

export default function DetailScreen({ route, navigation }) {
  const { itemId } = route.params;
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium
  });

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const formatterVol = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: "code",
  });
  const formatterST = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: "code",
    minimumFractionDigits: 6,
    maximumFractionDigits: 6
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
        let result = data.data.filter(item => item.symbol === itemId)[0];
        console.log(result)
        setData(result)
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

  if (!fontsLoaded) {
    return AppLoading;
  } else {
    return (
        <View style={styles.container}>
            <View style={styles.ellipse1Container}>
                <Image source={ellipse1} style={styles.ellipse1}></Image>
            </View>
            <View style={styles.ellipse2Container}>
                <Image source={ellipse2} style={styles.ellipse2}></Image>
            </View>
            <View style={styles.card} blurRadius={40}>
                <Image style={styles.cardImage} source={{uri: data.icon,}} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{data.name.toUpperCase()}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.type}>{data.symbol} / {data.pair}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>{formatter.format(data.price)}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    {data.change < 0 ?
                        <View style={styles.pillN}>
                            <Text style={styles.pillText}>{data.change}%</Text>
                        </View>
                        :
                        <View style={styles.pillP}>
                            <Text style={styles.pillText}>+{data.change}%</Text>
                        </View>
                    }
                </View>
                <View style={styles.subtitleContainerV}>
                    <Text style={styles.volume}>Vol {formatterVol.format(data.vol).replace("IDR", "").trim()}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.cardInfo}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Taker Fee</Text>
                        <Text style={styles.detailInfo}>{formatter.format(data.taker_fee)}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Maker Fee</Text>
                        <Text style={styles.detailInfo}>{formatter.format(data.maker_fee)}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Min. Symbol Transaction</Text>
                        <Text style={styles.detailInfo}>{formatterST.format(data.min_symbol_transaction).replace("IDR", "").trim()}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Min. Pair Transaction</Text>
                        <Text style={styles.detailInfo}>{formatterVol.format(data.min_pair_transaction).replace("IDR", "").trim()}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Min. Sell Huobi</Text>
                        <Text style={styles.detailInfo}>{data.min_sell_huobi}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Price Precision</Text>
                        <Text style={styles.detailInfo}>{data.price_precision}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Quantity Precision</Text>
                        <Text style={styles.detailInfo}>{data.quantity_precision}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Price Low</Text>
                        <Text style={styles.detailInfo}>{formatter.format(data.low)}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Price High</Text>
                        <Text style={styles.detailInfo}>{formatter.format(data.high)}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailInfo}>Volume Coin</Text>
                        <Text style={styles.detailInfo}>{formatterVol.format(data.volume_coin).replace("IDR", "").trim()}</Text>
                    </View>
                </View>
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
    left: 280,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    marginVertical: 5,
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginBottom: 30,
    overflow: "hidden",
    backgroundColor: "rgba(240, 240, 240, 0.30)",
    alignItems: "center",
  },
  pillN: {
    backgroundColor: "#F35242",
    borderRadius: 20,
    width: 72,
    height: 30,
    paddingVertical: 3,
    alignItems: 'center'
  },
  pillP: {
    backgroundColor: "#24A959",
    borderRadius: 20,
    width: 72,
    height: 30,
    paddingVertical: 3,
    alignItems: 'center'
  },
  pillText: {
    color: '#FFF',
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 0.24,
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  type: {
    color: '#6E7499',
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.28
  },
  price: {
    color: '#605757',
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.32,
  },
  volume: {
    color: '#24A959',
    fontFamily: "Roboto_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  title: {
    color: '#605757',
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 0.32,
  },
  titleContainer: {
    marginTop: 12
  }, 
  subtitleContainer: {
    marginTop: 3
  },
  subtitleContainerV: {
    marginTop: 5
  },
  line: {
    width: 260,
    height: 1,
    backgroundColor: '#6E7499',
    opacity: 0.4,
    marginVertical: 20
  },
  cardInfo: {
    width: 260,
  },
  detailItem: {
    flexDirection: 'row',
    marginVertical: 2
  },
  detailInfo: {
    color: '#605757',
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    width: 160
  }
});