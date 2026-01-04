import React,{useState,useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { HomePage } from './src/screens/HomePage';
import { PersonelPage } from './src/screens/Personel';
import { CVProvider } from './src/context/CVContext';
import { SkillsPage } from './src/screens/skillsPage';
import { experiencePage } from './src/screens/experience';
import { EducationPage } from './src/screens/education';
import { ProjectsPage } from './src/screens/projectPage';
import { LanguagesPage } from './src/screens/languages';
import { kaydet } from './src/screens/kaydet';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <CVProvider>
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name = "Home"
          component={HomePage}
          options={{headerShown:false}}  
          />

          <Stack.Screen
          name = "personel"
          component={PersonelPage}
          options={{headerShown:false}}  
          />    
          <Stack.Screen
          name = "skills"
          component={SkillsPage}
          options={{headerShown:false}}  
          />      
          <Stack.Screen
          name = "experience"
          component={experiencePage}
          options={{headerShown:false}}  
          />     
          <Stack.Screen
          name = "education"
          component={EducationPage}
          options={{headerShown:false}}  
          />     
          <Stack.Screen
          name = "projects"
          component={ProjectsPage}
          options={{headerShown:false}}  
          />     
          <Stack.Screen
          name = "language"
          component={LanguagesPage}
          options={{headerShown:false}}  
          />        
          <Stack.Screen
          name = "kaydet"
          component={kaydet}
          options={{headerShown:false}}  
          />                                       
        </Stack.Navigator>
       </NavigationContainer>
     </CVProvider>
  );
}

