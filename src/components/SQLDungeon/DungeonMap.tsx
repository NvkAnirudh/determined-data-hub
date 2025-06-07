
import React from "react";
import { Card } from "@/components/ui/card";
import { PlayerProgress } from "./types";
import { dungeonRooms } from "./gameData";
import { Sword, Shield, Key, Scroll, Crown, Gem } from "lucide-react";

interface DungeonMapProps {
  currentLevel: number;
  playerProgress: PlayerProgress;
  showFeedback: boolean;
  isCorrect: boolean;
}

const DungeonMap: React.FC<DungeonMapProps> = ({ 
  currentLevel, 
  playerProgress, 
  showFeedback, 
  isCorrect 
}) => {
  const getRoomIcon = (room: any) => {
    switch (room.type) {
      case 'room':
        return <Shield className="w-6 h-6" />;
      case 'bridge':
        return <Sword className="w-6 h-6" />;
      case 'door':
        return <Key className="w-6 h-6" />;
      case 'treasure':
        return <Gem className="w-6 h-6" />;
      default:
        return <Scroll className="w-6 h-6" />;
    }
  };

  const getRoomStatus = (room: any) => {
    if (room.level !== undefined && room.level < currentLevel) {
      return 'completed';
    }
    if (room.level === currentLevel) {
      return 'current';
    }
    if (room.level !== undefined && room.level === currentLevel + 1) {
      return 'next';
    }
    return 'locked';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 border-green-400 text-green-100';
      case 'current':
        return 'bg-blue-600 border-blue-400 text-blue-100 animate-pulse';
      case 'next':
        return 'bg-yellow-600 border-yellow-400 text-yellow-100';
      default:
        return 'bg-gray-700 border-gray-500 text-gray-300';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 border-purple-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-4 text-center text-purple-300">
          🏰 SQL Dungeon Map
        </h3>
        
        {/* Dungeon Path */}
        <div className="relative h-64 flex items-center justify-between px-8">
          {dungeonRooms.map((room, index) => {
            const status = getRoomStatus(room);
            const statusColor = getStatusColor(status);
            
            return (
              <div key={room.id} className="flex flex-col items-center">
                {/* Connection Line */}
                {index > 0 && (
                  <div className="absolute h-1 bg-gradient-to-r from-purple-600 to-purple-400 opacity-60"
                       style={{
                         left: `${(index - 1) * (100 / (dungeonRooms.length - 1))}%`,
                         width: `${100 / (dungeonRooms.length - 1)}%`,
                         top: '50%'
                       }}
                  />
                )}
                
                {/* Room Icon */}
                <div className={`
                  relative z-20 w-16 h-16 rounded-full border-2 flex items-center justify-center
                  transition-all duration-500 ${statusColor}
                  ${status === 'current' ? 'scale-110 shadow-lg shadow-blue-500/50' : ''}
                  ${showFeedback && status === 'current' && isCorrect ? 'animate-bounce' : ''}
                `}>
                  {getRoomIcon(room)}
                  
                  {status === 'current' && showFeedback && isCorrect && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Crown className="w-6 h-6 text-yellow-400 animate-bounce" />
                    </div>
                  )}
                </div>
                
                {/* Room Label */}
                <span className="mt-2 text-xs text-center text-gray-300 font-medium">
                  {room.type === 'room' && room.level !== undefined ? `Level ${room.level + 1}` : 
                   room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Current Level Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 rounded-lg px-4 py-2">
            <Scroll className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200">
              Current Quest: Level {currentLevel + 1}
            </span>
          </div>
          
          {showFeedback && (
            <div className={`mt-3 p-3 rounded-lg ${
              isCorrect ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'
            }`}>
              {isCorrect ? '🎉 Quest Complete!' : '💀 Quest Failed - Try Again!'}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DungeonMap;
