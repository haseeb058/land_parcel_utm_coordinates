import { useJsApiLoader } from "@react-google-maps/api";

export const useMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA9NGaaYjYQvWCbqaVdYxMWiA8iIb0VwrI",
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  };

  return {
    containerStyle,
    isLoaded,
  };
};
