
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import Navbar from '../components/Navbar';
import ConfidenceScoreForm from '../components/ConfidenceScoreForm';
import AuthPrompt from '../components/AuthPrompt';
import { Button } from '@/components/ui/button';
import { Question, DifficultyLevel } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/utils/analytics';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';

const QuestionDetail: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Removed animation states since we're disabling the animation
  
  useEffect(() => {
    const getQuestionDetail = async () => {
      if (!questionId) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('questions')
          .select(`
            *,
            question_tags(
              tag_id,
              tags(name)
            ),
            categories(name)
          `)
          .eq('id', questionId)
          .single();
        
        if (error) throw error;

        if (data) {
          setQuestion({
            id: data.id,
            categoryId: data.category_id,
            title: data.question,
            date: formatDate(data.created_at),
            url: data.substack_link || 'https://determined.substack.com/',
            tags: data.question_tags.map((qt: any) => qt.tags.name),
            difficulty: (data.difficulty || 'medium') as DifficultyLevel,
          });
          
          // Track view event
          trackEvent('view', 'question', data.id);
        }
      } catch (error: any) {
        console.error("Failed to fetch question details:", error);
        toast.error("Failed to load question details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    getQuestionDetail();
  }, [questionId]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 hover:bg-green-400';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-400';
      case 'hard': return 'bg-red-500 hover:bg-red-400';
      default: return 'bg-gray-500 hover:bg-gray-400';
    }
  };

  const handleReadFullAnswer = () => {
    window.open(question?.url, '_blank');
    trackEvent('click', 'read_full_answer', questionId || '');
  };

  const handleGoBack = () => {
    // If we have a stored category ID, use that for navigation
    const lastCategoryId = sessionStorage.getItem('lastVisitedCategoryId');
    if (lastCategoryId) {
      navigate('/de-prep', { state: { selectedCategoryId: lastCategoryId } });
    } else {
      navigate(-1);
    }
  };

  // Use a simple card container with no animation classes
  const cardClasses = "card-container p-6 rounded-lg";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <button 
          onClick={handleGoBack}
          className="mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
        >
          ← Back
        </button>
        
        {!user && <AuthPrompt message="Sign up to access full question details, difficulty information, and track your confidence levels." />}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : question ? (
          <div>
            <div className={cardClasses}>
              {user && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {question.date}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(question.difficulty || 'medium')}`}>
                    {question.difficulty || 'medium'}
                  </Badge>
                </div>
              )}
              
              <h1 className="text-2xl md:text-3xl font-bold mb-6">{question.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {user && (
                <Button onClick={handleReadFullAnswer}>
                  Read Full Answer on Substack
                </Button>
              )}
            </div>
            
            {/* Confidence score component - only shown to authenticated users */}
            {user && <ConfidenceScoreForm questionId={question.id} />}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl">Question not found</h2>
          </div>
        )}
      </main>
      
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} DEtermined. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuestionDetail;
