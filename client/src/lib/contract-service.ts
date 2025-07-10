import type { Signer } from "ethers";
import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { LOCK } from "./abi/LOCK";
import { CONTRACT_ADDRESS } from "@/constants/smart-contracts";
import { error, logger } from "@/@utils";

export class ContractService {
  private provider!: BrowserProvider;
  private signer!: Signer;
  private contract!: Contract;
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
      try {
        this.provider = new BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        this.contract = new Contract(CONTRACT_ADDRESS, LOCK, this.signer);
        this.initialized = true;
      } catch (err) {
        error("Error initializing contract service:", (err as Error).message);
      }
    } else {
      error("Please install MetaMask!");
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  public async requestAccount(): Promise<string | null> {
    try {
      await this.ensureInitialized();
      const accounts = await this.provider.send("eth_requestAccounts", []);
      return accounts[0];
    } catch (err) {
      error("Error requesting account:", (err as Error).message);
      return null;
    }
  }

  public async revokePermissions(): Promise<void> {
    try {
      // Reset the contract service state
      this.initialized = false;
      this.provider = null as any;
      this.signer = null as any;
      this.contract = null as any;

      // If using MetaMask, you might want to clear the cached connection
      if (window.ethereum?.removeAllListeners) {
        window.ethereum.removeAllListeners();
      }
    } catch (err) {
      error("Error disconnecting wallet:", (err as Error).message);
    }
  }

  public async getContractBalanceInETH(): Promise<string> {
    await this.ensureInitialized();
    const balanceWei = await this.provider.getBalance(CONTRACT_ADDRESS);
    return formatEther(balanceWei);
  }

  public async depositFund(depositValue: string): Promise<void> {
    await this.ensureInitialized();
    const ethValue = parseEther(depositValue);
    const deposit = await this.contract.deposit({ value: ethValue });
    await deposit.wait();
  }

  public async withdrawFund(): Promise<void> {
    await this.ensureInitialized();
    const withdrawTx = await this.contract.withdraw();
    await withdrawTx.wait();
    logger("Withdrawal successful!");
  }
}

// Export a singleton instance
export const contractService = new ContractService();
