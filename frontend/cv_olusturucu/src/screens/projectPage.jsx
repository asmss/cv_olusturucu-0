import React, { useContext } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CVContext } from "../context/CVContext";
import { KeyboardAvoidingView, Platform } from "react-native";

export const ProjectsPage = ({ navigation }) => {
  const {
    cvData,
    addProject,
    updateProject,
    removeProject,
  } = useContext(CVContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0F172A" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <Text style={styles.header}>Projeler</Text>

        {cvData.projects.map((project, index) => (
          <View key={index} style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Proje adı"
              placeholderTextColor="#64748B"
              value={project.name}
              onChangeText={v =>
                updateProject(index, "name", v)
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Kullanılan Teknolojiler (React, Node...)"
              placeholderTextColor="#64748B"
              value={project.tech}
              onChangeText={v =>
                updateProject(index, "tech", v)
              }
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Proje açıklaması"
              placeholderTextColor="#64748B"
              multiline
              numberOfLines={4}
              value={project.description}
              onChangeText={v =>
                updateProject(index, "description", v)
              }
            />

            <Pressable
              onPress={() => removeProject(index)}
              style={styles.removeBtn}
            >
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.removeText}>Sil</Text>
            </Pressable>
          </View>
        ))}

        <Pressable onPress={addProject} style={styles.addBtn}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addText}>Proje Ekle</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.footerBtn} onPress={() => navigation.navigate("education")}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </Pressable>

        <Pressable style={styles.footerBtn} onPress={() => navigation.navigate("language")}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F172A",
    padding: 35,
    paddingBottom: 80,
    paddingTop:80
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 20,
    marginTop: 10,
  },

  inputWrapper: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    color: "#CBD5E1",
    marginBottom: 6,
    marginLeft: 2,
  },

  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#F8FAFC",
  },

  textArea: {
    height: 110,
    textAlignVertical: "top",
  },
footer: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,

  flexDirection: "row",
  justifyContent: "space-between",
  padding: 10,

  backgroundColor: "#020617",
  borderTopWidth: 1,
  borderTopColor: "#1E293B",
},

footerBtn: {
  backgroundColor: "#2563EB",
  padding: 16,
  borderRadius: 16,

  shadowColor: "#2563EB",
  shadowOpacity: 0.35,
  shadowRadius: 10,
  elevation: 6,
},

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,

    shadowColor: "#2563EB",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  cardTitle: {
    color: "#E2E8F0",
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 10,
    padding: 12,
    color: "#F8FAFC",
    marginBottom: 10,
  },

  removeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  removeText: {
    color: "#F87171",
    fontSize: 13,
  },

  addBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});