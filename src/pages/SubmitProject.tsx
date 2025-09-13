import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, Upload, Loader2, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/Sidebar";

const SubmitProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    repoUrl: "",
    description: "",
    technologies: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Project Submitted Successfully!",
        description: "AI analysis is now processing your repository. You'll receive results shortly.",
      });
      
      // Navigate to project details (simulated)
      navigate(`/project/new-${Date.now()}`);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValidGitHubUrl = (url: string) => {
    const githubPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;
    return githubPattern.test(url);
  };

  const isFormValid = formData.title && formData.repoUrl && formData.description && isValidGitHubUrl(formData.repoUrl);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit New Project</h1>
          <p className="text-muted-foreground">
            Share your GitHub repository to get AI-powered skill analysis and peer reviews
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Main Form Card */}
          <Card className="glass-card border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-primary" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., E-commerce Platform, Task Manager App"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="glass border-glass-border"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-2">
                  <Label htmlFor="repoUrl">GitHub Repository URL *</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="repoUrl"
                      placeholder="https://github.com/username/repository"
                      value={formData.repoUrl}
                      onChange={(e) => handleInputChange("repoUrl", e.target.value)}
                      className="glass border-glass-border pl-10"
                    />
                  </div>
                  {formData.repoUrl && !isValidGitHubUrl(formData.repoUrl) && (
                    <p className="text-sm text-destructive">Please enter a valid GitHub repository URL</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your project does, its key features, and technologies used..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="glass border-glass-border min-h-[120px]"
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Label htmlFor="technologies">Key Technologies (Optional)</Label>
                  <Input
                    id="technologies"
                    placeholder="e.g., React, TypeScript, Node.js, PostgreSQL"
                    value={formData.technologies}
                    onChange={(e) => handleInputChange("technologies", e.target.value)}
                    className="glass border-glass-border"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="btn-neon flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Project
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card className="glass-card border-0 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-background animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI Analysis in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is analyzing your repository structure, code quality, and identifying skills...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Alert className="glass border-glass-border">
              <Code2 className="w-4 h-4" />
              <AlertDescription>
                <strong>AI Analysis:</strong> We'll examine your code structure, patterns, and technologies 
                to generate a comprehensive skill summary.
              </AlertDescription>
            </Alert>

            <Alert className="glass border-glass-border">
              <ExternalLink className="w-4 h-4" />
              <AlertDescription>
                <strong>Public Repos Only:</strong> Make sure your repository is public so our AI can 
                access and analyze your code.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitProject;