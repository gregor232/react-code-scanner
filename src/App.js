import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const App = () => {
  const [scanner, setScanner] = useState("Display QR scanner");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [data, setData] = useState("Not Found");

  const qrRef = useRef(null);

  // const generateQrCode = async () => {
  //   try {
  //         const response = await QRCode.toDataURL(text);
  //         setImageUrl(response);
  //   }catch (error) {
  //     console.log(error);
  //   }
  // }
  //
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      // setResult(result);
    }
  };
  const handleError = (error) => {
    console.error(error);
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  const switchScanner = () => {};
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
            <QrReader
              delay={300}
              style={{ width: "100%", margin: "0 auto" }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
            />
          </div>
          <h3 style={{ textAlign: "center" }}>code: {scanResultWebCam}</h3>
        </div>
      ) : (
        <div style={{ width: "50%", margin: "0 auto" }}>
          <BarcodeScannerComponent
            width={"100%"}
            height={500}
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData("Not Found");
            }}
          />
          <p style={{ width: "50%", margin: "0 auto", textAlign: "center" }}>
            {data}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
