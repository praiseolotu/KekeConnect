// src/screens/DriverScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import BLEAdvertiser from '../services/bleAdvertiserBridge';
import { Buffer } from 'buffer';

const encodePayload = (dest, seats, fare, plate) => {
  const d = dest.slice(0, 8).padEnd(8, ' ');
  const p = plate.replace(/-/g, '').slice(0, 8).padEnd(8, ' ');
  const buf = Buffer.alloc(19);
  buf.write(d, 0, 'ascii');
  buf.writeUInt8(parseInt(seats), 8);
  buf.writeUInt16BE(parseInt(fare), 9);
  buf.write(p, 11, 'ascii');
  return buf.toString('base64');
};

const DriverScreen = () => {
  const [destination, setDestination] = useState('');
  const [seats, setSeats] = useState('');
  const [fare, setFare] = useState('');
  const [plate, setPlate] = useState('');
  const [isAdvertising, setAdvertising] = useState(false);

  const handleStart = async () => {
    try {
      if (!destination || !seats || !fare || !plate) {
        Alert.alert('Error', 'All fields are required');
        return;
      }
      const payload = encodePayload(destination, seats, fare, plate);
      await BLEAdvertiser.startAdvertising(payload);
      setAdvertising(true);
      Alert.alert('Trip Active', 'Advertising started successfully');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const handleStop = async () => {
    try {
      await BLEAdvertiser.stopAdvertising();
      setAdvertising(false);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Start a Trip</Text>

      <TextInput placeholder="Destination" value={destination} onChangeText={setDestination} style={styles.input} />
      <TextInput placeholder="Seats" value={seats} onChangeText={setSeats} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Fare (₦)" value={fare} onChangeText={setFare} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Plate Number" value={plate} onChangeText={setPlate} style={styles.input} />

      <TouchableOpacity style={[styles.button, isAdvertising && styles.disabled]} onPress={handleStart} disabled={isAdvertising}>
        <Text style={styles.buttonText}>Start Advertising</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.stop, !isAdvertising && styles.disabled]} onPress={handleStop} disabled={!isAdvertising}>
        <Text style={styles.buttonText}>Stop Advertising</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0a0a23' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#808080',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  stop: {
    backgroundColor: '#ff4d4d',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DriverScreen;
