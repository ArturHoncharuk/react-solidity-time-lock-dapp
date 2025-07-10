import { ConnectWalletButton, ToastClient } from "@/components";
import { useAccountStore } from "@/store";

export default function App() {
  const { account } = useAccountStore();
  return (
    <div className="flex flex-col items-start justify-start p-4 md:p-12 h-screen bg-stone-800">
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-2xl font-bold text-white">React + Ethers v6.*</h1>

        <p className="text-lg text-white pt-4">{account}</p>

        <ConnectWalletButton cn="mt-2" />
      </div>

      <ToastClient />
    </div>
  );
}
