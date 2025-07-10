import { ConnectWalletButton, AccountForm, ToastClient } from "@/components";
import { useAccountStore } from "@/store";

export default function App() {
  const { account } = useAccountStore();

  return (
    <div className="flex flex-col items-start justify-start p-4 md:p-12 h-screen bg-zinc-800">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-2xl font-bold text-white">
          Deposit or Withdraw funds
        </h1>

        {account && <AccountForm />}
        <ConnectWalletButton cn="mt-2" />
      </div>

      <ToastClient />
    </div>
  );
}
