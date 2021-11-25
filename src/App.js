import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";

const App = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);

  // const generateQrCode = async () => {
  //   try {
  //         const response = await QRCode.toDataURL(text);
  //         setImageUrl(response);
  //   }catch (error) {
  //     console.log(error);
  //   }
  // }
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <div className="App">
        <button
          style={{ display: "block", margin: "0 auto" }}
          onClick={onScanFile}
        >
          scan qr code
        </button>
        <QrReader
          ref={qrRef}
          delay={300}
          style={{ width: "100%", height: `10px` }}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
        <h3 style={{ textAlign: "center" }}>{scanResultFile}</h3>
      </div>
      <div style={{ width: "100%", margin: "0 auto" }}>
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
    </div>
  );
};

export default App;
