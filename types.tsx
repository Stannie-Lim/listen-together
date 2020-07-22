import { NavigationStackProp } from 'react-navigation-stack';

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Props = {
  navigation: NavigationStackProp<{ userId: string }>;
  route: NavigationStackProp<{ userId: string }>;
};