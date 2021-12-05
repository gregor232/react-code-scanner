import React, { useState, useRef, useCallback, useEffect } from "react";
import javascriptBarcodeReader from "javascript-barcode-reader";
import Webcam from "react-webcam";
const App = () => {
  const [scanner, setScanner] = useState("Display QR scanner");
  const [result, setResult] = useState("asd");
  const [check, setCheck] = useState("no");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [image, setImage] = useState(false);
  const [imageSrc, setImageSrc] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    setImage(true);
    const imageSource = webcamRef.current.getScreenshot();
    console.log(imageSource, "SRC");
    setImageSrc(imageSource);
    const carriage = imageSource.replace(/[\n\r]+/g, "");
    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = carriage;
    //const img = <img alt="barcode" src={imageSrc}></img>;
    //setImage(img);
    console.log(image.src, "imgg");
    //
    // if (image) {
    //   javascriptBarcodeReader({
    //     image: img,
    //     barcode: "code-93",
    //     // barcodeType: "interleaved"
    //   })
    //     .then((res) => {
    //       setResult(res);
    //     })
    //     .catch(console.log("err"));
    // }

    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "./img/4.jpg";

    console.log(img.src, img);

    img.onload = function () {
      javascriptBarcodeReader({
        image: img,
        barcode: "code-93",
        // barcodeType: "interleaved"
      })
        .then((res) => {
          setResult(res);
        })
        .catch(console.log("err"));
    };
  }, [webcamRef]);

  // useEffect(() => {
  //   if (image !== false) {
  //     setCheck("yes");
  //     console.log(image);
  //     javascriptBarcodeReader({
  //       /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
  //       image: imageSrc,
  //       barcode: "code-2of5",

  //     })
  //       .then((code) => {
  //         if (code) {
  //           setResult("code");
  //         }
  //       })
  //       .catch((err) => {
  //         if (err) {
  //           setResult("err");
  //         }
  //       });
  //   }
  // }, [image]);

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
          {image === false ? (
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            />
          ) : (
            <img alt="barcode" src={imageSrc} />
          )}

          <button onClick={capture}>Capture photo</button>
          <p>{result}</p>
          <p>{check}</p>
        </div>
      )}
    </div>
  );
};

export default App;
