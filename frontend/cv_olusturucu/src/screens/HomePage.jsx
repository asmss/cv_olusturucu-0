import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PersonelPage } from "./Personel";
export const HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Ionicons name="reader-outline" size={150} color="#fff" />

      <Text style={styles.title}>CV Oluşturucu</Text>
      <Text style={styles.subtitle}>
        Profesyonel CV’ni dakikalar içinde hazırla
      </Text>

      <Pressable
        onPress={() => navigation.navigate("personel")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="document-text-outline" size={22} color="#fff" />
        <Text style={styles.text}>
          Hemen CV oluşturmaya başlayalım
        </Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
   paddingBottom:70
},

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    marginTop:40
  },

  subtitle: {
    fontSize: 14,
    color: "#CBD5E1",
    marginBottom: 32,
    textAlign: "center",
  },
  
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 14,

    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",

  },
});

