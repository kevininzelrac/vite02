import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Link, useParams } from "react-router-native";
import { REACT_APP_API } from "@env";

export default function Page() {
  const [page, setPage] = useState([]);
  let { targetPage } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          REACT_APP_API + "/api/pages/" + targetPage
        );
        const data = await response.json();
        setPage(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    })();
  }, [targetPage]);

  return (
    <View style={styles.page}>
      <Link to="/Menu">
        <Text> « Back to menu</Text>
      </Link>
      <Text>{page.label}</Text>
      {page.picture && (
        <Image
          source={{ uri: page.picture }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    //zIndex: "-1",
    flex: 1,
    width: "100%",
  },
});
