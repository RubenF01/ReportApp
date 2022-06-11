import { Map, GoogleApiWrapper } from "google-maps-react";

const ReportMap = (props) => {
  return (
    <Map
      google={props.google}
      style={{ width: "100%", height: "100%" }}
      zoom={10}
      initialCenter={{
        lat: 28.70406,
        lng: 77.102493,
      }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API,
})(ReportMap);
