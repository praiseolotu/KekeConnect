import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, Alert, View } from 'react-native';
import BLEScanner from '../services/bleScanner';

const PassengerScreen = () => {
  const [drivers, setDrivers] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const startScanning = async () => {
      try {
        setIsScanning(true);
        await BLEScanner.scanForDrivers((driver) => {
          setDrivers((prev) => {
            const existing = prev.find(d => d.id === driver.id);
            return existing ? prev : [...prev, driver];
          });
        });
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to scan for drivers');
        setIsScanning(false);
      }
    };

    startScanning();

    return () => {
      BLEScanner.stopScanning();
      setIsScanning(false);
    };
  }, []);

  const renderDriver = ({ item }) => {
    const [destination, seats, fare, plate] = item.payload.split('|');
    return (
      <View style={styles.driverCard}>
        <Text style={styles.driverPlate}>{plate}</Text>
        <Text style={styles.driverInfo}>To: {destination}</Text>
        <Text style={styles.driverInfo}>{seats} seats available</Text>
        <Text style={styles.driverPrice}>₦{fare}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Rides</Text>
      <Text style={styles.scanStatus}>
        {isScanning ? 'Scanning...' : 'Not scanning'}
      </Text>
      
      {drivers.length === 0 ? (
        <Text style={styles.noDrivers}>No drivers found nearby</Text>
      ) : (
        <FlatList
          data={drivers}
          renderItem={renderDriver}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a23',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scanStatus: {
    color: '#aaa',
    marginBottom: 20,
  },
  noDrivers: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  driverCard: {
    backgroundColor: '#1e1e40',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  driverPlate: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  driverInfo: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 3,
  },
  driverPrice: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default PassengerScreen;