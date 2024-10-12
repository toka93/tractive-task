
import fs from 'fs';
import path from 'path';




export  function loadTestData(fileName: string) : any{
    const filePath = path.resolve(__dirname, `../data/${fileName}.json`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  }

export  function generateTimestamp() {
    return new Date().toISOString().replace(/:/g, '_');
  }