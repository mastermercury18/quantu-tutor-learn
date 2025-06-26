
-- Create a table to store generated questions
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  answer DECIMAL NOT NULL,
  explanation TEXT,
  topic TEXT NOT NULL,
  difficulty DECIMAL NOT NULL,
  question_type TEXT DEFAULT 'numeric',
  quantum_state JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store user question attempts
CREATE TABLE public.question_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES public.questions(id) NOT NULL,
  user_answer DECIMAL,
  is_correct BOOLEAN NOT NULL,
  time_taken INTEGER NOT NULL, -- in milliseconds
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (we'll make these tables public for now since there's no auth)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since no authentication is implemented)
CREATE POLICY "Allow public access to questions" 
  ON public.questions 
  FOR ALL 
  USING (true);

CREATE POLICY "Allow public access to question attempts" 
  ON public.question_attempts 
  FOR ALL 
  USING (true);
