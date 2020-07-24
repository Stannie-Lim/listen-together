import { NavigationStackProp } from 'react-navigation-stack';

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
};

export type BottomTabParamList = {
  Queue: undefined;
  Playlists: undefined;
  Search: undefined;
};

export type QueueParamList = {
  Queue: undefined;
};

export type PlaylistParamList = {
  Playlists: undefined;
};

export type SearchParamList = {
  Search: undefined;
};

export type Props = {
  navigation: NavigationStackProp<{ userId: string }>;
  route: NavigationStackProp<{ userId: string }>;
  roomCode: string;
};