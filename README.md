# KekeConnect - Offline BLE Messaging App

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An offline messaging app using Bluetooth Low Energy (BLE) technology, developed initially with React Native and transitioning to native Kotlin for optimal BLE performance.

## Project Background

A final-year Computer Engineering student reached out to me to help deliver on a project, we explored local communication technologies (Bluetooth Classic, BLE, WiFi Direct) and chose BLE for its:
- Low power consumption
- Modern device support
- Inspiration from Tecno Mobile's FreeLink feature

**Developer**: [Olotu Praise Jah](https://x.com/x86olioxx)  
[![Twitter](https://img.shields.io/badge/-@x86olioxx-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://x.com/x86olioxx)
[![LinkedIn](https://img.shields.io/badge/-Olotu%20Praise%20Jah-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/olotu-praise-jah-9701b7162/)

## Current Status
🚧 **Transition Phase**: Moving from React Native to native Kotlin implementation to overcome BLE limitations in cross-platform frameworks.

### Known Limitations
- React Native's BLE abstraction layer causes performance issues
- Native implementation will provide:
  - Better connection reliability
  - Lower battery consumption
  - Full BLE feature access

## Getting Started

### Prerequisites
- Node.js ≥16
- Java JDK 11+
- Android Studio (for native development)
- Physical Android device with BLE support (recommended)

### Installation
```bash
git clone https://github.com/praiseolotu/KekeConnect.git
cd KekeConnect
npm install
```
### Project Setup

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## 🚀 Download KekeConnect App

Click the link below to download the latest version of the KekeConnect app:

📦 [Download APK](./android/app/build/outputs/apk/release/app-release.apk)

> ⚠️ Make sure to enable "Install from Unknown Sources" in your Android device settings to install the app.
