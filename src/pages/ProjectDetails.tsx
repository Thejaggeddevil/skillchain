import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Github, Star, MessageSquare, Award, ExternalLink, Code2, Users, Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/Sidebar";
import ReviewerVerification from "@/components/ReviewerVerification";

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [canReview, setCanReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock project data
  const project = {
    id: id || "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.",
    repoUrl: "https://github.com/alexjohnson/ecommerce-platform",
    author: {
      name: "Alex Johnson",
      username: "alexjohnson",
      avatar: "https://github.com/alexjohnson.png"
    },
    submittedAt: "2024-01-15",
    status: "Verified",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Express", "JWT"],
    aiSummary: {
      overallScore: 92,
      skills: [
        { name: "React Development", level: "Advanced", confidence: 95 },
        { name: "TypeScript", level: "Intermediate", confidence: 88 },
        { name: "Backend Architecture", level: "Advanced", confidence: 91 },
        { name: "Database Design", level: "Intermediate", confidence: 85 },
        { name: "API Development", level: "Advanced", confidence: 93 }
      ],
      codeQuality: {
        structure: 90,
        documentation: 85,
        testing: 78,
        performance: 88
      },
      insights: [
        "Excellent component architecture with proper separation of concerns",
        "Strong implementation of authentication and security practices",
        "Well-structured database schema with proper relationships",
        "Could benefit from more comprehensive test coverage",
        "Performance optimizations implemented for large datasets"
      ]
    },
    reviews: [
      {
        id: 1,
        reviewer: {
          name: "Sarah Chen",
          username: "sarahchen",
          avatar: "https://github.com/sarahchen.png",
          badges: ["React Expert", "Senior Developer"]
        },
        rating: 5,
        content: "Excellent project! The code structure is clean and the React patterns are well implemented. The authentication system is particularly impressive.",
        submittedAt: "2024-01-18",
        helpful: 12
      },
      {
        id: 2,
        reviewer: {
          name: "Mike Rodriguez",
          username: "mikerodriguez",
          avatar: "https://github.com/mikerodriguez.png",
          badges: ["Full Stack Dev", "Node.js Pro"]
        },
        rating: 4,
        content: "Great backend implementation! The API design is RESTful and well-documented. Minor suggestion: could use more error handling in some endpoints.",
        submittedAt: "2024-01-17",
        helpful: 8
      },
      {
        id: 3,
        reviewer: {
          name: "Emma Wilson",
          username: "emmawilson",
          avatar: "https://github.com/emmawilson.png",
          badges: ["UI/UX Expert"]
        },
        rating: 5,
        content: "The user interface is intuitive and responsive. Great attention to detail in the shopping cart functionality and checkout process.",
        submittedAt: "2024-01-16",
        helpful: 15
      }
    ],
    eligibleBadges: ["React Expert", "Full Stack Developer", "E-commerce Specialist"]
  };

  const averageRating = project.reviews.reduce((acc, review) => acc + review.rating, 0) / project.reviews.length;
  const canMintBadge = project.reviews.length >= 3 && averageRating >= 4;

  const handleSubmitReview = () => {
    if (!newReview.trim() || rating === 0) {
      toast({
        title: "Invalid Review",
        description: "Please provide both a rating and review content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. It will help the developer improve their skills.",
    });
    
    setNewReview("");
    setRating(0);
  };

  const handleMintBadge = () => {
    toast({
      title: "Badge Minted Successfully!",
      description: "Your NFT skill badge has been minted to the blockchain.",
    });
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-muted-foreground">
                by {project.author.name} • Submitted {new Date(project.submittedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={project.status === "Verified" ? "bg-primary" : "bg-secondary"}>
                {project.status === "Verified" && <CheckCircle className="w-3 h-3 mr-1" />}
                {project.status}
              </Badge>
              <Button variant="outline" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Repository
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code2 className="w-5 h-5 mr-2" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {averageRating.toFixed(1)} average rating
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {project.reviews.length} reviews
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(project.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  AI Skill Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-primary">{project.aiSummary.overallScore}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                      style={{ width: `${project.aiSummary.overallScore}%` }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {project.aiSummary.skills.map((skill, index) => (
                    <div key={index} className="glass border border-glass-border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${skill.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.confidence}% confidence</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Insights</h4>
                  <ul className="space-y-2">
                    {project.aiSummary.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Peer Reviews ({project.reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.reviews.map((review) => (
                    <div key={review.id} className="glass border border-glass-border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                          <AvatarFallback>{review.reviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">{review.reviewer.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-3">
                            {review.reviewer.badges.map((badge, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          
                          <p className="text-foreground mb-3">{review.content}</p>
                          <p className="text-sm text-muted-foreground">{review.helpful} people found this helpful</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reviewer Verification */}
                <div className="mt-8 pt-6 border-t border-glass-border">
                  <ReviewerVerification 
                    projectSkills={project.technologies}
                    onVerificationComplete={setCanReview}
                  />
                  
                  {canReview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5 }}
                      className="mt-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">Add Your Review</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowReviewForm(!showReviewForm)}
                        >
                          {showReviewForm ? 'Cancel' : 'Write Review'}
                        </Button>
                      </div>
                      
                      {showReviewForm && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <Label>Rating</Label>
                            <div className="flex space-x-1 mt-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`w-6 h-6 cursor-pointer transition-colors ${
                                    i < rating ? 'text-primary fill-primary' : 'text-muted hover:text-primary'
                                  }`}
                                  onClick={() => setRating(i + 1)}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea
                              id="review"
                              placeholder="Share your thoughts on the code quality, architecture, and implementation..."
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                              className="glass border-glass-border mt-2"
                            />
                          </div>
                          
                          <Button onClick={handleSubmitReview} className="btn-neon">
                            Submit Review
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={project.author.avatar} alt={project.author.name} />
                    <AvatarFallback>{project.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{project.author.name}</h3>
                    <p className="text-sm text-muted-foreground">@{project.author.username}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Badge Eligibility */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Eligible Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.eligibleBadges.map((badge, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass border border-glass-border rounded-lg">
                      <span className="font-medium">{badge}</span>
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                  ))}
                </div>
                
                {canMintBadge ? (
                  <Button onClick={handleMintBadge} className="w-full mt-4 btn-neon">
                    <Award className="w-4 h-4 mr-2" />
                    Mint NFT Badge
                  </Button>
                ) : (
                  <Alert className="mt-4 glass border-glass-border">
                    <AlertDescription>
                      Need {3 - project.reviews.length} more reviews with average rating ≥4.0 to mint badges.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Code2 className="w-4 h-4 mr-2" />
                  Similar Projects
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;