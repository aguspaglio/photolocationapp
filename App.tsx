import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import MainScreen from "./src/screens/MainScreen";
import { RootStackParamList } from "./src/types/types";
import CameraScreen from "./src/screens/CameraScreen";
import PhotoScreen from "./src/screens/PhotoScreen";
import { TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
         screenOptions={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 16 }}>
              <Entypo name="chevron-thin-left" size={24} color="#6653CF" />
            </TouchableOpacity>
          ),
        })}
        initialRouteName="Main"
      >
        <Stack.Screen
          options={{ headerLeft: () => null, headerTitle: 'PhotoLocationApp' }}
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
