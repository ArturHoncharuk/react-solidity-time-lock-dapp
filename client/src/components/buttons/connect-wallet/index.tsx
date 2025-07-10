import { error, logger, sleep } from "@/@utils";
import { Spinner } from "@/components/spinner";
import { contractService } from "@/lib/contract-service";
import { useAccountStore } from "@/store";
import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ConnectWalletButtonProps {
  cn?: string;
}

export const ConnectWalletButton = ({ cn }: ConnectWalletButtonProps) => {
  const { account, setAccount } = useAccountStore();
  const [loading, setLoading] = useState(false);

  const disconnect = useCallback(async () => {
    await contractService.revokePermissions();
    setAccount(null);
    logger("Disconnected from wallet");
  }, [setAccount]);

  const connectWallet = useCallback(async () => {
    setLoading(true);

    try {
      if (account) {
        return disconnect();
      }

      const requestedAccount = await contractService.requestAccount();

      if (requestedAccount) {
        setAccount(requestedAccount);
        logger(`Connected to ${requestedAccount}`);
      }
    } catch (err) {
      error("Error connecting to wallet", (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [account, disconnect, setAccount]);

  const label = account ? "Disconnect Wallet" : "Connect Wallet";

  return (
    <button
      className={twMerge(
        "flex items-center justify-center bg-rose-900 text-white px-4 h-10 rounded-md",
        cn
      )}
      onClick={connectWallet}
    >
      {loading ? <Spinner cn="w-4 h-4 fill-slate-700" /> : label}
    </button>
  );
};
