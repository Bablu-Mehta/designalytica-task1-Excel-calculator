const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const excelJS = require("exceljs");
const puppeteer = require('puppeteer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/calculate", (req, res) => {
    const { num1, num2 } = req.body;
    const result = parseInt(num1) + parseInt(num2);
    if (isNaN(result)) {
        console.error("Invalid calculation result");
        res.status(500).send("Error calculating result");
        return;
      }
  
    const wb = new excelJS.Workbook();
    const ws = wb.addWorksheet("Result");
  
    ws.columns = [
      { header: 'First Number', key: 'num1', width: 10 },
      { header: 'Second Number', key: 'num2', width: 10 },
      { header: 'Result', key: 'result', width: 10 }
    ];
  
    ws.addRow({ num1, num2, result });
  
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=result.xlsx");
  
    wb.xlsx.write(res)
      .then(() => {
        res.end();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error generating Excel file");
      });
  });

  app.get('/print', async (req, res) => {
    try {
      const workbook = new excelJS.Workbook();
      await workbook.xlsx.readFile('result.xlsx');
      
      let html = '<table>';
      workbook.getWorksheet(1).eachRow((row, rowNumber) => {
        html += '<tr>';
        row.eachCell((cell) => {
          html += `<td>${cell.value}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      const pdf = await page.pdf({ format: 'A4' });
  
      res.contentType('application/pdf');
      res.send(pdf);
  
      await browser.close();
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  });

  app.get("/", (req, res) => {
    res.send("Home Page");
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});