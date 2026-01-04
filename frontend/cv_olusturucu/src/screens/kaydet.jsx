import React, { useContext, useState } from "react";
import { Text, View, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CVContext } from "../context/CVContext";
import api from "../service/api";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export const kaydet = ({ navigation }) => {
  const { cvData } = useContext(CVContext);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const cvId = uuid.v4();
      const payload = {
        ...cvData,
        cv_id: cvId,
        pdfPath: "placeholder.pdf",
      };

      const response = await api.post("/cv_save", payload);


      const fileName = response.data.pdfPath.split('/').pop();
      const pdfUrl = `https://cv-olusturucu-0.onrender.com/pdfs/${fileName}`;

      console.log("İndirilecek PDF adresi:", pdfUrl);

      const localUri = `${FileSystem.documentDirectory}${cvId}.pdf`;

      const downloadRes = await FileSystem.downloadAsync(pdfUrl, localUri);

      if (downloadRes.status !== 200) {
        throw new Error("Sunucudan PDF dosyası alınamadı. Lütfen Render loglarını kontrol edin.");
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadRes.uri, { 
          mimeType: 'application/pdf', 
          dialogTitle: "CV'nizi Paylaşın" 
        });
      }

      Alert.alert("Başarılı", "CV cihazınıza başarıyla indirildi!");

    } catch (error) {
      console.log("Kaydetme Hatası:", error);
      Alert.alert("Hata", error.message || "Bir şeyler ters gitti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="cloud-download-outline" size={120} color="#34D399" />
      <Text style={styles.title}>CV'nizi Kaydedin</Text>
      <Text style={styles.subtitle}>Uygulama PDF'i oluşturup telefonunuza indirecektir</Text>

      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : 
        <>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>CV'yi Kaydet ve İndir</Text>
        </>}
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={({ pressed }) => [styles.homeButton, pressed && styles.pressed]}
      >
        <Ionicons name="home-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center", padding: 25 },
  title: { fontSize: 26, fontWeight: "700", color: "#fff", marginVertical: 10, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#CBD5E1", textAlign: "center", marginBottom: 40 },
  saveButton: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#16A34A", paddingVertical: 16, paddingHorizontal: 30, borderRadius: 14, marginBottom: 20 },
  homeButton: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#2563EB", paddingVertical: 16, paddingHorizontal: 30, borderRadius: 14 },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});