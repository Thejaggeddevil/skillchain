// src/pages/ViewOnBlockchain.tsx
import React from "react";

const ViewOnBlockchain: React.FC = () => {
  return (
    <div className="hero-bg min-h-screen flex items-center justify-center px-6">
      <div className="glass-card max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold gradient-text">
          View on Blockchain
        </h1>

        <p className="text-muted-foreground text-lg">
          Verify your SkillChain credentials on-chain with full transparency and security.
        </p>

        <div className="glass p-6 rounded-xl text-left space-y-3">
          <h2 className="text-xl font-semibold text-primary">
            Transaction Details
          </h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Txn Hash:</span>
            0x1234...abcd5678
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Block:</span>
            #1849201
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Status:</span>
            ✅ Confirmed
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://etherscan.io/tx/0x1234abcd5678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon"
          >
            View on Etherscan
          </a>

          <button
            className="btn-neon-purple"
            onClick={() => navigator.clipboard.writeText("0x1234abcd5678")}
          >
            Copy Txn Hash
          </button>
        </div>

        <div className="mt-6 inline-block px-4 py-2 rounded-full border border-primary badge-glow">
          <span className="text-sm text-primary font-semibold">
            Blockchain Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewOnBlockchain;
