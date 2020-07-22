import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabHomeScreen: "home",
            },
          },
          Profile: {
            screens: {
              TabProfileScreen: "profile",
            },
          },
          Search: {
            screens: {
              TabSearchScreen: "search",
              album: "album",
              artist: "artist",
              playlist: "playlist",
              track: "track",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
