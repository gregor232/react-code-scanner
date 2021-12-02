import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import Quagga from "quagga";

const App = () => {
  const [scanner, setScanner] = useState("Display QR scanner");
  const [result, setResult] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [data, setData] = useState("Not Found");

  console.log(Quagga);

  const config = {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#barcode"), // Or '#yourElement' (optional)
    },
    decoder: {
      readers: ["code_128_reader"],
    },
  };

  Quagga.init(config, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
    Quagga.onDetected((data) => console.log(data));
    Quagga.decodeSingle(config, (result) => {
      if (result.codeResult) {
        setResult(result.codeResult.code);
      } else {
        console.log("not detected");
      }
    });
  });

  const qrRef = useRef(null);

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <button
        onClick={() => {
          if (scanner === "Display QR scanner") {
            setScanner("Display Barcode scanner");
          } else {
            setScanner("Display QR scanner");
          }
        }}
        style={{
          width: "10%",
          margin: "0 auto",
          textAlign: "center",
          display: "block",
        }}
      >
        {scanner}
      </button>
      <div className="App"></div>
      {scanner === "Display Barcode scanner" ? (
        <div style={{ width: "100%" }}>
          <h3 style={{ textAlign: "center" }}>web cam scan</h3>
          <div style={{ height: "50vh", width: "50vh", margin: "0 auto" }}>
            {/* <QrReader
              delay={300}
              style={{ width: "100%", margin: "0 auto" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            /> */}
          </div>
          <h3 style={{ textAlign: "center" }}>code: {scanResultWebCam}</h3>
        </div>
      ) : (
        <div style={{ width: "50%", margin: "0 auto" }}>
          <p style={{ width: "50%", margin: "0 auto", textAlign: "center" }}>
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
