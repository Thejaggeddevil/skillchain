import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, X, Award, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/hooks/useWallet';

interface ReviewerVerificationProps {
  projectSkills: string[];
  onVerificationComplete: (canReview: boolean) => void;
}

interface UserBadge {
  id: string;
  skill: string;
  level: string;
  verified: boolean;
  tokenId: string;
}

const ReviewerVerification = ({ projectSkills, onVerificationComplete }: ReviewerVerificationProps) => {
  const { wallet } = useWallet();
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  // Mock user badges - in real app, fetch from blockchain/API
  const mockUserBadges: UserBadge[] = [
    { id: '1', skill: 'React', level: 'Expert', verified: true, tokenId: '1337' },
    { id: '2', skill: 'TypeScript', level: 'Advanced', verified: true, tokenId: '1338' },
    { id: '3', skill: 'Node.js', level: 'Professional', verified: true, tokenId: '1339' },
  ];

  useEffect(() => {
    if (wallet.isConnected) {
      checkReviewerEligibility();
    }
  }, [wallet.isConnected, projectSkills]);

  const checkReviewerEligibility = async () => {
    setIsChecking(true);
    
    // Simulate API call to check user's badges
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUserBadges(mockUserBadges);
    setIsChecking(false);
    setVerificationComplete(true);

    // Check if user has at least one related badge
    const hasRelatedBadge = mockUserBadges.some(badge => 
      projectSkills.some(skill => 
        skill.toLowerCase().includes(badge.skill.toLowerCase()) ||
        badge.skill.toLowerCase().includes(skill.toLowerCase())
      ) && badge.verified
    );

    onVerificationComplete(hasRelatedBadge);
  };

  const getRelatedBadges = () => {
    return userBadges.filter(badge => 
      projectSkills.some(skill => 
        skill.toLowerCase().includes(badge.skill.toLowerCase()) ||
        badge.skill.toLowerCase().includes(skill.toLowerCase())
      )
    );
  };

  const relatedBadges = getRelatedBadges();
  const canReview = relatedBadges.length > 0 && relatedBadges.some(b => b.verified);

  if (!wallet.isConnected) {
    return (
      <Card className="glass-card border border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5" />
            Wallet Not Connected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please connect your Web3 wallet to verify your reviewer eligibility.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isChecking) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 animate-pulse" />
            Checking Reviewer Eligibility...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Verifying your skill badges...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`glass-card border ${canReview ? 'border-primary/30' : 'border-destructive/20'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${canReview ? 'text-primary' : 'text-destructive'}`} />
            Reviewer Verification
            {canReview ? (
              <Check className="w-5 h-5 text-primary" />
            ) : (
              <X className="w-5 h-5 text-destructive" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Project Skills Required:</strong> {projectSkills.join(', ')}
            </p>
            
            {verificationComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <p className="text-sm font-medium">Your Related Badges:</p>
                
                {relatedBadges.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {relatedBadges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Badge 
                          variant={badge.verified ? "default" : "secondary"}
                          className="flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          {badge.skill} {badge.level}
                          {badge.verified && <Check className="w-3 h-3" />}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No related skill badges found in your wallet.
                  </p>
                )}

                <div className={`p-3 rounded-lg border ${
                  canReview 
                    ? 'bg-primary/10 border-primary/20 text-primary' 
                    : 'bg-destructive/10 border-destructive/20 text-destructive'
                }`}>
                  <p className="text-sm font-medium">
                    {canReview 
                      ? '✅ You are eligible to review this project!'
                      : '❌ You need at least one verified badge in a related skill to review this project.'
                    }
                  </p>
                </div>

                {!canReview && (
                  <p className="text-xs text-muted-foreground">
                    Earn badges by submitting your own projects and getting them verified by the community.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewerVerification;