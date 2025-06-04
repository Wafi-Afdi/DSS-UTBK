import fs from 'fs';
import path from 'path';
import Papa from 'papaparse'

const readCSVFromFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsed = Papa.parse(fileContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  });

  if (parsed.errors.length > 0) {
    console.error("Parsing errors:", parsed.errors);
    return null;
  }

  const data = parsed.data;

//   console.log(data);
//   console.table(data);

  return data;
}

const readWeight = (filePath) => {
    try {
        const absolutePath = path.resolve(filePath);
        const data = fs.readFileSync(absolutePath, 'utf8');
        const json = JSON.parse(data);
        return json;
    } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
        return null;
    }
}

module.exports = {
    readCSVFromFile,
    readWeight
}


