import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {predictFlightPrice} from '../apiService';

const Presiction: React.FC = () => {
  const [stopage, setStopage] = useState<number>(0);
  const [airline, setAirline] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());
  const [showDeparturePicker, setShowDeparturePicker] =
    useState<boolean>(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState<boolean>(false);

  const handlePredict = async () => {
    try {
      setLoading(true); // Show loader
      const data = {
        departure: departureDate.toISOString(),
        arrival: arrivalDate.toISOString(),
        stopage,
        airline,
        source,
        destination,
      };
      const result = await predictFlightPrice(data);
      setPrediction(result.prediction_text);
    } catch (error) {
      console.error('Error getting prediction', error);
      Alert.alert('Error', 'Error getting prediction');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const showDatePicker = (mode: 'departure' | 'arrival') => {
    if (mode === 'departure') {
      setShowDeparturePicker(true);
    } else {
      setShowArrivalPicker(true);
    }
  };

  const onDateChange = (
    event: any,
    selectedDate?: Date,
    mode?: 'departure' | 'arrival',
  ) => {
    const currentDate = selectedDate || new Date();
    if (mode === 'departure') {
      setShowDeparturePicker(Platform.OS === 'ios');
      setDepartureDate(currentDate);
    } else {
      setShowArrivalPicker(Platform.OS === 'ios');
      setArrivalDate(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section22}>
        <Text style={styles.title}>Flight Price Predictor</Text>
      </View>
      <Button
        title={`Select Departure Date: ${departureDate.toLocaleDateString()} ${departureDate.toLocaleTimeString()}`}
        onPress={() => showDatePicker('departure')}
      />
      {showDeparturePicker && (
        <DateTimePicker
          value={departureDate}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) =>
            onDateChange(event, selectedDate, 'departure')
          }
        />
      )}
      <View style={styles.new}>
        <Button
          title={`Select Arrival Date: ${arrivalDate.toLocaleDateString()} ${arrivalDate.toLocaleTimeString()}`}
          onPress={() => showDatePicker('arrival')}
        />
      </View>
      {showArrivalPicker && (
        <DateTimePicker
          value={arrivalDate}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) =>
            onDateChange(event, selectedDate, 'arrival')
          }
        />
      )}

      <Text style={styles.label}>Stopage</Text>
      <Picker
        selectedValue={stopage.toString()}
        onValueChange={itemValue => setStopage(Number(itemValue))}
        style={styles.picker}>
        <Picker.Item label="Non-Stop" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
      </Picker>

      <Text style={styles.label}>Airline</Text>
      <Picker
        selectedValue={airline}
        onValueChange={itemValue => setAirline(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Vistara" value="Vistara" />
        <Picker.Item label="Air India" value="Air India" />
        <Picker.Item label="IndiGo" value="IndiGo" />
        <Picker.Item label="Air Asia" value="Air Asia" />
        <Picker.Item label="GO_FIRST" value="GO_FIRST" />
        <Picker.Item label="SpiceJet" value="SpiceJet" />
        <Picker.Item label="AkasaAir" value="AkasaAir" />
        <Picker.Item label="AllianceAir" value="AllianceAir" />
        <Picker.Item label="StarAir" value="StarAir" />
      </Picker>

      <Text style={styles.label}>Source</Text>
      <Picker
        selectedValue={source}
        onValueChange={itemValue => setSource(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Bangalore" value="Bangalore" />
        <Picker.Item label="Delhi" value="Delhi" />
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Chennai" value="Chennai" />
      </Picker>

      <Text style={styles.label}>Destination</Text>
      <Picker
        selectedValue={destination}
        onValueChange={itemValue => setDestination(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Bangalore" value="Bangalore" />
        <Picker.Item label="Delhi" value="Delhi" />
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Hyderabad" value="Hyderabad" />
        <Picker.Item label="Kolkata" value="Kolkata" />
      </Picker>

      <Button title="Predict Price" onPress={handlePredict} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {prediction && <Text style={styles.prediction}>{prediction}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
    color: '#000',
  },
  prediction: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  new: {
    marginTop: 10,
  },
  section22: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Presiction;
