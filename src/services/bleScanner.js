import { Buffer } from 'buffer';
import { PermissionsAndroid, Platform } from 'react-native';

const SERVICE_UUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    const perms = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    return Object.values(perms).every(s => s === PermissionsAndroid.RESULTS.GRANTED);
  }
  return true;
};

const decodePayload = base64 => {
  const buf = Buffer.from(base64, 'base64');
  const destination = buf.toString('ascii', 0, 8).trim();
  const seats = buf.readUInt8(8);
  const fare = buf.readUInt16BE(9);
  const plate = buf.toString('ascii', 11, 19).trim();
  return { destination, seats, fare, plate };
};

export default {
  scanForDrivers: async callback => {
    if (!(await requestPermissions())) throw new Error('Bluetooth permissions denied');
    bleManager.startDeviceScan([SERVICE_UUID], null, (err, dev) => {
      if (err) {
        console.error('Scan error:', err);
        return;
      }
      const sd = dev.serviceData?.[SERVICE_UUID];
      if (sd) {
        try {
          const payload = decodePayload(sd);
          callback({ ...dev, ...payload });
        } catch (e) {
          console.warn(`Parse failure: ${e}`);
        }
      }
    });
  },
  stopScanning: () => bleManager.stopDeviceScan(),
  destroy: () => bleManager.destroy(),
};
