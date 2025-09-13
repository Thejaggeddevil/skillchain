import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Award, Users, Code2, Plus, ExternalLink, Star, GitBranch, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import { useWallet } from "@/hooks/useWallet";

const Dashboard = () => {
  const { wallet } = useWallet();
  const [githubConnected, setGithubConnected] = useState(false);
  
  const [user] = useState({
    name: "Alex Johnson",
    username: "alexjohnson",
    avatar: "https://github.com/alexjohnson.png",
    bio: "Full-stack developer passionate about React and Node.js",
    location: "San Francisco, CA",
    followers: 245,
    following: 189,
    repositories: 42
  });

  useEffect(() => {
    // Check if GitHub is connected
    const githubStatus = localStorage.getItem('github_connected');
    setGithubConnected(githubStatus === 'true');
  }, []);

  const [stats] = useState({
    projectsSubmitted: 8,
    badgesEarned: 5,
    reviewsGiven: 12,
    reviewsReceived: 23
  });

  const [recentProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack React and Node.js e-commerce application",
      status: "Verified",
      reviews: 5,
      badges: ["React Expert", "Node.js Pro"],
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Real-time collaborative task management with TypeScript",
      status: "Pending Review",
      reviews: 2,
      badges: [],
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "ML Model API",
      description: "Python API for machine learning model deployment",
      status: "Under Review",
      reviews: 3,
      badges: [],
      lastUpdated: "3 days ago"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "bg-primary text-primary-foreground";
      case "Pending Review": return "bg-secondary text-secondary-foreground";
      case "Under Review": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your projects, badges, and community engagement</p>
        </div>

        {/* User Profile Card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <div className="flex items-center space-x-2">
                        <Github className={`w-5 h-5 ${githubConnected ? 'text-primary' : 'text-muted-foreground'}`} />
                        {githubConnected && <Badge variant="outline" className="text-xs">Connected</Badge>}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">@{user.username}</p>
                    <p className="text-foreground mb-3">{user.bio}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{user.location}</span>
                      <span>•</span>
                      <span>{user.followers} followers</span>
                      <span>•</span>
                      <span>{user.repositories} repositories</span>
                    </div>
                    
                    {/* Connection Status */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Github className={`w-4 h-4 ${githubConnected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-sm">
                          GitHub: {githubConnected ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Wallet className={`w-4 h-4 ${wallet.isConnected ? 'text-secondary' : 'text-muted-foreground'}`} />
                        <span className="text-sm">
                          Wallet: {wallet.isConnected ? `${wallet.address?.slice(0, 6)}...${wallet.address?.slice(-4)}` : 'Not Connected'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/submit" className="block">
                <Button className="w-full btn-neon justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit New Project
                </Button>
              </Link>
              <Link to="/badges" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View My Badges
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Review Projects
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projects Submitted</p>
                  <p className="text-3xl font-bold">{stats.projectsSubmitted}</p>
                </div>
                <Code2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                  <p className="text-3xl font-bold">{stats.badgesEarned}</p>
                </div>
                <Award className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reviews Given</p>
                  <p className="text-3xl font-bold">{stats.reviewsGiven}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reviews Received</p>
                  <p className="text-3xl font-bold">{stats.reviewsReceived}</p>
                </div>
                <Star className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                Recent Projects
              </CardTitle>
              <Link to="/submit">
                <Button className="btn-neon">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="glass border border-glass-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link to={`/project/${project.id}`} className="text-lg font-semibold hover:text-primary transition-colors">
                        {project.title}
                      </Link>
                      <p className="text-muted-foreground mt-1">{project.description}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{project.reviews} reviews</span>
                      <span>•</span>
                      <span>Updated {project.lastUpdated}</span>
                    </div>
                    
                    {project.badges.length > 0 && (
                      <div className="flex items-center space-x-2">
                        {project.badges.map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;