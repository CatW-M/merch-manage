const csvtojson = require("csvtojson");
const fs = require("fs");

const csvfilepath = "data/project-data-cw.csv";

csvtojson()
  .fromFile(csvfilepath)
  .then((json) => {
    fs.writeFileSync(
      "project-data-cw.json",
      JSON.stringify(json),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      },
    );
  });