import { Link } from "react-router-dom";
import { Github, Sparkles, Shield, Award, ArrowRight, Code2, Users, Zap, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TextTypeAnimation from "@/components/TextTypeAnimation";
import TrueFocusAnimation from "@/components/TrueFocusAnimation";
import TrueFocus from "@/components/TrueFocus";

const LandingPage = () => {
  const badges = [
    { name: "React Expert", color: "neon-green", level: "Advanced" },
    { name: "Full Stack Dev", color: "neon-purple", level: "Expert" },
    { name: "TypeScript Master", color: "neon-green", level: "Advanced" },
    { name: "Node.js Pro", color: "neon-purple", level: "Professional" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navigation */}
      <nav className="glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-background" />
            </div>
            <TrueFocus 
              sentence="Skill Chain"
              manualMode={false}
              blurAmount={3}
              borderColor="#00FFA3"
              glowColor="rgba(0, 255, 163, 0.6)"
              animationDuration={0.8}
              pauseBetweenAnimations={1.5}
              className="nav-size gradient-text"
            />
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors cursor-target">
              Login
            </Link>
            <Link to="/login" className="cursor-target">
              <Button className="btn-neon">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg relative py-20 lg:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <TextTypeAnimation 
              texts={["Prove Your Skills.", "On-Chain.", "Prove Your Skills.\nOn-Chain."]}
              className="block"
              speed={150}
              deleteSpeed={100}
              pauseTime={2000}
            />
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Transform your GitHub projects into verifiable skill credentials with AI-powered analysis, 
            peer reviews, and blockchain-backed NFT badges.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/login" className="cursor-target">
              <Button size="lg" className="btn-neon text-lg px-8 py-4">
                <Github className="w-5 h-5 mr-2" />
                Connect GitHub
              </Button>
            </Link>
            <Link to="/login" className="cursor-target">
              <Button size="lg" className="btn-neon-purple text-lg px-8 py-4">
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your code into verified credentials
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Github className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Connect & Submit</h3>
              <p className="text-muted-foreground">
                Link your GitHub and submit your best projects. Our AI analyzes your code quality, 
                architecture, and technical skills.
              </p>
            </div>

            <div className="glass-card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                <Users className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Get Verified</h3>
              <p className="text-muted-foreground">
                Receive detailed AI-generated skill summaries and get peer reviews from other 
                developers in the community.
              </p>
            </div>

            <div className="glass-card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Award className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Mint Your Badge</h3>
              <p className="text-muted-foreground">
                Once verified, mint your skill as an NFT badge that proves your expertise 
                on the blockchain forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Badges */}
      <section className="py-20 bg-gradient-to-b from-transparent to-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Trending Skill Badges</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what skills top developers are earning and showcasing
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <Card key={index} className="glass-card border-0 group cursor-pointer badge-glow cursor-target">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-background" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                  <p className="text-muted-foreground mb-4">{badge.level}</p>
                  <div className="text-sm text-primary font-semibold">
                    {Math.floor(Math.random() * 50) + 10} earned this week
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/badges" className="cursor-target">
              <Button size="lg" className="btn-neon-purple">
                View All Badges
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Showcase Your Skills?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers building verifiable skill credentials
            </p>
            <Link to="/login" className="cursor-target">
              <Button size="lg" className="btn-neon text-lg px-8 py-4">
                <Github className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-background" />
            </div>
            <TrueFocus 
              sentence="Skill Chain"
              manualMode={false}
              blurAmount={3}
              borderColor="#00FFA3"
              glowColor="rgba(0, 255, 163, 0.6)"
              animationDuration={0.8}
              pauseBetweenAnimations={1.5}
              className="nav-size gradient-text"
            />
          </div>
          <p className="text-muted-foreground">
            Prove your skills. Build your reputation. Own your credentials.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;