import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
  });

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error('No wallet found. Please install MetaMask.');
    }

    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      
      if (accounts.length > 0) {
        setWallet({
          address: accounts[0],
          isConnected: true,
          isConnecting: false,
          chainId: Number(network.chainId),
        });
        
        // Store in localStorage for persistence
        localStorage.setItem('wallet_address', accounts[0]);
      }
    } catch (error) {
      setWallet(prev => ({ ...prev, isConnecting: false }));
      throw error;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
    });
    localStorage.removeItem('wallet_address');
  }, []);

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          const network = await provider.getNetwork();
          
          if (accounts.length > 0) {
            setWallet({
              address: accounts[0].address,
              isConnected: true,
              isConnecting: false,
              chainId: Number(network.chainId),
            });
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWallet(prev => ({ ...prev, address: accounts[0] }));
          localStorage.setItem('wallet_address', accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setWallet(prev => ({ ...prev, chainId: parseInt(chainId, 16) }));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [disconnectWallet]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}