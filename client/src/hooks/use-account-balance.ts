import { useEffect, useState } from "react";
import { contractService } from "@/lib/contract-service";
import { useAccountStore } from "@/store";

export function useAccountBalance() {
  const { account } = useAccountStore();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      setBalance(await contractService.getContractBalanceInETH());
    };

    if (account) fetchBalance();
  }, [account]);

  return { balance };
}
