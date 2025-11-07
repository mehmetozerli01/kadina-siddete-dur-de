import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/chat.css';

const ChatSystem = ({ showFloatingButton = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const messagesEndRef = useRef(null);

  // Örnek yanıtlar
  const responses = [
    "Merhaba, ben buradayım. Seni dinliyorum. 💜",
    "Yalnız olmadığını bilmeni istiyorum. Sen güçlüsün.",
    "183 numaralı hattı arayabilirsin. 7/24 destek alabilirsin.",
    "Şiddet hiçbir şekilde kabul edilemez. Sen haklısın.",
    "Güvenli bir yerde misin? Acil durumda 155'i ara.",
    "Psikolojik destek almak için ŞÖNİM merkezlerine başvurabilirsin.",
    "Haklarını bilmek çok önemli. Yasal danışmanlık alabilirsin.",
    "Sen değerlisin ve şiddetsiz bir yaşamı hak ediyorsun.",
    "Çocukların varsa onlar için de destek alabilirsin.",
    "Ekonomik bağımsızlık için meslek edindirme kursları var."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Bot yanıtı simülasyonu
    setTimeout(() => {
      const botResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('tr-TR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openNamePrompt = useCallback(() => {
    setShowNameInput(true);
    setIsOpen(false);
  }, []);

  const startChat = useCallback(() => {
    if (!userName.trim()) return;
    setShowNameInput(false);
    setIsOpen(true);
    
    // Hoş geldin mesajı
    const welcomeMessage = {
      id: Date.now(),
      text: `Merhaba ${userName}! Ben buradayım ve seni dinliyorum. Nasıl yardımcı olabilirim? 💜`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setMessages([welcomeMessage]);
  }, [userName]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setMessages([]);
    setShowNameInput(false);
    setUserName('');
  }, []);

  const emergencyCall = () => {
    window.open('tel:183', '_self');
  };

  useEffect(() => {
    const handleControl = (event) => {
      const action = event.detail?.action || event.detail;
      if (!action) return;

      if (action === 'open') {
        openNamePrompt();
      } else if (action === 'close') {
        closeChat();
      } else if (action === 'toggle') {
        if (isOpen || showNameInput) {
          closeChat();
        } else {
          openNamePrompt();
        }
      }
    };

    window.addEventListener('chatSystem:control', handleControl);
    return () => window.removeEventListener('chatSystem:control', handleControl);
  }, [isOpen, showNameInput, closeChat, openNamePrompt]);

  return (
    <div className="chat-widget">
      {showFloatingButton && !isOpen && !showNameInput && (
        <div className="chat-toggle" onClick={openNamePrompt}>
          <span className="chat-icon">💬</span>
          <span className="chat-text">Destek Chat</span>
        </div>
      )}

      {showNameInput && (
        <div className="chat-name-modal">
          <div className="chat-name-content">
            <button 
              className="close-name-modal" 
              onClick={() => setShowNameInput(false)}
              aria-label="Modal'ı kapat"
            >
              ✕
            </button>
            <h3>💜 Güvenli Destek Chat</h3>
            <p>Anonim olarak destek alabilirsin. İsim bilginiz kaydedilmez.</p>
            <div className="name-input-group">
              <input
                type="text"
                placeholder="Nasıl çağrılmak istersin? (İsteğe bağlı)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && startChat()}
                className="name-input"
              />
              <button onClick={startChat} className="start-chat-btn">
                Sohbete Başla
              </button>
            </div>
            <div className="emergency-info">
              <p><strong>🆘 Acil Durum:</strong></p>
              <button onClick={emergencyCall} className="emergency-btn">
                📞 183 - Hemen Ara
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-title">
              <span className="chat-icon">💜</span>
              <span>Güvenli Destek</span>
            </div>
            <button onClick={closeChat} className="close-chat" aria-label="Chat'i kapat">
              ✕
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{message.timestamp}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <div className="chat-input-group">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mesajınızı yazın..."
                className="chat-input"
                rows="2"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="send-button"
                aria-label="Mesaj gönder"
              >
                📤
              </button>
            </div>
            
            <div className="chat-footer">
              <button onClick={emergencyCall} className="emergency-call-btn">
                🆘 Acil Durum: 183
              </button>
              <p className="privacy-note">
                🔒 Bu sohbet tamamen gizlidir ve kaydedilmez.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSystem;
