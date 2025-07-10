import { useCallback, useState } from "react";
import { contractService } from "@/lib/contract-service";

export function useSmartContractActions() {
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const deposit = useCallback(async (depositValue: string) => {
    try {
      setDepositLoading(true);
      await contractService.depositFund(depositValue);
    } finally {
      setDepositLoading(false);
    }
  }, []);

  const withdraw = useCallback(async () => {
    try {
      setWithdrawLoading(true);
      await contractService.withdrawFund();
    } finally {
      setWithdrawLoading(false);
    }
  }, []);

  return { deposit, withdraw, depositLoading, withdrawLoading };
}
