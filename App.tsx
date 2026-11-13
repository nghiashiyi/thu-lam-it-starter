import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào bạn!</Text>
      <Text style={styles.body}>
        Đây là ứng dụng của khóa “Thử làm IT trong thời đại AI”.
      </Text>
      <Text style={styles.body}>
        Chúng ta sẽ cùng xây ứng dụng này qua từng bài học.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111',
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
});
