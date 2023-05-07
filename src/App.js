import React, { useState } from 'react';
import axios from 'axios';
import { GOOGLE_API_KEY, SEARCH_ENGINE_ID } from './config';
import queryString from 'query-string';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import ModelComponent from './Model';

const AudioToText = () => {
  const commands = [
    {
      command: 'reset',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition(commands);

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const query = queryString.stringify({
      key: GOOGLE_API_KEY,
      cx: SEARCH_ENGINE_ID,
      q: text || transcript,
      searchType: 'image',
      imgSize: 'medium',
      num: 10,
      fields: 'items(link)'
    });

    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1?${query}`);
      const imageLinks = response.data.items.map((item) => item.link);
      setImages(imageLinks);
    } catch (error) {
      console.error(error);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  function StartStopButton() {
    const [isRunning, setIsRunning] = useState(false);

    const handleButtonClick = () => {
      if (isRunning) {
        setIsRunning(false);
        SpeechRecognition.stopListening();
      } else {
        setIsRunning(true);
        resetTranscript();
        images.length=0;
        startListening();
      }
    };

  return (
    <button className='button1' style={{backgroundColor: isRunning?'red':'green'}} onClick={handleButtonClick}>
      {isRunning ? 'Stop' : 'Start'}
    </button>
  );
}

  return (
    <div className='app'>
      <div className='app1'>
        <h1>Express your difficulties to the docter !</h1>
        <ModelComponent/>
      </div>
      <div className="app2">
        <h1>Let's see what the doctor has to say !</h1>
        <div className="audio-to-text">
          <p className='para'>Press the Start button and speak to convert your audio to text:</p>
          <div className="audio-controls">
            {StartStopButton()}
            <form className='form1' onSubmit={handleSubmit}>
              <button className='button4' type="submit">Generate Images</button>
            </form>
          </div >
          <div className='transcript'><p>{transcript}</p></div>
        </div>
        <div className="image-results">
          {images.length > 0 ? (
            images.map((imageUrl) => <img src={imageUrl} alt="generated image" key={imageUrl} />)
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioToText;














// import React from 'react';
// import ImageGenerator from './ImageGenerator';
// import Audio_to_Text from './ImageGenerator';

// function App() {
//   return (
//     <div>
//       <h1>Generate Text from Audio</h1>
//       <Audio_to_Text/>
//       <h1>Generate Images from Text</h1>
//       <ImageGenerator />
//     </div>
//   );
// }

// export default App;




