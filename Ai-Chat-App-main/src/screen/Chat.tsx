

import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, ScrollView, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Loader from './Loader';

// Set your FastAPI backend URL here
const api = axios.create({
  baseURL: 'https://langchain-fastapi-cvni.onrender.com', // Adjust to match your FastAPI server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to call the FastAPI endpoint
const chatWithDB = async (query: string, dbUri: string, mysqlHost?: string, mysqlUser?: string, mysqlPassword?: string, mysqlDb?: string) => {
  try {
    const response = await api.post('/chat', {
      query,
      db_uri: dbUri,
      mysql_host: mysqlHost,
      mysql_user: mysqlUser,
      mysql_password: mysqlPassword,
      mysql_db: mysqlDb,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const Chat = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendQuery = async () => {
    setLoading(true);
    try {
      const result = await chatWithDB(query, 'USE_LOCALDB'); // Adjust db_uri if needed
      setResponse(result.response);
      setQuery('');
    } catch (error) {
      setResponse('please try Again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Chat with Database</Text>
        <Text style={styles.title22}>Airline Price Predictor</Text>
        <View style={styles.chatContainer}>
          <ScrollView style={styles.messagesContainer}>
            {response && <Text style={styles.messageResponse}>{response}</Text>}
          </ScrollView>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Ask Anything From The Database"
          value={query}
          onChangeText={setQuery}
          multiline
          placeholderTextColor="#999"
        />
        <View>
          <Button title="Submit" onPress={handleSendQuery} disabled={loading} />
          {loading && <Loader />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  title22: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  messagesContainer: {
    maxHeight: 200,
    paddingBottom: 10,
  },
  messageResponse: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e9ffe9',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});

export default Chat;
