import React, { useState } from "react";
import { Image, Text, StyleSheet, Dimensions, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default function GooglePlacesInput() {
  let myMap;
  const [coordinate, setCoordinate] = useState(null);
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => {
          setCoordinate({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
          setPlace(details.name);
          setDescription(data.description);
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "YOUR_API_KEY",
          language: "en", // language of the results
          // types: 'establishment' // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "100%",
          },
          description: {
            fontWeight: "bold",
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          // type: 'cafe'
        }}
        GooglePlacesDetailsQuery={
          {
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            // fields: "name,rating,formatted_phone_number",
          }
        }
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
      />
      {coordinate && (
        <View style={styles.container}>
          <Text>{place}</Text>
          <Text>{description}</Text>
          <MapView
            ref={(ref) => (myMap = ref)}
            style={styles.mapStyle}
            region={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={coordinate}
              title={place}
              description={description}
              onPress={() => {
                myMap.fitToCoordinates([coordinate], {
                  edgePadding: { top: 10, bottom: 10, left: 10, right: 10 },
                  animated: true,
                });
              }}
            />
          </MapView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: 200,
    height: 200,
  },
});
