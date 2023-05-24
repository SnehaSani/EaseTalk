import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const ModelComponent = () => {
  const [stream, setStream] = useState(null);
  const [prediction, setPrediction] = useState('Fever, Head-ache, Stomach-ache');
  const videoRef = useRef(null);
  const predictt=[1];
  var sample=0;

  useEffect(() => {
    async function getStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
    }
    getStream();
  }, []);

  useEffect(() => {
    async function runModel() {
      sample=20;
      const model = await tf.loadLayersModel("https://teachablemachine.withgoogle.com/models/HKzi-2vn_/model.json");
      const webcam = await tf.data.webcam(videoRef.current);
      while (true) {
        const img = await webcam.capture();
        const tensor = tf.browser.fromPixels(img).expandDims();
        predictt = await model.predict(tensor).argMax(1);
        console.log("Prediction:", predictt.dataSync()[0]);
        setPrediction(predictt.dataSync()[0]);
        img.dispose();
        tensor.dispose();
        await tf.nextFrame();
      }
    }
    runModel();
  }, []);

  return (
    <div>
      {<h2>Prediction: {prediction}</h2>}
      {<video ref={videoRef} autoPlay playsInline />}
    </div>
  );
};

export default ModelComponent;













// import React, { useRef, useEffect, useState } from "react";
// import * as tf from "@tensorflow/tfjs";

// const ModelComponent = () => {
//   const [stream, setStream] = useState(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     async function getStream() {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(stream);
//     }
//     getStream();
//   }, []);

//   //useEffect(() => {
//     async function runModel() {
//       const model = await tf.loadLayersModel("https://teachablemachine.withgoogle.com/models/HKzi-2vn_/model.json");
//       const webcam = await tf.data.webcam(videoRef.current);
//       while (true) {
//         const img = await webcam.capture();
//         const tensor = tf.browser.fromPixels(img).expandDims();
//         const prediction = await model.predict(tensor).argMax(1);
//         console.log("Prediction:", prediction.dataSync()[0]);
//         img.dispose();
//         tensor.dispose();
//         await tf.nextFrame();
//         return<h1>hello</h1>
//       }
//     }

//  // }, []);

//   return (
//   <div>
//     {runModel()}
//     <video ref={videoRef} autoPlay playsInline />
//   </div>
//   );
// };

// export default ModelComponent;










// import React, { useRef, useEffect ,useState} from 'react';
// import * as tf from '@tensorflow/tfjs';
// import './Model.css';

// const ModelComponent = () => {
//  const canvasRef = useRef(null);
//  const videoRef = useRef(null);
 

//   useEffect(() => {
//     async function loadModel() {
        
//         const modelUrl = 'https://teachablemachine.withgoogle.com/models/HKzi-2vn_/model.json';
//         const model = await tf.loadLayersModel(modelUrl);
//         //const video = document.createElement('video');
//         const video = videoRef.current;
//         video.width = 640;
//         video.height = 480  ;
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         video.srcObject = stream;
//         video.play();
  
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = video.width;
//         canvas.height = video.height;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
  
//         const predict = async () => {
          
//           const img = tf.browser.fromPixels(video);
//           const imgTensor = img.expandDims();
//           const predictions = await model.predict(imgTensor);
//           const prediction = predictions.argMax(1);
//           console.log('prediction:', prediction.dataSync()[0]);
//           tf.dispose([img, imgTensor, predictions, prediction]);
//           requestAnimationFrame(predict);
//         }
  
//         requestAnimationFrame(predict);
//       }
  
//       loadModel();
//     }, []);

//   return (
//     <div>
//       <video ref={videoRef} autoPlay muted playsInline />
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };
//export default ModelComponent;