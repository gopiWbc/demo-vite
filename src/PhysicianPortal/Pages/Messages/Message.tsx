import { useState } from 'react';
import { Send, Paperclip, Image, Smile, MoreVertical, Search, X, Plus, ChevronLeft } from 'lucide-react';

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'Amanda Davis', lastMessage: 'Thanks for the update!', time: '2m', unread: 2, avatar: 'https://i.pravatar.cc/150?img=1', online: true },
    { id: 2, name: 'Carlos Martinez', lastMessage: 'Can we schedule a meeting?', time: '15m', unread: 0, avatar: 'https://i.pravatar.cc/150?img=13', online: true },
    { id: 3, name: 'Emma Wilson', lastMessage: 'Perfect, see you then!', time: '1h', unread: 0, avatar: 'https://i.pravatar.cc/150?img=5', online: false },
    { id: 4, name: 'Marcus Johnson', lastMessage: 'The project looks great', time: '2h', unread: 1, avatar: 'https://i.pravatar.cc/150?img=12', online: true },
    { id: 5, name: 'Sophie Chen', lastMessage: 'I\'ll send the files over', time: '3h', unread: 0, avatar: 'https://i.pravatar.cc/150?img=9', online: false },
    { id: 6, name: 'David Kim', lastMessage: 'Great work on the presentation', time: '5h', unread: 0, avatar: 'https://i.pravatar.cc/150?img=14', online: true },
    { id: 7, name: 'Isabella Lopez', lastMessage: 'Let me know if you need anything', time: '1d', unread: 0, avatar: 'https://i.pravatar.cc/150?img=10', online: false },
    { id: 8, name: 'James Taylor', lastMessage: 'Sounds good to me!', time: '2d', unread: 0, avatar: 'https://i.pravatar.cc/150?img=15', online: false },
  ];

  type Message = { id: number; text: string; time: string; sent: boolean };
  const conversations: Record<number, Message[]> = {
    1: [
      { id: 1, text: 'Hi there, how are you today?', time: '10:30 AM', sent: false },
      { id: 2, text: 'I\'m doing great, thanks for asking! How about you?', time: '10:32 AM', sent: true },
      { id: 3, text: 'Pretty good! I wanted to touch base about the new project we discussed last week. Do you have any updates?', time: '10:33 AM', sent: false },
      { id: 4, text: 'Yes! I\'ve made some significant progress. I\'ve completed the initial research phase and started working on the mockups. Would you like me to share what I have so far?', time: '10:35 AM', sent: true },
      { id: 5, text: 'That would be awesome! I\'d love to see what you\'ve come up with.', time: '10:36 AM', sent: false },
      { id: 6, text: 'Thanks for the update!', time: '10:38 AM', sent: false },
    ],
    2: [
      { id: 1, text: 'Hey! Are you available for a quick call?', time: '9:15 AM', sent: false },
      { id: 2, text: 'Sure! Give me 5 minutes?', time: '9:16 AM', sent: true },
      { id: 3, text: 'Can we schedule a meeting?', time: '9:20 AM', sent: false },
    ],
    3: [
      { id: 1, text: 'The presentation went really well!', time: '2:45 PM', sent: false },
      { id: 2, text: 'That\'s fantastic news! Congratulations!', time: '2:47 PM', sent: true },
      { id: 3, text: 'Perfect, see you then!', time: '2:50 PM', sent: false },
    ],
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleSelectUser = (userId: any) => {
    setSelectedUser(userId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Contacts List */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative inset-y-0 left-0 z-50 w-full sm:w-80 lg:w-96 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col mt-16 md:mt-0`}>
        
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Messages</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 max-h-[69vh] overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelectUser(user.id)}
              className={`flex items-center gap-3 p-3 sm:p-4 cursor-pointer border-b border-gray-100 transition-colors ${
                selectedUser === user.id 
                  ? 'bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                />
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate pr-2">{user.name}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">{user.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{user.lastMessage}</p>
              </div>
              {user.unread > 0 && (
                <div className="flex-shrink-0 min-w-5 h-5 bg-app-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">{user.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <ChevronLeft  className="size-5 text-gray-700" />
              </button>
              <div className="relative flex-shrink-0">
                <img
                  src={users.find(u => u.id === selectedUser)?.avatar}
                  alt={users.find(u => u.id === selectedUser)?.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                {users.find(u => u.id === selectedUser)?.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{users.find(u => u.id === selectedUser)?.name}</h2>
                <p className="text-xs sm:text-sm text-green-600">
                  {users.find(u => u.id === selectedUser)?.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button> */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 max-h-[69vh] lg:max-h-[66vh] overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50">
            {(conversations[selectedUser] || []).map((msg) => (
              <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${msg.sent ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!msg.sent && (
                    <img
                      src={users.find(u => u.id === selectedUser)?.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex flex-col">
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.sent
                          ? 'bg-app-primary text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                      }`}
                    >
                      <p className="text-sm sm:text-[15px] leading-relaxed break-words">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1.5 px-1 ${msg.sent ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
            <div className="flex items-end gap-2">
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200">
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-sm sm:text-[15px] text-gray-800 placeholder-gray-400 min-w-0"
                />
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 hidden sm:block">
                  <Image className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="p-3 btn-primary rounded-full transition-colors shadow-sm flex-shrink-0"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 bg-white relative">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-100 flex items-center justify-center mb-6 sm:mb-8">
            <Send className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-3 text-center">Your Messages</h2>
          <p className="text-gray-600 text-center max-w-md text-sm sm:text-base px-4">
            Select a conversation to start chatting with your contacts
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;