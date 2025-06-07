
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Level } from "./types";
import { Sword, Shield, Scroll } from "lucide-react";

interface QuizInterfaceProps {
  level: Level;
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  feedbackMessage: string;
  isCorrect: boolean;
  onNext: () => void;
  onRetry: () => void;
  disabled: boolean;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({
  level,
  onAnswer,
  showFeedback,
  feedbackMessage,
  isCorrect,
  onNext,
  onRetry,
  disabled
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback || disabled) return;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const handleContinue = () => {
    setSelectedAnswer("");
    if (isCorrect) {
      onNext();
    } else {
      onRetry();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sword className="w-6 h-6 text-purple-400" />
          <CardTitle className="text-2xl text-purple-300">{level.title}</CardTitle>
          <Shield className="w-6 h-6 text-purple-400" />
        </div>
        <p className="text-gray-300 italic">{level.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!showFeedback ? (
          <>
            {/* Question */}
            <div className="bg-gray-700/50 p-4 rounded-lg border border-purple-500/30">
              <div className="flex items-start gap-2 mb-2">
                <Scroll className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-white font-medium">{level.question}</p>
              </div>
            </div>
            
            {/* Answer Options */}
            <div className="grid gap-3">
              {level.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={disabled}
                  variant="outline"
                  className={`
                    p-4 h-auto text-left justify-start text-wrap whitespace-normal
                    bg-gray-700/30 border-gray-600 hover:bg-gray-600/50 hover:border-purple-400
                    transition-all duration-200
                    ${selectedAnswer === option ? 'border-purple-400 bg-purple-600/20' : ''}
                  `}
                >
                  <span className="text-purple-300 font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  <code className="text-green-300 font-mono text-sm flex-1">{option}</code>
                </Button>
              ))}
            </div>
          </>
        ) : (
          /* Feedback Display */
          <div className="space-y-4">
            <div className={`p-6 rounded-lg border-2 ${
              isCorrect 
                ? 'bg-green-800/20 border-green-500 text-green-200' 
                : 'bg-red-800/20 border-red-500 text-red-200'
            }`}>
              <h4 className="font-bold text-lg mb-2">
                {isCorrect ? '🎉 Excellent Work!' : '💀 Not Quite Right'}
              </h4>
              <p className="mb-4">{feedbackMessage}</p>
              
              {/* Explanation */}
              <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
                <h5 className="font-semibold text-purple-300 mb-2">📚 Explanation:</h5>
                <p className="text-gray-300 text-sm">{level.explanation}</p>
              </div>
              
              {/* Hint for wrong answers */}
              {!isCorrect && (
                <div className="mt-3 bg-yellow-800/20 p-3 rounded border border-yellow-600">
                  <h5 className="font-semibold text-yellow-300 mb-2">💡 Hint:</h5>
                  <p className="text-yellow-200 text-sm">{level.hint}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleContinue}
                className={`px-8 py-3 font-bold ${
                  isCorrect 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isCorrect ? '🚀 Continue Adventure' : '🔄 Try Again'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizInterface;
