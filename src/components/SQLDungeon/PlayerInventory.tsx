
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerProgress } from "./types";
import { Scroll, Key, Sword, Shield, Crown } from "lucide-react";

interface PlayerInventoryProps {
  progress: PlayerProgress;
}

const PlayerInventory: React.FC<PlayerInventoryProps> = ({ progress }) => {
  const getItemIcon = (item: string) => {
    if (item.includes('Scroll')) return <Scroll className="w-4 h-4" />;
    if (item.includes('Key')) return <Key className="w-4 h-4" />;
    if (item.includes('Bridge') || item.includes('Blueprint')) return <Sword className="w-4 h-4" />;
    if (item.includes('Shield')) return <Shield className="w-4 h-4" />;
    return <Crown className="w-4 h-4" />;
  };

  const getConceptColor = (concept: string) => {
    if (concept.includes('SELECT')) return 'bg-blue-600';
    if (concept.includes('JOIN')) return 'bg-green-600';
    if (concept.includes('GROUP')) return 'bg-purple-600';
    if (concept.includes('WHERE')) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  return (
    <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-purple-500 h-full">
      <CardHeader>
        <CardTitle className="text-purple-300 text-center">
          🎒 Adventurer's Inventory
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Inventory Items */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Sword className="w-4 h-4" />
            Items Collected
          </h4>
          <div className="space-y-2">
            {progress.inventory.length > 0 ? (
              progress.inventory.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-gray-700/50 p-2 rounded border border-gray-600"
                >
                  {getItemIcon(item)}
                  <span className="text-gray-200 text-sm">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No items collected yet</p>
            )}
          </div>
        </div>

        {/* Learned Concepts */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Scroll className="w-4 h-4" />
            SQL Concepts Mastered
          </h4>
          <div className="flex flex-wrap gap-2">
            {progress.learnedConcepts.length > 0 ? (
              progress.learnedConcepts.map((concept, index) => (
                <Badge 
                  key={index}
                  className={`${getConceptColor(concept)} text-white text-xs`}
                >
                  {concept}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">Begin your journey to learn SQL!</p>
            )}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">📊 Progress Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Doors Unlocked:</span>
              <span className="text-green-400">{progress.unlockedDoors.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monsters Defeated:</span>
              <span className="text-red-400">{progress.defeatedMonsters.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Achievements:</span>
              <span className="text-yellow-400">{progress.achievements.length}</span>
            </div>
          </div>
        </div>

        {/* Quest Tips */}
        <div className="bg-purple-800/20 p-4 rounded border border-purple-600">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">💡 Quest Tips</h4>
          <ul className="text-xs text-purple-200 space-y-1">
            <li>• Read questions carefully</li>
            <li>• Use hints when stuck</li>
            <li>• Practice makes perfect!</li>
            <li>• Each concept builds on the last</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerInventory;
