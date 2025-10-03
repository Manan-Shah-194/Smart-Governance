import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Minimize2 } from 'lucide-react';

const AIChatbot = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for government services. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqData = [
    {
      question: "How do I file a complaint?",
      answer: "You can file a complaint by going to the 'Complaints' section, filling out the form with details about your issue, and submitting it. You'll receive a complaint ID for tracking."
    },
    {
      question: "How to book an appointment?",
      answer: "Visit the 'Appointments' section, select the service you need, choose your preferred date and time, and submit the booking request. You'll receive a confirmation."
    },
    {
      question: "What documents are required for birth certificate?",
      answer: "For birth certificate, you need: 1) Hospital discharge certificate, 2) Parent's ID proof, 3) Address proof, 4) Marriage certificate of parents, 5) Passport size photos."
    },
    {
      question: "How to check my complaint status?",
      answer: "Go to the 'Status' section and enter your complaint ID to check the current status and progress of your complaint."
    },
    {
      question: "What are the office hours?",
      answer: "Government offices are open Monday to Friday from 9:00 AM to 5:00 PM, and Saturday from 9:00 AM to 1:00 PM. Sunday is a holiday."
    },
    {
      question: "How to pay utility bills?",
      answer: "Go to the 'Payments' section, select your bill type, enter your consumer number, and choose your payment method to pay online."
    },
    {
      question: "What welfare schemes are available?",
      answer: "Various schemes include scholarships, pension for senior citizens, MGNREGA job cards, skill development programs, and more. Check the 'Employment & Welfare' section for details."
    },
    {
      question: "How to contact local leaders?",
      answer: "Visit the 'Leaders' section to find contact information for gram panchayat leaders, sarpanch, and other local officials in your area."
    }
  ];

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for FAQ matches
    for (const faq of faqData) {
      if (message.includes(faq.question.toLowerCase().split(' ')[0]) || 
          message.includes('complaint') && faq.question.includes('complaint') ||
          message.includes('appointment') && faq.question.includes('appointment') ||
          message.includes('birth certificate') && faq.question.includes('birth certificate') ||
          message.includes('status') && faq.question.includes('status') ||
          message.includes('office hours') && faq.question.includes('office hours') ||
          message.includes('bill') && faq.question.includes('bill') ||
          message.includes('welfare') && faq.question.includes('welfare') ||
          message.includes('leader') && faq.question.includes('leader')) {
        return faq.answer;
      }
    }

    // General responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm your AI assistant for Sarv Seva platform. I can help you with:\n\n• Filing complaints\n• Booking appointments\n• Requesting documents\n• Emergency services\n• Employment & welfare\n• Contacting leaders\n\nWhat would you like to do today?";
    }
    
    if (message.includes('help') || message.includes('what can you do')) {
      return "I can help you with various government services:\n\n🔹 **Complaints**: File and track complaints\n🔹 **Appointments**: Book government service appointments\n🔹 **Documents**: Request birth certificates, income certificates, etc.\n🔹 **Emergency**: Get emergency contacts and share location\n🔹 **Employment**: Find jobs, internships, and welfare schemes\n🔹 **Leaders**: Connect with gram panchayat leaders\n\nWhich service do you need help with?";
    }
    
    if (message.includes('complaint') || message.includes('file complaint')) {
      return "To file a complaint:\n\n1. Go to the 'Complaints' section\n2. Fill out the complaint form with:\n   - Title and description\n   - Category (Water, Electricity, etc.)\n   - Location details\n   - Priority level\n3. Submit the form\n\nYou'll get a complaint ID for tracking. Would you like me to guide you through any specific step?";
    }
    
    if (message.includes('appointment') || message.includes('book appointment')) {
      return "To book an appointment:\n\n1. Go to the 'Appointments' section\n2. Select the service you need\n3. Choose your preferred date and time\n4. Select purpose (New, Renewal, Updation, etc.)\n5. Enter your contact details\n6. Submit the booking\n\nYou'll receive a confirmation. Need help with any specific service?";
    }
    
    if (message.includes('document') || message.includes('certificate')) {
      return "To request documents:\n\n1. Go to the 'Documents' section\n2. Select document type (Birth, Income, Caste, etc.)\n3. Enter purpose and urgency level\n4. Submit the request\n\nYou can track the status in the 'Status' section. Which document do you need?";
    }
    
    if (message.includes('emergency') || message.includes('help emergency')) {
      return "For emergency services:\n\n1. Go to the 'Emergency' section\n2. Use the emergency alert button for immediate help\n3. Call emergency numbers:\n   - Police: 100\n   - Fire: 101\n   - Ambulance: 102\n4. Share your location if needed\n\nIs this a medical, fire, or police emergency?";
    }
    
    if (message.includes('employment') || message.includes('job') || message.includes('welfare')) {
      return "For employment and welfare:\n\n1. Go to the 'Employment' section\n2. Choose from:\n   - Government Jobs\n   - Student Internships\n   - Welfare Schemes\n   - Skill Development\n3. Browse available opportunities\n4. Apply directly or visit MahaDBT portal\n\nWhat type of opportunity are you looking for?";
    }
    
    if (message.includes('leader') || message.includes('contact leader')) {
      return "To contact leaders:\n\n1. Go to the 'Leaders' section\n2. Search by name, village, or specialization\n3. View leader profiles and contact details\n4. Call or message directly\n5. Filter by role (Sarpanch, Panchayat Member, etc.)\n\nWhich area or type of leader are you looking for?";
    }
    
    if (message.includes('status') || message.includes('check status')) {
      return "To check status:\n\n1. Go to the 'Status' section\n2. Enter your service ID (COMP-, APT-, DOC-)\n3. View progress and updates\n4. Download documents when ready\n\nDo you have a service ID to check?";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! I'm here to help make government services easier for you. Is there anything else you need assistance with?";
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Feel free to come back anytime if you need help with Sarv Seva services. Have a great day!";
    }

    // Default response
    return "I'm here to help you with Sarv Seva services! You can ask me about:\n\n• How to file a complaint\n• How to book an appointment\n• How to request documents\n• Emergency services\n• Employment opportunities\n• Contacting leaders\n• Checking status\n\nWhat would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I file a complaint?",
    "How to book an appointment?",
    "What documents are required?",
    "How to check status?",
    "What are office hours?"
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
    handleSendMessage();
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sarv Seva AI Assistant</h1>
            <p className="text-gray-600">
              Get instant help with government services and frequently asked questions.
            </p>
          </div>

          <div className="grid grid-2 gap-8">
            {/* Chat Interface */}
            <div className="card h-96 flex flex-col">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="btn btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* FAQ and Quick Questions */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqData.slice(0, 4).map((faq, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{faq.question}</h4>
                      <p className="text-xs text-gray-600">{faq.answer.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services I Can Help With</h3>
                <div className="grid grid-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Complaint Filing
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Appointment Booking
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Document Requirements
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Status Checking
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Bill Payments
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Welfare Schemes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
