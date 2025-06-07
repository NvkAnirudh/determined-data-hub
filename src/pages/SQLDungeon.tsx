
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DungeonMap from "@/components/SQLDungeon/DungeonMap";
import QuizInterface from "@/components/SQLDungeon/QuizInterface";
import PlayerInventory from "@/components/SQLDungeon/PlayerInventory";
import GameHUD from "@/components/SQLDungeon/GameHUD";
import { GameState, Level, PlayerProgress } from "@/components/SQLDungeon/types";
import { levels } from "@/components/SQLDungeon/gameData";
import { toast } from "sonner";

const SQLDungeon: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    lives: 3,
    isGameActive: true,
    showMap: true
  });

  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>({
    inventory: [],
    defeatedMonsters: [],
    unlockedDoors: [],
    learnedConcepts: [],
    achievements: []
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const currentLevel = levels[gameState.currentLevel];

  const handleAnswer = (selectedAnswer: string) => {
    const correct = selectedAnswer === currentLevel.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      // Correct answer logic
      setFeedbackMessage(currentLevel.successMessage);
      setGameState(prev => ({ 
        ...prev, 
        score: prev.score + 100,
        currentLevel: Math.min(prev.currentLevel + 1, levels.length - 1)
      }));
      
      // Add rewards to inventory
      setPlayerProgress(prev => ({
        ...prev,
        inventory: [...prev.inventory, currentLevel.reward],
        learnedConcepts: [...prev.learnedConcepts, currentLevel.concept],
        unlockedDoors: [...prev.unlockedDoors, `door_${gameState.currentLevel}`]
      }));
      
      toast.success("Excellent! You've progressed to the next level!");
    } else {
      // Wrong answer logic
      setFeedbackMessage(currentLevel.failureMessage);
      setGameState(prev => ({ 
        ...prev, 
        lives: prev.lives - 1 
      }));
      
      toast.error("Not quite right! Try again with the hint.");
    }
    
    setShowFeedback(true);
  };

  const nextLevel = () => {
    setShowFeedback(false);
    if (gameState.currentLevel >= levels.length - 1) {
      toast.success("🎉 Congratulations! You've completed SQL Dungeon Adventure!");
      setGameState(prev => ({ ...prev, isGameActive: false }));
    }
  };

  const retryLevel = () => {
    setShowFeedback(false);
    if (gameState.lives <= 0) {
      toast.error("Game Over! Restarting from the beginning...");
      setGameState({ currentLevel: 0, score: 0, lives: 3, isGameActive: true, showMap: true });
      setPlayerProgress({
        inventory: [],
        defeatedMonsters: [],
        unlockedDoors: [],
        learnedConcepts: [],
        achievements: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-foreground">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 h-[calc(100vh-80px)]">
        {/* Main Game Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Game HUD */}
          <GameHUD gameState={gameState} />
          
          {/* Dungeon Map */}
          <div className="flex-1 min-h-[300px]">
            <DungeonMap 
              currentLevel={gameState.currentLevel}
              playerProgress={playerProgress}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
            />
          </div>
          
          {/* Quiz Interface */}
          <div className="min-h-[250px]">
            <QuizInterface
              level={currentLevel}
              onAnswer={handleAnswer}
              showFeedback={showFeedback}
              feedbackMessage={feedbackMessage}
              isCorrect={isCorrect}
              onNext={nextLevel}
              onRetry={retryLevel}
              disabled={!gameState.isGameActive}
            />
          </div>
        </div>
        
        {/* Player Inventory Sidebar */}
        <div className="lg:w-80">
          <PlayerInventory progress={playerProgress} />
        </div>
      </div>
    </div>
  );
};

export default SQLDungeon;
