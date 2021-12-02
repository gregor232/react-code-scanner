import React, { useEffect, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = () => {
  const [result, setResult] = useState("Not Found");
  const [data, setData] = useState("No Data");

  const config = {
    inputStream: {
      type: "LiveStream",
      constraints: {
        width: 640,
        height: 480,
        facing: "environment", // or user
      },
    },
    locator: {
      patchSize: "medium",
      halfSample: true,
    },
    numOfWorkers: 2,
    decoder: {
      readers: ["code_128_reader"],
    },
    locate: true,
  };

  useEffect(() => {
    Quagga.init(config, function (err) {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
    });
    // Quagga.onDetected((data) => console.log("data", data));
    Quagga.onDetected((data) => {
      setData(data);
    });
    Quagga.decodeSingle(config, (result) => {
      if (result.codeResult) {
        setResult(result.codeResult.code);
      } else {
        console.log("not detected");
      }
    });
  }, []);

  return (
    <>
      <div id="interactive" className="viewport" />
      <div>{result}asd</div>
      <div>{result}no data </div>
    </>
  );
};

export default BarcodeScanner;
