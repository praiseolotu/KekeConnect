package com.kekeconnect;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.le.AdvertiseCallback;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertiseSettings;
import android.bluetooth.le.BluetoothLeAdvertiser;
import android.os.Build;
import android.os.ParcelUuid;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.UUID;

@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class BleAdvertiserModule extends ReactContextBaseJavaModule {
    private static final String TAG = "BleAdvertiserModule";
    private static final String DEFAULT_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"; 
    
    private BluetoothLeAdvertiser advertiser;
    private AdvertiseCallback advertiseCallback;
    private boolean isAdvertising = false;

    public BleAdvertiserModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeBleAdvertiser";
    }

    @ReactMethod
    public void isSupported(Promise promise) {
        try {
            BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
            boolean supported = adapter != null && 
                             adapter.isEnabled() && 
                             adapter.getBluetoothLeAdvertiser() != null;
            promise.resolve(supported);
        } catch (Exception e) {
            Log.e(TAG, "isSupported error", e);
            promise.reject("BLE_ERROR", "Error checking support: " + e.getMessage());
        }
    }

    @ReactMethod
    public void start(String payload, Promise promise) {
        try {
            if (isAdvertising) {
                promise.reject("BLE_ERROR", "Advertising already in progress");
                return;
            }

            BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
            if (adapter == null) {
                promise.reject("BLE_ERROR", "Bluetooth not supported");
                return;
            }

            if (!adapter.isEnabled()) {
                promise.reject("BLE_ERROR", "Bluetooth is disabled");
                return;
            }

            advertiser = adapter.getBluetoothLeAdvertiser();
            if (advertiser == null) {
                promise.reject("BLE_ERROR", "BLE Advertising not supported");
                return;
            }

            AdvertiseSettings settings = new AdvertiseSettings.Builder()
                    .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
                    .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
                    .setConnectable(true)
                    .build();

            AdvertiseData data = new AdvertiseData.Builder()
                    .addServiceUuid(new ParcelUuid(UUID.fromString(DEFAULT_SERVICE_UUID)))
                    .addServiceData(new ParcelUuid(UUID.fromString(DEFAULT_SERVICE_UUID)), 
                            payload.getBytes())
                    .setIncludeDeviceName(false) // Important for privacy
                    .build();

            advertiseCallback = new AdvertiseCallback() {
                @Override
                public void onStartSuccess(AdvertiseSettings settingsInEffect) {
                    isAdvertising = true;
                    Log.i(TAG, "BLE advertising started successfully");
                    promise.resolve(true);
                }

                @Override
                public void onStartFailure(int errorCode) {
                    isAdvertising = false;
                    String errorMsg = "Advertising failed with code: " + errorCode;
                    Log.e(TAG, errorMsg);
                    promise.reject("BLE_ERROR", errorMsg);
                }
            };

            advertiser.startAdvertising(settings, data, advertiseCallback);
        } catch (Exception e) {
            isAdvertising = false;
            Log.e(TAG, "Start advertising error", e);
            promise.reject("BLE_ERROR", "Advertising failed: " + e.getMessage());
        }
    }

    @ReactMethod
    public void stop(Promise promise) {
        try {
            if (!isAdvertising || advertiser == null || advertiseCallback == null) {
                promise.reject("BLE_ERROR", "No active advertising to stop");
                return;
            }

            advertiser.stopAdvertising(advertiseCallback);
            isAdvertising = false;
            promise.resolve(true);
            Log.i(TAG, "BLE advertising stopped successfully");
        } catch (Exception e) {
            Log.e(TAG, "Stop advertising error", e);
            promise.reject("BLE_ERROR", "Failed to stop advertising: " + e.getMessage());
        }
    }

    @ReactMethod
    public void getAdvertisingStatus(Promise promise) {
        promise.resolve(isAdvertising);
    }
}