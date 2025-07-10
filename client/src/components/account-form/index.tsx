import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { useAccountBalance, useSmartContractActions } from "@/hooks";
import { useAccountStore } from "@/store";

const resetInputDefaultBehaviourStyle =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const animationStyle = "transition-all duration-300";

export const AccountForm = () => {
  const { account } = useAccountStore();
  const { balance } = useAccountBalance();
  const { deposit, withdraw, depositLoading, withdrawLoading } =
    useSmartContractActions();

  const [depositValue, setDepositValue] = useState<string>("");

  const onChangeDepositValue = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setDepositValue(value);
    },
    []
  );

  const handleDepositFunds = useCallback(async () => {
    try {
      if (!depositValue) {
        toast.error("Please enter a deposit value");
        return;
      }

      await deposit(depositValue);
      toast.success("Funds deposited successfully");
    } catch (error) {
      toast.error("Error depositing funds");
    }
  }, [deposit, depositValue]);

  const depositDisabled = useMemo(() => {
    return !depositValue || !account || depositLoading || withdrawLoading;
  }, [depositValue, account, depositLoading, withdrawLoading]);

  const handleWithdrawFunds = useCallback(async () => {
    try {
      await withdraw();
      toast.success("Funds withdrawn successfully");
    } catch (error) {
      toast.error("Error withdrawing funds");
    }
  }, [withdraw]);

  return (
    <div className="flex flex-col items-start justify-start gap-2 my-4">
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg text-zinc-100">Address:</p>
        <p className="text-lg text-white">{account}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="text-lg text-zinc-100">Balance:</p>
        <p className="text-lg text-white">{balance}</p>
      </div>

      <div className="flex flex-row items-center justify-start gap-2">
        <p className="text-lg text-zinc-100">Deposit:</p>
        <input
          type="number"
          className={twMerge(
            "text-lg text-white border-2 border-zinc-700 rounded-md px-1.5 outline-none focus:border-zinc-500",
            animationStyle,
            resetInputDefaultBehaviourStyle
          )}
          value={depositValue}
          onChange={onChangeDepositValue}
        />
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <button
          disabled={depositDisabled}
          onClick={handleDepositFunds}
          className={twMerge(
            "bg-blue-500 text-white px-10 py-2 mt-4 rounded-md cursor-pointer enabled:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
            animationStyle
          )}
        >
          Deposit
        </button>
        <button
          onClick={handleWithdrawFunds}
          disabled={depositDisabled || withdrawLoading}
          className={twMerge(
            "bg-blue-500 text-white px-10 py-2 mt-4 rounded-md cursor-pointer enabled:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
            animationStyle
          )}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};
