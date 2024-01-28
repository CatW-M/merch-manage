const csvtojson = require("csvtojson");
const fs = require("fs");

const csvfilepath = "data/merch-manage-data.csv";

csvtojson()
  .fromFile(csvfilepath)
  .then((json) => {
    fs.writeFileSync(
      "merch-manage-data.json",
      JSON.stringify(json),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      },
    );
  });