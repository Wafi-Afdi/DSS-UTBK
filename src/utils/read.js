import Papa from 'papaparse'

import weight_ipa from "@/weights/ipa.json"
import weight_ips from "@/weights/ips.json"

const readCSVFromFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (result) {
        if (result.errors.length > 0) {
          reject(result.errors);
        } else {
          resolve(result.data);
        }
      }
    });
  });
}

const readWeight = (type) => {
  try {
    let data;
    
    if (type == "mipa") {
      data = weight_ipa;
    } else if (type == "ips") {
      data = weight_ips
    } else {
      throw Error("Invalid Type: only 'mipa' and 'ips'")
    }
    return data;
  } catch (err) {
    console.error('Error reading or parsing JSON file:', err);
    return null;
  }
}

export { readCSVFromFile, readWeight }