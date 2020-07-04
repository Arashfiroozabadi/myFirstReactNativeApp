// useColorScheme from react-native does not support web currently. You can replace
// this with react-native-appearance if you would like theme support on web.
import { useSelector } from "react-redux";

type Theme = {
  theme: "dark" | "light";
};

export default function useColorScheme(): string {
  const theme = useSelector((state: Theme) => state.theme);

  return theme;
}
