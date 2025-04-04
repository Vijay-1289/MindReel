
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label-wrapper';
import { 
  Upload, 
  FileText as File, 
  Plus, 
  BookOpen, 
  Trash2, 
  Check, 
  Sparkles, 
  Mic
} from 'lucide-react';
import type { Flashcard as FlashcardType, FlashcardDeck } from '@/types/flashcard';
import { v4 as uuidv4 } from 'uuid';
import { mockGenerateFlashcards } from '@/lib/mock-ai';
import { mockDecks } from '@/data/mockData';
import Flashcard from '@/components/Flashcard';

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<FlashcardType[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `File "${file.name}" uploaded successfully`
      });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Recording complete",
        description: "Recording saved!"
      });
      setTimeout(() => {
        setContent(content + (content ? '\n\n' : '') + 
          "The cell membrane is a biological membrane that separates the interior of all cells from the outside environment. " +
          "It consists of a lipid bilayer with embedded proteins. " +
          "The cell membrane controls the movement of substances in and out of cells and organelles."
        );
      }, 1000);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      setTimeout(() => {
        clearInterval(timer);
        setIsRecording(false);
        toast({
          title: "Recording complete",
          description: "Recording saved!"
        });
        setContent(content + (content ? '\n\n' : '') + 
          "The cell membrane is a biological membrane that separates the interior of all cells from the outside environment. " +
          "It consists of a lipid bilayer with embedded proteins. " +
          "The cell membrane controls the movement of substances in and out of cells and organelles."
        );
      }, 10000);
    }
  };

  const handleGenerate = async () => {
    if (!deckTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Missing title",
        description: "Please enter a deck title"
      });
      return;
    }
    
    if (!content.trim() && !uploadedFile) {
      toast({
        variant: "destructive",
        title: "Missing content",
        description: "Please upload a file or enter content"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const cards = await mockGenerateFlashcards(content || uploadedFile?.name || 'Biology concepts');
      
      setGeneratedFlashcards(cards);
      toast({
        title: "Success",
        description: "Flashcards generated successfully!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate flashcards. Please try again."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDeck = () => {
    if (generatedFlashcards.length === 0) {
      toast({
        variant: "destructive",
        title: "No flashcards",
        description: "Please generate flashcards first"
      });
      return;
    }
    
    const newDeck: FlashcardDeck = {
      id: uuidv4(),
      title: deckTitle.trim(),
      description: deckDescription.trim() || 'AI-generated flashcard deck',
      cards: generatedFlashcards,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockDecks.unshift(newDeck);
    toast({
      title: "Deck saved",
      description: "Flashcard deck saved successfully!"
    });
    navigate('/dashboard');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Flashcards</h1>
        <p className="text-muted-foreground">Generate AI-powered flashcards from your study materials</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Deck Title</Label>
                <Input
                  id="title"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  placeholder="Biology 101: Cell Structure"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={deckDescription}
                  onChange={(e) => setDeckDescription(e.target.value)}
                  placeholder="Flashcards covering the key concepts of cell biology"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="text">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="text">Text Input</TabsTrigger>
              <TabsTrigger value="file">File Upload</TabsTrigger>
              <TabsTrigger value="voice">Voice Input</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <Label htmlFor="content">Paste your text content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Paste your study notes, article content, or any text you want to convert to flashcards..."
                      className="min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="file">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium">Drag and drop your file here</p>
                      <p className="text-xs text-muted-foreground">Supports PDF, DOCX, and TXT files</p>
                    </div>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                      <Button variant="outline" size="sm" className="mt-2">Select File</Button>
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 flex items-center space-x-2 rounded-lg border bg-secondary/20 p-3">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium truncate">{uploadedFile.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(uploadedFile.size / 1024)} KB)
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-6 w-6"
                        onClick={() => setUploadedFile(null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="voice">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <div 
                      className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 ${
                        isRecording ? 'border-destructive animate-pulse' : 'border-primary'
                      } transition-colors`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-20 w-20 rounded-full ${
                          isRecording ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
                        }`}
                        onClick={toggleRecording}
                      >
                        <Mic className="h-8 w-8" />
                      </Button>
                      {isRecording && (
                        <span className="absolute -bottom-8 text-sm font-medium text-destructive">
                          Recording: {recordingTime}s
                        </span>
                      )}
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      {isRecording
                        ? "Speak clearly about the topic you're studying..."
                        : "Tap the microphone to start recording your notes"}
                    </p>
                    {content && (
                      <div className="mt-4 w-full">
                        <Label htmlFor="transcription">Transcription</Label>
                        <Textarea
                          id="transcription"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="mt-2 min-h-[100px]"
                          placeholder="Your speech will appear here..."
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button 
            disabled={isGenerating || (!content && !uploadedFile)}
            onClick={handleGenerate}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Flashcards
              </>
            )}
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Flashcards</h2>
            {generatedFlashcards.length > 0 && (
              <Button onClick={handleSaveDeck} variant="outline">
                <Check className="mr-2 h-4 w-4" />
                Save Deck
              </Button>
            )}
          </div>

          {generatedFlashcards.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No flashcards yet</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Add your study material and click "Generate Flashcards" to create your deck
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {generatedFlashcards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="flashcard-container"
                >
                  <Flashcard card={card} index={index} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
