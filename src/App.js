import React, { useState, useEffect, useRef } from 'react';

// Hardcoded channel data from the user's provided list
const channelList = [
  {
    "name": "Kapamilya Channel",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Kapamilya_Channel_Logo_2020.svg/2560px-Kapamilya_Channel_Logo_2020.svg.png",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001248/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "Kapamilya Channel HD",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Kapamilya_Channel_Logo_2020.svg/2560px-Kapamilya_Channel_Logo_2020.svg.png",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001286/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "PBO",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pinoy_Box_Office_logo.svg/1200px-Pinoy_Box_Office_logo.svg.png",
    "url": "http://143.44.136.113:6910/001/2/ch00000090990000001078/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "DZMM Teleradyo",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/DZMM_TeleRadyo.svg/1200px-DZMM_TeleRadyo.svg.png",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001249/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "ANC",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001274/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "MYX Philippines",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "url": "http://143.44.136.111:6910/001/2/ch00000090990000001252/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "GMA 7",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001093/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "GTV",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001143/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "ALL TV",
    "group": "Converge",
    "logo": "https://brandlogo.org/wp-content/uploads/2024/05/All-TV-Logo-300x300.png.webp",
    "url": "http://143.44.136.110:6910/001/2/ch00000090990000001179/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "Bilyonaryo Channel",
    "group": "Converge",
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxvjeBIthYiEaZHeVeYpDicIlOTdv3G6lzoal3VM2xVzWu_J7XxM657oz&s=10",
    "url": "http://143.44.136.111:6910/001/2/ch00000090990000001124/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "TV5",
    "group": "Converge",
    "logo": "https://static.wikia.nocookie.net/russel/images/7/7a/TV5_HD_Logo_2024.png/revision/latest/scale-to-width-down/290?cb=20240202141126",
    "url": "http://143.44.136.111:6910/001/2/ch00000090990000001088/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  },
  {
    "name": "A2Z",
    "group": "Converge",
    "logo": "https://static.wikia.nocookie.net/russel/images/8/85/A2Z_Channel_11_without_Channel_11_3D_Logo_2020.png/revision/latest?cb=20231101144828",
    "url": "http://143.44.136.113:6910/001/2/ch00000090990000001087/manifest.mpd?virtualDomain=001.live_hls.zte.com"
  }
];

// Main App component
const App = () => {
  // State to hold the currently selected channel's URL
  const [source, setSource] = useState('');
  
  // Ref to directly access the video DOM element
  const videoRef = useRef(null);
  
  // Refs to hold the player instances
  const hlsRef = useRef(null);
  const dashRef = useRef(null);

  // useEffect hook to handle the video playback logic
  useEffect(() => {
    const video = videoRef.current;
    
    // Cleanup function for players
    const cleanupPlayers = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (dashRef.current) {
        dashRef.current.reset();
        dashRef.current = null;
      }
    };
    
    if (video && source) {
      // Cleanup any existing players before loading a new stream
      cleanupPlayers();

      // Check the URL to determine the streaming format (HLS or DASH)
      if (source.includes('.m3u8')) {
        // Load HLS.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.Hls.isSupported()) {
            const hls = new window.Hls();
            hlsRef.current = hls;
            hls.loadSource(source);
            hls.attachMedia(video);
            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
              video.play().catch(error => console.error('Autoplay prevented:', error));
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = source;
            video.addEventListener('loadedmetadata', () => video.play());
          }
        };
      } else if (source.includes('.mpd')) {
        // Load Dash.js
        const script = document.createElement('script');
        script.src = 'https://cdn.dashjs.org/latest/dash.all.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.dashjs) {
            const dashPlayer = window.dashjs.MediaPlayer().create();
            dashRef.current = dashPlayer;
            dashPlayer.initialize(video, source, true);
          }
        };
      }
      
      // Cleanup on component unmount or source change
      return () => {
        cleanupPlayers();
      };
    }
    
  }, [source]); // The effect re-runs whenever the 'source' changes

  // Handle a channel click from the list
  const handleChannelClick = (url) => {
    // This will update the source and trigger the useEffect hook
    setSource(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row p-4 font-sans gap-4">
      
      {/* Channel List */}
      <div className="md:w-1/4 w-full p-4 bg-gray-800 rounded-xl shadow-2xl flex-shrink-0 h-96 md:h-auto overflow-y-auto">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4 sticky top-0 bg-gray-800 pb-2">
          Channels
        </h2>
        {channelList.map((channel, index) => (
          <div
            key={index}
            onClick={() => handleChannelClick(channel.url)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors
              ${source === channel.url ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <img 
              src={channel.logo} 
              alt={`${channel.name} logo`} 
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => { e.target.src = "https://placehold.co/40x40/5a67d8/ffffff?text=TV"; }}
            />
            <span className="font-medium truncate">
              {channel.name}
            </span>
          </div>
        ))}
      </div>

      {/* Video Player */}
      <div className="flex-grow flex flex-col justify-center items-center p-6 bg-gray-800 rounded-xl shadow-2xl">
        {source ? (
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
            ></video>
          </div>
        ) : (
          <div className="w-full aspect-video flex items-center justify-center bg-gray-900 rounded-lg shadow-xl">
            <p className="text-xl text-gray-400">Pumili ng channel sa kaliwa para magsimula.</p>
          </div>
        )}
      </div>

      {/* Tailwind CSS Script for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default App;