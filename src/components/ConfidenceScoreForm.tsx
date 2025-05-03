
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserQuestionConfidence } from '@/types';

interface ConfidenceScoreFormProps {
  questionId: string;
}

const ConfidenceScoreForm: React.FC<ConfidenceScoreFormProps> = ({ questionId }) => {
  const [confidenceScore, setConfidenceScore] = useState<number>(3);
  const [savedScore, setSavedScore] = useState<UserQuestionConfidence | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserConfidenceScore();
    } else {
      setIsLoading(false);
    }
  }, [user, questionId]);

  const fetchUserConfidenceScore = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_question_confidence')
        .select('*')
        .eq('user_id', user?.id)
        .eq('question_id', questionId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching confidence score:", error);
      }

      if (data) {
        setSavedScore(data);
        setConfidenceScore(data.score);
      }
    } catch (error) {
      console.error("Error fetching confidence score:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfidenceScore = async () => {
    if (!user) {
      toast.error("You must be logged in to save your confidence score");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('user_question_confidence')
        .upsert({
          id: savedScore?.id || undefined,
          user_id: user.id,
          question_id: questionId,
          score: confidenceScore,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,question_id' });

      if (error) {
        throw error;
      }

      toast.success("Confidence score saved!");
      fetchUserConfidenceScore();
    } catch (error: any) {
      toast.error(error.message || "Failed to save confidence score");
      console.error("Error saving confidence score:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse flex space-x-4 mt-4">
        <div className="h-10 bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 card-container">
      <h4 className="font-medium mb-3">How confident are you with this question?</h4>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select 
            value={confidenceScore.toString()} 
            onValueChange={(value) => setConfidenceScore(parseInt(value))}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select confidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 - Not at all confident</SelectItem>
              <SelectItem value="2">2 - Slightly confident</SelectItem>
              <SelectItem value="3">3 - Somewhat confident</SelectItem>
              <SelectItem value="4">4 - Very confident</SelectItem>
              <SelectItem value="5">5 - Extremely confident</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={saveConfidenceScore} disabled={isSaving}>
          {isSaving ? "Saving..." : savedScore ? "Update Score" : "Save Score"}
        </Button>
      </div>
    </div>
  );
};

export default ConfidenceScoreForm;
