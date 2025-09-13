import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Code2, ArrowRight, Sparkles, Shield, Award, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const { wallet, connectWallet } = useWallet();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    setIsGithubLoading(true);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store GitHub connection status
      localStorage.setItem('github_connected', 'true');
      
      toast({
        title: "GitHub Connected!",
        description: "Successfully connected your GitHub account.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect GitHub account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected!",
        description: "Successfully connected your Web3 wallet.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 cursor-target">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold gradient-text">SkillChain</span>
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors cursor-target">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                Welcome to <span className="gradient-text">SkillChain</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect your GitHub and Web3 wallet to start proving your skills
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-center">Connect Your Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* GitHub Connection */}
                  <Button 
                    onClick={handleGitHubLogin}
                    disabled={isGithubLoading}
                    className="w-full btn-neon text-lg py-6 cursor-target"
                  >
                    {isGithubLoading ? (
                      <>
                        <div className="w-5 h-5 mr-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Github className="w-5 h-5 mr-3" />
                        Connect with GitHub
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-glass-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">And</span>
                    </div>
                  </div>

                  {/* Wallet Connection */}
                  <Button 
                    onClick={handleWalletConnect}
                    disabled={wallet.isConnecting}
                    className="w-full btn-neon-purple text-lg py-6 cursor-target"
                  >
                    {wallet.isConnecting ? (
                      <>
                        <div className="w-5 h-5 mr-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </>
                    ) : wallet.isConnected ? (
                      <>
                        <Wallet className="w-5 h-5 mr-3" />
                        Wallet Connected ✓
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5 mr-3" />
                        Connect Web3 Wallet
                      </>
                    )}
                  </Button>

                  {wallet.isConnected && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 rounded-lg bg-secondary/10 border border-secondary/20"
                    >
                      <p className="text-sm text-secondary font-medium">
                        Connected: {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                      </p>
                    </motion.div>
                  )}

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    By connecting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4 pt-4 border-t border-glass-border">
                  <h3 className="font-semibold text-center mb-4">What you will get:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">AI Skill Analysis</p>
                        <p className="text-sm text-muted-foreground">Get detailed insights into your coding skills</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Peer Reviews</p>
                        <p className="text-sm text-muted-foreground">Get feedback from other developers</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">NFT Skill Badges</p>
                        <p className="text-sm text-muted-foreground">Mint verified credentials on blockchain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have a GitHub account?{" "}
                <a 
                  href="https://github.com/join" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Create one here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Animated Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-background to-muted/20">
          <motion.div 
            className="max-w-lg text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mb-8">
              {/* Animated Code to Badge Flow */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {/* Code Block */}
                <motion.div 
                  className="glass-card p-6 text-left font-mono text-sm cursor-target"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-muted-foreground ml-2">your-project.tsx</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-secondary">const</div>
                    <div className="text-primary">MyAwesomeProject</div>
                    <div className="text-muted-foreground">= () =&gt; &#123;</div>
                    <div className="ml-4 text-foreground">return skillBadge;</div>
                    <div className="text-muted-foreground">&#125;</div>
                  </div>
                </motion.div>

                {/* Arrow */}
                <motion.div 
                  className="flex justify-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-background" />
                  </div>
                </motion.div>

                {/* NFT Badge */}
                <motion.div 
                  className="glass-card p-6 text-center badge-glow cursor-target"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Award className="w-10 h-10 text-background" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">React Expert</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Verified on-chain skill credential
                  </p>
                  <div className="text-xs text-primary font-semibold">
                    NFT #1337
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Transform Your Code Into
                <br />
                <span className="gradient-text">Verifiable Credentials</span>
              </h2>
              <p className="text-muted-foreground">
                Our AI analyzes your GitHub projects and creates skill summaries that 
                get verified by peers and minted as blockchain NFTs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;