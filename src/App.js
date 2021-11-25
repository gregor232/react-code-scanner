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
    <>
      <div className="App">
        <button variant="contained" color="secondary" onClick={onScanFile}>
          scan qr code
        </button>
        <QrReader
          ref={qrRef}
          delay={300}
          style={{ width: "100%" }}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
        <h3>{scanResultFile}</h3>
      </div>
      <div>
        <h3>web cam scan</h3>
        <QrReader
          delay={300}
          style={{ width: "100%" }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
        />
        <h3>code: {scanResultWebCam}</h3>
      </div>
    </>
  );
};

export default App;
