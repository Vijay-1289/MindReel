
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Plus, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FlashcardDeck } from '@/types/flashcard';
import { mockDecks } from '@/data/mockData';

const DashboardPage: React.FC = () => {
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from a database
    const timer = setTimeout(() => {
      setDecks(mockDecks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredDecks = decks.filter(deck => 
    deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteDeck = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDecks(decks.filter(deck => deck.id !== id));
    toast.success('Deck deleted successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Flashcard Decks</h1>
          <p className="text-muted-foreground">Manage and study your flashcard collections</p>
        </div>
        <Link to="/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Deck
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search decks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="h-7 bg-secondary animate-pulse rounded-md w-3/4" />
                <div className="h-4 bg-secondary animate-pulse rounded-md w-full" />
                <div className="h-4 bg-secondary animate-pulse rounded-md w-2/3" />
              </div>
              <CardFooter className="flex justify-between p-6 pt-0">
                <div className="h-9 bg-secondary animate-pulse rounded-md w-28" />
                <div className="h-9 bg-secondary animate-pulse rounded-md w-9" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredDecks.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {filteredDecks.map((deck, index) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle>{deck.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-0 flex-grow">
                  <p className="text-muted-foreground text-sm">{deck.description}</p>
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <span>{deck.cards.length} cards</span>
                    <span className="mx-2">•</span>
                    <span>Created {new Date(deck.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <Link to={`/study/${deck.id}`}>
                    <Button variant="outline" size="sm">
                      Study
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleDeleteDeck(deck.id, e)}
                    className="text-muted-foreground hover:text-destructive hover:border-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">No flashcard decks found</h2>
          <p className="mt-2 text-center text-muted-foreground">
            {searchQuery ? 'Try a different search term or ' : 'Get started by '}
            creating your first flashcard deck.
          </p>
          <Link to="/create" className="mt-6">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Deck
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
