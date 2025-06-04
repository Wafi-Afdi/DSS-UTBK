import { readCSVFromFile, readWeight } from './read.js'
import path from 'path'

const normalizeDataVector = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Data tidak valid atau kosong.");
  }

  const numericKeys = Object.keys(data[0]).filter(key =>
    typeof data[0][key] === 'number'
  );

  const denominator = {};
  numericKeys.forEach(key => {
    denominator[key] = Math.sqrt(
      data.reduce((sum, row) => sum + row[key] ** 2, 0)
    );
  });

  const normalizedData = data.map(row => {
    const normalizedRow = {};
    for (const key in row) {
      if (numericKeys.includes(key)) {
        normalizedRow[key] = +(row[key] / denominator[key]).toFixed(3);
      } else {
        normalizedRow[key] = row[key]; // Tetap simpan string seperti Nama
      }
    }
    return normalizedRow;
  });

//   console.log("Data setelah normalisasi:");
//   console.table(normalizedData);

  return normalizedData;
}

const applyWeights = (normalizedData, weights) => {

  const weightedData = normalizedData.map(row => {
    const weightedRow = {};
    for (const key in row) {
      if (typeof row[key] === 'number') {
        weightedRow[key] = +(row[key] * weights[key]).toFixed(3);
      } else {
        weightedRow[key] = row[key]; // simpan Nama, dll
      }
    }
    return weightedRow;
  });

//   console.log(weightedData);
//   console.table(weightedData);

  return weightedData;
}

const getIdealSolutions = (weightedData) => {
  const numericKeys = Object.keys(weightedData[0]).filter(key =>
    typeof weightedData[0][key] === 'number'
  );

  const idealPositive = {};
  const idealNegative = {};

  numericKeys.forEach(key => {
    const values = weightedData.map(row => row[key]);
    idealPositive[key] = Math.max(...values);
    idealNegative[key] = Math.min(...values);
  });

//   console.log("Solusi Ideal Positif:");
//   console.log(idealPositive);
//   console.log("Solusi Ideal Negatif:");
//   console.log(idealNegative);

  return { idealPositive, idealNegative };
}

const calculateDistancesAndPreferences = (weightedData, idealPositive, idealNegative) => {
  const numericKeys = Object.keys(weightedData[0]).filter(
    key => typeof weightedData[0][key] === 'number'
  );

  const results = weightedData.map(row => {
    const dPlus = Math.sqrt(
      numericKeys.reduce((sum, key) => {
        return sum + Math.pow(row[key] - idealPositive[key], 2);
      }, 0)
    );

    const dMinus = Math.sqrt(
      numericKeys.reduce((sum, key) => {
        return sum + Math.pow(row[key] - idealNegative[key], 2);
      }, 0)
    );

    const preference = +(dMinus / (dPlus + dMinus)).toFixed(4);

    return {
      ...row,
      D_Plus: +dPlus.toFixed(4),
      D_Minus: +dMinus.toFixed(4),
      Preferensi: preference
    };
  });

  // Urutkan berdasarkan preferensi menurun
  results.sort((a, b) => b.Preferensi - a.Preferensi);

  // Tambahkan ranking berdasarkan urutan
  results.forEach((row, index) => {
    row.Ranking = index + 1;
  });

//   console.log("Hasil akhir dengan ranking:");
//   console.table(results);

  return results;
}

const topsisFromFile = (filePath, weight, simple=false) => {
    const data = readCSVFromFile(filePath);
    const normalizedData = normalizeDataVector(data);
    const weightedData = applyWeights(normalizedData, weight);
    const { idealPositive, idealNegative } = getIdealSolutions(weightedData);
    const finalResults = calculateDistancesAndPreferences(weightedData, idealPositive, idealNegative);

    if(simple){
      const allowedKeys = ["Nama_Siswa", "Preferensi", "Ranking"];

      const filteredData = finalResults.map(obj =>
          Object.fromEntries(
              Object.entries(obj).filter(([key]) => allowedKeys.includes(key))
          )
      );

      return filteredData;
    }
    
    return finalResults;
}

const weightIPA = readWeight('./src/weights/ipa.json');
const weightIPS = readWeight('./src/weights/ips.json');

export {weightIPA, weightIPS, topsisFromFile}
