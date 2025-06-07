
import React from "react";
import { Card } from "@/components/ui/card";
import { GameState } from "./types";
import { Shield, Sword, Crown } from "lucide-react";

interface GameHUDProps {
  gameState: GameState;
}

const GameHUD: React.FC<GameHUDProps> = ({ gameState }) => {
  return (
    <Card className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 border-purple-500">
      <div className="flex items-center justify-between">
        {/* Left side - Level and Score */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-xs text-gray-400">Level</div>
              <div className="text-lg font-bold text-yellow-300">{gameState.currentLevel + 1}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sword className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-xs text-gray-400">Score</div>
              <div className="text-lg font-bold text-green-300">{gameState.score}</div>
            </div>
          </div>
        </div>

        {/* Center - Game Title */}
        <div className="text-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SQL Dungeon Adventure
          </h1>
          <p className="text-xs text-gray-400">Master SQL Through Epic Quests</p>
        </div>

        {/* Right side - Lives */}
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-400" />
          <div>
            <div className="text-xs text-gray-400">Lives</div>
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < gameState.lives ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameHUD;
