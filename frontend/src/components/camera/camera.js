import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css"
import sound1_ from '../../sound1.MP3'
import sound2_ from '../../sound2.MP3'
import sound3_ from '../../sound3.MP3'
import sound4_ from '../../sound4.mp3'
let toggle = "stop";
  
  const TestOverlay = (props) => {
    const sound = props.sound;
    const alertt = props.alertt;
    const sound1 = new Audio(sound1_);
    const sound2 = new Audio(sound2_);
    const sound3 = new Audio(sound3_);
    const sound4 = new Audio(sound4_);
    const [posture, setPosture] = useState(3);
    const [buttonName,setButtonName] = useState("start tracking");
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    console.log("i'm here", sound);
    const [result, setResult] = useState("");
    const canvasRef = useRef();
    const imageRef = useRef();
    const videoRef = useRef();
    // Get camera feed
    useEffect(() => {
      async function getCameraStream() {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });
    
        if (videoRef.current) {      
          videoRef.current.srcObject = stream;
        }
      };
    
      getCameraStream();
    }, []);

    // Send iage to API
    useEffect(() => {
      const interval = setInterval(async () => {
        if(toggle == "stop"){
          return () => clearInterval(interval);
        } 
        else {
          captureImageFromCamera();

          if (imageRef.current) {
            const formData = new FormData();
            formData.append('image', imageRef.current);

            const response = await fetch('/classify', {
              method: "POST",
              body: formData,
            });
            if (response.status === 200) {
              
              const text = await response.text();
              setResult(text);
              checkPos(text);

            } else {
              setResult("Error from API. ");
            }
          }
        }
      }, 5000); // <- interval in ms
      return () => clearInterval(interval);
    }, []);
    const goAlert = () =>{
      console.log("goalert", alertt);
      if(alertt==0) alertSound();
      else if(alertt == 1) alertPop();
      else
      {
        alertSound();
        alertPop();
      }
    }
    const checkPos = function(text){
      console.log("result:",text)
              //if bad posture 
              if(text != "0") 
              {
                console.log("alert type" , alertt);
                console.log("sound",sound);
                console.log("bad",posture);
                setPosture(3);
                console.log("bad after",posture);
              }
              //else
              else {
                setPosture(0);
              }
              console.log(posture);
              //if bad posture for 3 times, alert
              if(posture >= 3) goAlert();
    }
    const alertSound = function(){
      if(sound === "sound1") {
        console.log("alert:",sound);
        sound1.play();
        sound1.loop = false;
      }
      if(sound === "sound2") {
        console.log("alert:",sound);
        sound2.play();
        sound2.loop = false;
      }
      if(sound === "sound3") {
        console.log("alert:",sound);
        sound3.play();
        sound3.loop = false;
      }
      if(sound === "sound4") {
        console.log("alert:",sound);
        sound4.play();
        sound4.loop = false;
      }
    }
    function alertPop(){
      alert();
    }
    const playCameraStream = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    const captureImageFromCamera = () => {
      const context = canvasRef.current.getContext('2d');
      const { videoWidth, videoHeight } = videoRef.current;
  
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
  
      context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
  
      canvasRef.current.toBlob((blob) => {
        imageRef.current = blob;
      })
    };

    const toggleAlert=function(){
      if(toggle=="stop") {
        toggle = "start";
        setButtonName("stop tracking");
      }
      else if(toggle=="start") {
        toggle = "stop";
        setButtonName("start tracking");
      }
    }
  
    return (
      <>
        <main>
          <video ref={videoRef} onCanPlay={() => playCameraStream()} id="video" />
          <canvas ref={canvasRef} hidden></canvas>
          <p>Currently seeing: {result}</p>
        </main>
        <div className ="startTrack">
          <button className="startBut" onClick={toggleAlert}>
              {buttonName}
          </button>
          
        </div>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };

  export default TestOverlay