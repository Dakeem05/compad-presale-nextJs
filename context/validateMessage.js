// validateMessage.js

async function fetchSession() {
    try {
      // Check if the WalletConnect provider is available
      if (window.ethereum && window.ethereum.isWalletConnect) {
        // Get connected accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
        // Get current chainId
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  
        if (accounts.length === 0) {
          throw new Error('No connected accounts found');
        }
  
        return { address: accounts[0], chainId };
      } else {
        console.error('WalletConnect provider not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }
  
  async function getSessionInfo() {
    try {
      const session = await fetchSession();
      if (!session) throw new Error('Failed to get session!');
  
      const { address, chainId } = session;
  
      return { address, chainId };
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }

  
  export async function validateMessage({ message, signature }) {
    try {
      const { address: connectedAddress } = await getSessionInfo();
  
      const recoveredAddress = await recoverAddressFromMessage(message, signature);
        
      return recoveredAddress.toLowerCase() === connectedAddress.toLowerCase();
    } catch (error) {
      console.error('Error validating message:', error);
      return false;
    }
  }
  
  

  async function recoverAddressFromMessage(message, signature) {
    // Implement the logic to recover the address from the signed message
    // This will depend on the library or method you're using to sign the message
    // Here's a sample implementation using ethers.js
    const { ethers } = require('ethers');
    const signingKey = new ethers.utils.SigningKey(message);
    const recoveredAddress = signingKey.recoverAddress(signature);
    
    return recoveredAddress;
  }
  