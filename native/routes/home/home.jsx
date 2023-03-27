import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import DateFormat from "../../utils/DateFormat";
import { REACT_APP_API } from "@env";

export default function Home() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(REACT_APP_API + "/api/posts");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    })();
  }, []);
  return (
    <View style={styles.body}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.author}>
              <Image
                source={{ uri: item.author.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.name}>{item.author.name}</Text>
            </View>

            <Image source={{ uri: item.picture }} style={styles.picture} />
            <View style={styles.description}>
              <Text style={styles.name}>{item.author.name}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <Text>{item.about}</Text>
            <Text style={styles.date}>{DateFormat(item.date)}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  post: {
    borderColor: "gainsboro",
    borderWidth: 1,
    marginBottom: 20,
  },
  author: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    margin: 3,
  },
  picture: {
    flex: 1,
    height: 200,
    width: null,
  },
  description: {
    flex: 1,
    flexDirection: "row",
  },
  label: {
    marginLeft: 3,
  },
  date: {
    color: "grey",
  },
});
