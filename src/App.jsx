import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Chasing",
    songArtist: "NEFFEX",
    songSrc: "./assets/songs/Chasing - NEFFEX.mp3",
    songAvatar: "./assets/images/image1.jpg",
  });

  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("04 : 38");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  //Play Audio Function
  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "Chasing",
      songArtist: "NEFFEX",
      songSrc: "./assets/songs/Chasing - NEFFEX.mp3",
      songAvatar: "/assets/images/image1.jpg",
    },
    {
      songName: "AURORA - Runaway",
      songArtist: "Aurora Aksnes",
      songSrc: "./assets/songs/AURORA - Runaway (Lyrics).mp3",
      songAvatar: "./assets/images/image4.jpg",
    },
    {
      songName: "Catch Me If I Fall",
      songArtist: "TEGNENT",
      songSrc: "./assets/songs/Catch Me If I Fall - NEFFEX.mp3",
      songAvatar: "./assets/images/image2.jpg",
    },
    {
      songName: "Inspired (Clean)",
      songArtist: "NEFFEX",
      songSrc: "./assets/songs/Inspired (Clean) - NEFFEX.mp3",
      songAvatar: "./assets/images/image3.jpg",
    },
    {
      songName: "Baby doll [ slowed + reverb ]",
      songArtist: "Kanika Kapoor",
      songSrc:
        "./assets/songs/Baby doll [ slowed + reverb ] __ meet bros ,Kanika Kapoor __ jr santu.mp3",
      songAvatar: "./assets/images/image5.jpg",
    },
    {
      songName: "Soch (Slowed+Reverbed)",
      songArtist: "Hardy Sandhu",
      songSrc: "./assets/songs/SOCH(Slowed+Reverbed) __ Hardy Sandhu.webm",
      songAvatar: "./assets/images/image6.jpg",
    },
    {
      songName: "Apna Bana Le",
      songArtist: "Arijit Singh",
      songSrc:
        "./assets/songs/Apna Bana Le - Full Audio _ Bhediya _ Varun Dhawan, Kriti Sanon_ Sachin-Jigar,Arijit Singh,Amitabh B.webm",
      songAvatar: "./assets/images/image7.jpg",
    },
  ];

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  return (
    <>
      <div className="container">
        <audio
          src="./Assets/songs/Chasing - NEFFEX.mp3"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>

        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            alt="song Avatar"
            id="songAvatar"
          />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLenght">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControlers">
            <i
              className="fa-solid fa-backward musicControler"
              onClick={handlePrevSong}
            ></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
