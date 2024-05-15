import { Schema } from "redis-om";
import { Repository,  } from 'redis-om'
import { createClient } from 'redis';

// export interface DeviceTwin {
//   deviceId: string;
//   macId: string;
//   description: string;

//   created: Date;
//   lastUpdated: Date;
  
//   assignment: {
//     assignedTo: string;
//     ts: Date;
//   },
//   currentLocation: {
//     locationId: string;
//     location: {
//       latitude: number;
//       longitude: number;
//     },
//     coordinates?: {
//       x: number;
//       y: number;
//     }
//     ts: Date;
//   }

//   message?: {
//     sender: string;
//     value: string;
//     ts: Date;
//   }

//   ble?: {
//     mac: string[];
//     rssi: number[];
//     ts: Date;
//   }
//   wifi?: {
//     bssid: string[];
//     rssi: number[];
//     ts: Date;
//   }
//   crewAssist?: {
//     requested: Date;
//     acknowledged?: Date;
//     ts: Date;
//   }
//   fallDetection?: {
//     triggered: Date;
//     ts: Date;
//   }
//   heartRate?: {
//     value: number;
//     ts: Date;
//   }
//   steps?: {
//     value: number;
//     ts: Date;
//   }

//   humidity?: {
//     value: number;
//     ts: Date;
//   }
//   noise?: {
//     dBA: number;
//     dBZ: number;
//     ts: Date;
//   }
//   temperature?: {
//     value: number;
//     ts: Date;
//   }


//   screen?: {
//     onDuration: number;
//     ts: Date;
//   }
//   battery?: {
//     value: number;
//     ts: Date;
//   }
// }

export const DeviceTwinSchema = new Schema('device-twin', {
  deviceId: {type: 'string'},
  macId: {type: 'string'},
  description: {type: 'string'},

  created: {type: 'date'},
  lastUpdated: {type: 'date'},
  
  assignedTo: {type: 'string', path: '$.assignment.assignedTo'},
  assignedToTs: {type: 'date', path: '$.assignment.ts'},

  locationId: {type: 'string', path: '$.currentLocation.locationId'},
  location: {type: 'point', path: '$.currentLocation.location'},
  locationX: {type: 'number', path: '$.currentLocation.coordinates.x'}, 
  locationY: {type: 'number', path: '$.currentLocation.coordinates.y'}, 
  locationTs:{type: 'date', path: '$.currentLocation.ts'},

  messageSender: {type: 'string', path: '$.message.sender'},
  messageValue: {type: 'string', path: '$.message.value'},
  messageTs: {type: 'date', path: '$.message.ts'},

  bleMac: {type: 'string[]', path: '$.ble.mac[*]'},
  bleRssi: {type: 'number[]', path: '$.ble.rssi[*]'},
  bleTs: {type: 'date', path: '$.ble.ts'},

  wifiMac: {type: 'string[]', path: '$.wifi.mac[*]'},
  wifiRssi: {type: 'number[]', path: '$.wifi.rssi[*]'},
  wifiTs: {type: 'date', path: '$.wifi.ts'},

  gpsAlt: {type: 'number', path: '$.gps.alt'},
  gpsLocation: {type: 'point', path: '$.gps.location'}, 
  gpsTs: {type: 'date', path: '$.gps.ts'}, 

  crewAssistRequested: {type: 'date', path: '$.crewAssist.requested'},
  crewAssistAcknowledged: {type: 'date', path: '$.crewAssist.acknowledged'},
  crewAssistTs: {type: 'date', path: '$.crewAssist.ts'},

  fallDetectionTriggered: {type: 'date', path: '$.fallDetection.triggered'},
  fallDetectionTs: {type: 'date', path: '$.fallDetection.ts'},

  heartRate: {type: 'number', path: '$.heartRate.value'},
  heartRateTs: {type: 'date', path: '$.heartRate.ts'},

  steps: {type: 'number', path: '$.steps.value'},
  stepsTs: {type: 'date', path: '$.steps.ts'},

  humidity: {type: 'number', path: '$.humidity.value'},
  humidityTs: {type: 'date', path: '$.humidity.ts'},

  noiseDBA: {type: 'number', path: '$.noise.dBA'},
  noiseDBZ: {type: 'number', path: '$.noise.dBZ'},
  noiseTs: {type: 'date', path: '$.noise.ts'},

  temperature: {type: 'number', path: '$.temperature.value'},
  temperatureTs: {type: 'date', path: '$.temperature.ts'},

  screenOnDuration: {type: 'number', path: '$.screen.onDuration'},
  screenTs: {type: 'date', path: '$.screen.ts'},

  battery: {type: 'number', path: '$.battery.value'},
  batteryTs: {type: 'date', path: '$.battery.ts'},
}, {
  dataStructure: 'JSON'
}
)

let _deviceTwinRepository;

export const getDeviceTwinRepository = async () => {
  if(!_deviceTwinRepository) {
    const client = await createClient()
      .on('error', err => console.log('Redis Client Error', err))
      .connect();
      _deviceTwinRepository = new Repository(DeviceTwinSchema, client);
      return {_deviceTwinRepository, client};
  }
  return {};
}
