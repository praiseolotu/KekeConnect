import { NativeModules, Platform } from 'react-native';

const { NativeBleAdvertiser } = NativeModules;

export default {
  isSupported: async () => {
    if (Platform.OS === 'android') {
      try {
        return await NativeBleAdvertiser.isSupported();
      } catch {
        return false;
      }
    }
    return false;
  },

  startAdvertising: async (payload) => {
    if (Platform.OS === 'android') {
      try {
        
        return await NativeBleAdvertiser.start(payload);
      } catch (error) {
        console.error('Advertising failed:', error);
        throw error;
      }
    }
    throw new Error('BLE advertising not supported on this platform');
  },

  stopAdvertising: async () => {
    if (Platform.OS === 'android') {
      try {
        return await NativeBleAdvertiser.stop();
      } catch (error) {
        console.error('Failed to stop advertising:', error);
        throw error;
      }
    }
    return false;
  },
};