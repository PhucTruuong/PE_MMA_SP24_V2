import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import Colors from "../constants/Colors";

const FavoriteListItem = ({ product, isChecked, onCheck, navigation }) => {
  const handleCheckChange = (isChecked) => {
    onCheck(product.id, isChecked);
  };

  const handleNavigationDetail = () => {
    navigation.navigate("Detail", { product: product });
  };

  return (
    <Pressable style={styles.container} onPress={handleNavigationDetail}>
      <Checkbox
        style={styles.checkbox}
        color={Colors.light.defaultColor}
        value={isChecked}
        onValueChange={handleCheckChange}
      />

      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {product.perfumeName}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        {product.gender === true ? (
          <View style={{ position: "absolute", top: 15, left: 260 }}>
            <Text
              style={{
                color: "white",
                backgroundColor: "red",
                paddingHorizontal: 10,
                fontSize: 16,
                borderRadius: 10,
                paddingBottom: 3,
              }}
            >
              Gender
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 2,
    marginRight: 5,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: Colors.light.defaultColor,
  },
  checkbox: {
    margin: 8,
  },
});

export default FavoriteListItem;
