
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, BrainCircuit, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 pb-16 pt-24 md:pt-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center rounded-lg bg-secondary px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">AI-Powered Learning</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Transform your study material into <span className="text-primary">flashcards</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MindReel uses AI to extract key concepts from your PDFs, articles, and notes, 
                  generating perfect flashcards for effective studying.
                </p>
              </motion.div>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Link to="/create">
                    <Button size="lg" className="h-12 px-6">
                      Create Flashcards
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg" className="h-12 px-6">
                      View My Decks
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border bg-white shadow-xl md:aspect-[4/3]">
                <div className="flashcard-container w-full h-full p-6">
                  <motion.div 
                    animate={{ rotateY: [0, 180, 0] }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 4
                    }}
                    className="flashcard relative w-full h-full rounded-lg border border-border/40 shadow-lg"
                  >
                    <div className="flashcard-front absolute inset-0 rounded-lg bg-white p-8 flex flex-col justify-center items-center">
                      <div className="w-full space-y-4">
                        <div className="badge-primary w-fit">Question</div>
                        <h3 className="text-xl font-medium">What is the role of mitochondria in cells?</h3>
                      </div>
                    </div>
                    <div className="flashcard-back absolute inset-0 rounded-lg bg-primary/5 p-8 flex flex-col justify-center items-center">
                      <div className="w-full space-y-4">
                        <div className="badge-secondary w-fit">Answer</div>
                        <h3 className="text-xl font-medium">Mitochondria are the powerhouse of the cell responsible for generating most of the cell's supply of ATP through cellular respiration.</h3>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:gap-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center rounded-lg bg-secondary px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Powerful Features</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why choose MindReel?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Our AI-powered platform helps you study smarter, not harder.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Extraction</h3>
                <p className="text-muted-foreground">
                  Our AI identifies key concepts, definitions, and relationships from your documents automatically.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
                <p className="text-muted-foreground">
                  Study cards adjust to your learning progress, focusing more on areas where you need improvement.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Creation</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive flashcard decks in seconds from your PDFs, articles, or notes.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to enhance your learning?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start creating AI-generated flashcards today and boost your study efficiency.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link to="/create">
                <Button size="lg" className="h-12 px-6">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
