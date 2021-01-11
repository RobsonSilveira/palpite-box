import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (request, response) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    });
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[2];
    await sheet.loadCells("A3:B3");

    const textoCell = sheet.getCell(2, 1);
    const mostrarPromocaoCell = sheet.getCell(2, 0);

    response.end(
      JSON.stringify({
        showCupom: mostrarPromocaoCell.value === "VERDADEIRO",
        message: textoCell.value,
      })
    );
  } catch (err) {
    console.log(err);
    response.end(
      JSON.stringify({
        showCupom: false,
        message: "",
      })
    );
  }
};