import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import Colors from "../constants/Colors";
import { LikedProductsContext } from "../providers/LikedProductProvider";

const DetailsScreen = () => {
  const route = useRoute();
  const toast = useToast();
  const isFocused = useIsFocused();

  const { product } = route.params;
  const { likedProducts, addProductToLikes, removeProductFromLikes } =
    useContext(LikedProductsContext);
  const isLike = likedProducts.includes(product.id.toString());

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleLikeProduct = async () => {
    const productId = product.id.toString();

    try {
      if (isLike) {
        await removeProductFromLikes(productId);
      } else {
        await addProductToLikes(productId);
      }
      toast.show(isLike ? "Unliked!" : "Liked!", {
        type: "success",
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleLikeProduct}>
          <View style={styles.icon}>
            {isLike && isFocused ? (
              <Ionicons name="heart-sharp" size={24} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={24} color="red" />
            )}
          </View>
        </TouchableOpacity>

        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.separator} />

        <Text style={styles.title}>{product.perfumeName}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.gender}>
          <Text style={styles.genderText}>Gender </Text>
          {product.gender ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            <Ionicons name="close-circle" size={24} color="red" />
          )}
        </View>

        <Text style={styles.description}>Description: </Text>
        <Text>
          {isDescriptionExpanded || !product.perfumeDescription
            ? product.perfumeDescription
            : `${product.perfumeDescription.substring(0, 100)}... `}
          <Text onPress={toggleDescription} style={styles.seeMore}>
            {isDescriptionExpanded ? " See Less" : " See More"}
          </Text>
        </Text>
        <Text style={styles.company}>
          Company:
          <Text style={styles.companyName}>{product.company}</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: { width: "100%", aspectRatio: 1 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.defaultColor,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    alignItems: "flex-end",
  },
  gender: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  seeMore: {
    color: "grey",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  company: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 100,
  },
  companyName: {
    color: "grey",
  }
});

export default DetailsScreen;
