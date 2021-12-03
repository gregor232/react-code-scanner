import React, { useState, useRef, useCallback } from "react";
import QrReader from "react-qr-reader";
import Quagga from "quagga";
import BarcodeScanner from "./components/BarcodeScanner";
import javascriptBarcodeReader from "javascript-barcode-reader";
import Camera from "./components/Camera";
import Webcam from "react-webcam";

const App = () => {
  const [scanner, setScanner] = useState("Display QR scanner");
  const [result, setResult] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [data, setData] = useState("Not Found");

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

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
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </div>
      )}
    </div>
  );
};

export default App;
