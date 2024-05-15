import {getDeviceTwinRepository, DeviceTwinSchema} from './device-twin'
import data from "./output1.json";

export const getDeviceTwinData = async () => {
  const {client, _deviceTwinRepository: repo} = await getDeviceTwinRepository();
  const devices_twins = [];
  const cursor = '0';
  do {
    const [nextCursor, keys] = await client.SCAN(cursor, 'MATCH', DeviceTwinSchema.schemaName + '*');

    for (const key of keys) {
      const device = await repo.fetch(key); // Use repository's fetch method for each key
      if(device.deviceId in data.layers['layer-1'].items){
        data.layers['layer-1'].items[device.deviceId].x = device.locationX;
        data.layers['layer-1'].items[device.deviceId].y = device.locationY;
      } 
      else {
        data.layers['layer-1'].items[device.deviceId] = {
          "id": device.deviceId,
          "type": "human",
          "prototype": "items",
          "name": "Human",
          "misc": {},
          "selected": false,
          "properties": { "altitude": { "length": 0, "unit": "cm" } },
          "visible": true,
          "x": device.locationX,
          "y": device.locationY,
          "rotation": 0
        }
      }
    }
    cursor = nextCursor;
  } while (cursor !== '0');
  return data;
}