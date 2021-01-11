import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

const fromBase64 = (value) => {
  const buff = Buffer.from(value, "base64");
  return buff.toString("ascii");
};

const genCupom = () => {
  const code = parseInt(moment().format("YYMMDDHHmmssSSS"))
    .toString(16)
    .toUpperCase();
  let codeAux =
    code.substr(0, 4) + "-" + code.substr(4, 4) + "-" + code.substr(8, 4);
  return codeAux;
};

export default async (request, response) => {
  const auxPrivateKey = fromBase64(process.env.SHEET_PRIVATE_KEY.toString());
  moment.locale("pt-br");
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: auxPrivateKey,
    });
    await doc.loadInfo();

    const sheetConfig = doc.sheetsByIndex[2];
    await sheetConfig.loadCells("A3:B3");

    const textoCell = sheetConfig.getCell(2, 1);
    const mostrarPromocaoCell = sheetConfig.getCell(2, 0);

    let Cupom = "teste";
    let Promo = "teste";

    if (mostrarPromocaoCell.value === "VERDADEIRO") {
      Cupom = genCupom();
      Promo = textoCell.value;
    }

    const data = JSON.parse(request.body);

    const sheet = doc.sheetsByIndex[1];
    //Nome Email Whatsapp Cupom Promo
    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      "Data Preenchimento": moment().format("DD/MM/YYYY HH:mm"),
      Nota: parseInt(data.Nota),
      Cupom,
      Promo,
    });

    response.end(
      JSON.stringify({
        showCupom: Cupom !== "",
        Cupom,
        Promo,
      })
    );
  } catch (err) {
    console.log(err);
    response.end("Error");
  }
};
