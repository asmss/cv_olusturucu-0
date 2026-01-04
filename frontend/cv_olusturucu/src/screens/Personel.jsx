import React,{useContext, useState} from "react";
import { Text, View, Pressable, StyleSheet,ScrollView,TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CVContext } from "../context/CVContext";
import { KeyboardAvoidingView, Platform } from "react-native";

export const PersonelPage = ({navigation}) => {
     const {cvData,updatePersonal} = useContext(CVContext)

  return (
    <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}

  style={{ flex: 1 ,backgroundColor:"#0F172A"}}
>
    <ScrollView contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"   
     showsVerticalScrollIndicator={false}
       bounces={false}            
      overScrollMode="never" 
     >
      <View >
           <Text style ={styles.header}>Kişisel Bilgiler</Text>
      <Input label="Ad Soyad" value={cvData.personal.name} onChange={v => updatePersonal("name", v)} />
      <Input label="Ünvan (orn: computer engineering)" value={cvData.personal.title} onChange={v => updatePersonal("title", v)} />
      <Input label="Email" value={cvData.personal.email} onChange={v => updatePersonal("email", v)} />
      <Input label="Telefon    (0500 000 00 00)" value={cvData.personal.phone} onChange={v => updatePersonal("phone", v)} />
      <Input label="Github Linki" value={cvData.personal.github} onChange={v => updatePersonal("github", v)} />
      <Input label="Linkedin Linki" value={cvData.personal.likedin} onChange={v => updatePersonal("linkedin", v)} />
      <Input label="Konum" value={cvData.personal.location} onChange={v => updatePersonal("location", v)} />
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        placeholder="Hakkımda"
          placeholderTextColor="#64748B"
        value={cvData.personal.about}
        onChangeText={v => updatePersonal("about", v)}
      />


    </View>
        </ScrollView>
       <View style={styles.footer} >

       <Pressable
        onPress={() => navigation.navigate("Home")}
        style={({ pressed }) => [
          styles.footerBtn,
          pressed && styles.pressed,
        ]}
      > 
        
        <Ionicons name="arrow-back" size={22} color="#fff" />          
      </Pressable>


       <Pressable
        onPress={() => navigation.navigate("skills")}
        style={({ pressed }) => [
          styles.footerBtn,
          pressed && styles.pressed,
        ]}
      > 
        
        <Ionicons name="arrow-forward" size={22} color="#fff" />          
      </Pressable>
      </View>   
 

</KeyboardAvoidingView>
  );
};

const Input = ({ label,value, onChange }) => (
  <View style={styles.inputWrapper}>
    <TextInput
    placeholder={label}
      returnKeyType="next"
      blurOnSubmit={false}
      placeholderTextColor="#64748B"
      style={styles.input}
      value={value}
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F172A",
    padding: 30,
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
    height: 150,
    textAlignVertical: "top",
  },
footer: {
  position: "relative",
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
});


