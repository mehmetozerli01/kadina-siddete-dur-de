import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/voice-emergency.css';

const VoiceEmergency = ({ showFloatingButton = true }) => {
  const [isListening, setIsListening] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [detectedCommand, setDetectedCommand] = useState('');
  const [panicMode, setPanicMode] = useState(false);
  const [location, setLocation] = useState(null);
  const [riskLevel, setRiskLevel] = useState(0);
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);

  const saveEmergencyRecording = useCallback((audioBlob) => {
    if (!('indexedDB' in window)) {
      return;
    }

    const request = indexedDB.open('EmergencyRecordings', 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['recordings'], 'readwrite');
      const objectStore = transaction.objectStore('recordings');
      const recording = {
        id: Date.now(),
        audio: audioBlob,
        timestamp: new Date(),
        location
      };
      objectStore.add(recording);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('recordings');
    };
  }, [location]);

  const logEmergency = useCallback((loc, timestamp) => {
    const log = {
      timestamp,
      location: loc,
      riskLevel,
      action: 'emergency_call'
    };

    const logs = JSON.parse(localStorage.getItem('emergency_logs') || '[]');
    logs.push(log);
    const recentLogs = logs.slice(-10);
    localStorage.setItem('emergency_logs', JSON.stringify(recentLogs));
  }, [riskLevel]);

  // Ses kaydı başlat
  const startAudioRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      audioChunks.current = [];

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        saveEmergencyRecording(audioBlob);
      };

      recorder.start();

      setTimeout(() => {
        if (recorder.state !== 'inactive') {
          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }
      }, 30000);
    } catch (error) {
      console.log('Mikrofon erişimi reddedildi:', error);
    }
  }, [saveEmergencyRecording]);

  const sendLocationViaSMS = useCallback(() => {
    if (location) {
      const message = `🚨 ACİL DURUM\nKonum: https://maps.google.com/?q=${location.lat},${location.lng}\nTarih: ${new Date().toLocaleString('tr-TR')}\n\nPlease help!`;
      const smsUrl = `sms:183&body=${encodeURIComponent(message)}`;
      window.open(smsUrl, '_self');
    }
  }, [location]);

  // Panic mode aktivasyonu
  const activatePanicMode = useCallback(() => {
    setPanicMode(true);
    setRiskLevel(100);

    startAudioRecording();

    setTimeout(() => {
      window.open('tel:183', '_self');
    }, 3000);

    sendLocationViaSMS();
    logEmergency(location, new Date());
  }, [location, logEmergency, sendLocationViaSMS, startAudioRecording]);

  const handleVoiceCommand = useCallback((command) => {
    const emergencyCommands = [
      'acil yardım', 'emergency', 'panic', 'help', 'yardım et',
      'polisi ara', 'call police', 'imdat', 'save me', 'bana yardım edin'
    ];

    const commands = command.toLowerCase();
    const isEmergency = emergencyCommands.some(cmd => commands.includes(cmd));

    if (isEmergency) {
      activatePanicMode();
      setRiskLevel(95);
    }
  }, [activatePanicMode]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.lang = 'tr-TR,en-US';
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        setDetectedCommand(command);
        handleVoiceCommand(command);
      };

      recognitionInstance.onerror = (event) => {
        console.log('Recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (isActive) {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log('Konum izni reddedildi');
        }
      );
    }

    let escapeClicks = 0;
    let spaceClicks = 0;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        escapeClicks++;
        setTimeout(() => { escapeClicks = 0; }, 2000);

        if (escapeClicks === 3) {
          activatePanicMode();
        }
      }

      if (e.key === ' ') {
        spaceClicks++;
        setTimeout(() => { spaceClicks = 0; }, 1000);

        if (spaceClicks === 3) {
          activatePanicMode();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activatePanicMode, handleVoiceCommand, isActive]);

  // Sesli komut sistemini başlat
  const startVoiceControl = () => {
    if (recognition) {
      setIsActive(true);
      recognition.start();
    } else {
      alert('Tarayıcınız sesli komutları desteklemiyor.');
    }
  };

  // Sesli komut sistemini durdur
  const stopVoiceControl = () => {
    if (recognition) {
      recognition.stop();
      setIsActive(false);
      setIsListening(false);
    }
  };

  // Risk seviyesi hesaplama
  useEffect(() => {
    if (isListening && detectedCommand) {
      // Basit AI risk analizi
      let risk = 0;
      
      if (detectedCommand.includes('vur') || detectedCommand.includes('beat')) risk += 30;
      if (detectedCommand.includes('kork') || detectedCommand.includes('scared')) risk += 20;
      if (detectedCommand.includes('kaç') || detectedCommand.includes('run')) risk += 25;
      if (detectedCommand.includes('tehdit') || detectedCommand.includes('threat')) risk += 25;
      
      setRiskLevel(Math.min(100, risk));
    }
  }, [detectedCommand, isListening]);

  useEffect(() => {
    const handleControl = (event) => {
      const action = event.detail?.action || event.detail;
      if (!action) return;

      if (action === 'open') {
        setIsWidgetOpen(true);
      } else if (action === 'close') {
        setIsWidgetOpen(false);
      } else if (action === 'toggle') {
        setIsWidgetOpen((prev) => !prev);
      } else if (action === 'panic') {
        setIsWidgetOpen(true);
        activatePanicMode();
      }
    };

    window.addEventListener('voiceEmergency:control', handleControl);
    return () => window.removeEventListener('voiceEmergency:control', handleControl);
  }, [activatePanicMode]);

  return (
    <>
      {/* Açılıp Kapanan Sesli Acil Yardım Widget */}
      {!isWidgetOpen ? (
        showFloatingButton && (
          <button
            className="voice-toggle-btn"
            onClick={() => setIsWidgetOpen(true)}
            title="Sesli Acil Yardım"
          >
            <span className="toggle-icon">🎤</span>
          </button>
        )
      ) : (
        <div className={`voice-emergency-widget ${panicMode ? 'panic-active' : ''}`}>
          {/* Widget Header */}
          <div className="widget-header">
            <h3>🎤 Sesli Acil Yardım</h3>
            <button
              className="widget-close-btn"
              onClick={() => setIsWidgetOpen(false)}
              title="Kapat"
            >
              ✕
            </button>
          </div>

          {!panicMode ? (
            <>
              <div className="voice-controls">
                <div className="voice-status">
                  <span className={`mic-icon ${isListening ? 'listening' : ''}`}>
                    🎤
                  </span>
                  <span className="voice-info">
                    {isListening ? 'Sesli komut aktif ✓' : 'Ses dinleniyor'}
                  </span>
                </div>

                {!isActive ? (
                  <button
                    onClick={startVoiceControl}
                    className="voice-activate-btn"
                  >
                    🎤 Sesli Acil Yardımı Aktif Et
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceControl}
                    className="voice-deactivate-btn"
                  >
                    ⏸️ Dinlemeyi Durdur
                  </button>
                )}

                <button
                  onClick={activatePanicMode}
                  className="voice-panic-btn"
                >
                  🚨 PANİK BUTONU
                </button>
              </div>

              {detectedCommand && (
                <div className="detected-command">
                  <p>Tespit edilen komut: "{detectedCommand}"</p>
                  <div className="risk-indicator">
                    <span>Risk Seviyesi: </span>
                    <span className={`risk-${riskLevel > 50 ? 'high' : riskLevel > 25 ? 'medium' : 'low'}`}>
                      {riskLevel}%
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="panic-mode-active">
              <h2>🚨 PANİK MODU AKTİF</h2>
              <p>3 saniye içinde 183 aranacak...</p>
              <div className="panic-countdown">3</div>
              <div className="panic-actions">
                <button onClick={() => window.open('tel:183', '_self')}>
                  📞 Şimdi Ara
                </button>
                <button onClick={() => setPanicMode(false)}>
                  ❌ İptal
                </button>
              </div>
              {location && (
                <p className="location-info">
                  📍 Konum gönderiliyor: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>
          )}
        </div>
      )}

    </>
  );
};

export default VoiceEmergency;

