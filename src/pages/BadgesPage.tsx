import { useState } from "react";
import { Award, ExternalLink, Calendar, Trophy, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/layout/Sidebar";

const BadgesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Mock badges data
  const [badges] = useState([
    {
      id: 1,
      name: "React Expert",
      description: "Mastery of React development with advanced patterns and best practices",
      category: "Frontend",
      level: "Expert",
      image: "🚀",
      mintedDate: "2024-01-20",
      blockchain: "Polygon",
      tokenId: "0x1234...5678",
      skills: ["React", "JSX", "Hooks", "Context", "Performance"],
      projectCount: 3,
      rarity: "Rare",
      owned: true
    },
    {
      id: 2,
      name: "Full Stack Developer",
      description: "Complete mastery of both frontend and backend development",
      category: "Full Stack",
      level: "Professional",
      image: "⚡",
      mintedDate: "2024-01-15",
      blockchain: "Polygon",
      tokenId: "0x2345...6789",
      skills: ["React", "Node.js", "PostgreSQL", "API Design"],
      projectCount: 5,
      rarity: "Epic",
      owned: true
    },
    {
      id: 3,
      name: "TypeScript Master",
      description: "Advanced TypeScript usage with complex type systems",
      category: "Languages",
      level: "Advanced",
      image: "🔷",
      mintedDate: "2024-01-10",
      blockchain: "Polygon",
      tokenId: "0x3456...7890",
      skills: ["TypeScript", "Generics", "Type Guards", "Utility Types"],
      projectCount: 2,
      rarity: "Uncommon",
      owned: true
    },
    {
      id: 4,
      name: "Node.js Professional",
      description: "Expert-level Node.js development and API architecture",
      category: "Backend",
      level: "Professional",
      image: "🟢",
      mintedDate: "2024-01-05",
      blockchain: "Polygon",
      tokenId: "0x4567...8901",
      skills: ["Node.js", "Express", "API Design", "Middleware"],
      projectCount: 4,
      rarity: "Rare",
      owned: true
    },
    {
      id: 5,
      name: "Database Architect",
      description: "Advanced database design and optimization expertise",
      category: "Database",
      level: "Advanced",
      image: "🗄️",
      mintedDate: null,
      blockchain: "Polygon",
      tokenId: null,
      skills: ["PostgreSQL", "Database Design", "Query Optimization"],
      projectCount: 0,
      rarity: "Epic",
      owned: false
    },
    {
      id: 6,
      name: "UI/UX Designer",
      description: "Excellence in user interface and experience design",
      category: "Design",
      level: "Professional",
      image: "🎨",
      mintedDate: null,
      blockchain: "Polygon",
      tokenId: null,
      skills: ["Figma", "Design Systems", "User Research"],
      projectCount: 0,
      rarity: "Rare",
      owned: false
    }
  ]);

  const categories = ["all", "Frontend", "Backend", "Full Stack", "Languages", "Database", "Design"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "rarity", label: "Rarity" },
    { value: "level", label: "Level" }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-gray-400";
      case "Uncommon": return "text-green-400";
      case "Rare": return "text-blue-400";
      case "Epic": return "text-purple-400";
      case "Legendary": return "text-orange-400";
      default: return "text-gray-400";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-gray-500";
      case "Intermediate": return "bg-blue-500";
      case "Advanced": return "bg-purple-500";
      case "Professional": return "bg-green-500";
      case "Expert": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const filteredBadges = badges
    .filter(badge => {
      const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           badge.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || badge.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.mintedDate || "1970-01-01").getTime() - new Date(a.mintedDate || "1970-01-01").getTime();
        case "oldest":
          return new Date(a.mintedDate || "1970-01-01").getTime() - new Date(b.mintedDate || "1970-01-01").getTime();
        case "rarity":
          const rarityOrder = { "Common": 1, "Uncommon": 2, "Rare": 3, "Epic": 4, "Legendary": 5 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        case "level":
          const levelOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3, "Professional": 4, "Expert": 5 };
          return (levelOrder[b.level as keyof typeof levelOrder] || 0) - (levelOrder[a.level as keyof typeof levelOrder] || 0);
        default:
          return 0;
      }
    });

  const ownedBadges = filteredBadges.filter(badge => badge.owned);
  const availableBadges = filteredBadges.filter(badge => !badge.owned);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Skill Badges</h1>
          <p className="text-muted-foreground">
            Your collection of verified skill credentials minted as NFTs on the blockchain
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Badges</p>
                  <p className="text-2xl font-bold">{ownedBadges.length}</p>
                </div>
                <Award className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rare Badges</p>
                  <p className="text-2xl font-bold">
                    {ownedBadges.filter(b => b.rarity === "Rare" || b.rarity === "Epic").length}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Skills</p>
                  <p className="text-2xl font-bold">
                    {ownedBadges.reduce((acc, badge) => acc + badge.skills.length, 0)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold">{availableBadges.length}</p>
                </div>
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search badges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass border-glass-border"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="glass border-glass-border w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="glass border-glass-border w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* My Badges */}
        {ownedBadges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-primary" />
              My Badges ({ownedBadges.length})
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedBadges.map((badge) => (
                <Card key={badge.id} className="glass-card border-0 group hover:border-primary/30 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{badge.image}</div>
                      <Badge className={`${getRarityColor(badge.rarity)} border-current`} variant="outline">
                        {badge.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Level</span>
                        <Badge className={getLevelColor(badge.level)}>
                          {badge.level}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Category</span>
                        <span className="text-sm font-medium">{badge.category}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Projects</span>
                        <span className="text-sm font-medium">{badge.projectCount}</span>
                      </div>
                      
                      {badge.mintedDate && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Minted</span>
                          <span className="text-sm font-medium">
                            {new Date(badge.mintedDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {badge.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {badge.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{badge.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <a
  href={`https://polygonscan.com/token/${badge.tokenId}`} // Example: PolygonScan link
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="outline" size="sm" className="w-full">
    <ExternalLink className="w-4 h-4 mr-2" />
    View on Blockchain
  </Button>
</a>

                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Badges */}
        {availableBadges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-muted-foreground" />
              Available Badges ({availableBadges.length})
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableBadges.map((badge) => (
                <Card key={badge.id} className="glass-card border-0 opacity-75 hover:opacity-100 transition-opacity">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl grayscale">{badge.image}</div>
                      <Badge className={`${getRarityColor(badge.rarity)} border-current`} variant="outline">
                        {badge.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Level</span>
                        <Badge className={getLevelColor(badge.level)}>
                          {badge.level}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Category</span>
                        <span className="text-sm font-medium">{badge.category}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {badge.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {badge.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{badge.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Calendar className="w-4 h-4 mr-2" />
                        Not Yet Earned
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No badges found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BadgesPage;