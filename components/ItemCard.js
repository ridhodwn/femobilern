import { Image, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ItemCard = ({ item }) => {
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

  const navigation = useNavigation();
  const singleTapGesture = Gesture.Tap().onStart(() => {
    navigation.navigate("Detail", { itemId: item.symbol });
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={singleTapGesture}>
        <View style={styles.card} blurRadius={40}>
            <Image style={styles.cardImage} source={{uri: item.icon,}} />
            <View style={styles.cardInfo}>
                <View>
                    <Text style={styles.type}>{item.symbol} / {item.pair}</Text>
                    <Text style={styles.price}>{formatter.format(item.price)}</Text>
                    <Text style={styles.volume}>Vol {formatterVol.format(item.vol).replace("IDR", "").trim()}</Text>
                </View>
                {item.change < 0 ?
                    <View style={styles.pillN}>
                        <Text style={styles.pillText}>{item.change}%</Text>
                    </View>
                    :
                    <View style={styles.pillP}>
                        <Text style={styles.pillText}>+{item.change}%</Text>
                    </View>
                }
            </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor: "rgba(240, 240, 240, 0.30)",
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 5
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
    width: 33,
    height: 33,
    marginEnd: 7
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
  }
});

export default ItemCard;
