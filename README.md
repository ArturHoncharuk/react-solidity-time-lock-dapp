# React Solidity Time Lock DApp 🔒

A decentralized application (DApp) that allows users to lock their ETH tokens for a specified time period. Built with React, Solidity, and Hardhat.

## 🌟 Features

- **Wallet Integration** 👛

  - Seamless MetaMask wallet connection
  - Account balance display
  - Secure wallet disconnection

- **Smart Contract Functionality** 📝

  - Deposit ETH with time lock (24-hour lock period)
  - Withdraw funds after lock period expires
  - Real-time balance updates
  - Secure transaction handling

- **Modern UI/UX** 🎨

  - Clean and responsive design
  - Toast notifications for transaction status
  - Loading states for better user feedback
  - Mobile-friendly interface

- **Development Features** 🛠
  - Automated PR labeling with conventional commits
  - Auto-assign PR workflow
  - Comprehensive testing suite
  - TypeScript support
  - Hardhat development environment

## 🔧 Tech Stack

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Ethers.js
- Zustand (State Management)
- React Toastify
- Vite

### Smart Contracts

- Solidity
- Hardhat
- Hardhat Ignition
- Ethers.js

### Development Tools

- GitHub Actions
- ESLint
- TypeScript
- Node.js

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MetaMask wallet extension
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-solidity-time-lock-dapp.git
cd react-solidity-time-lock-dapp
```

2. Install dependencies:

For the smart contracts:

```bash
cd contracts
npm install
```

For the frontend:

```bash
cd client
npm install
```

3. Set up your environment variables:
   Create a `.env` file in the contracts directory with:

```
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Development

1. Start the local Hardhat node:

```bash
cd contracts
npx hardhat node
```

2. Deploy the smart contracts:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

3. Start the frontend development server:

```bash
cd client
npm run dev
```

## 🧪 Testing

Run the smart contract tests:

```bash
cd contracts
npx hardhat test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Important Notes

- Make sure you have sufficient ETH in your wallet for transactions
- The time lock period is set to 24 hours by default
- Always keep your private keys secure
- Test thoroughly on a local network before deploying to mainnet

## 🔍 Smart Contract Details

The TimeLock contract includes the following main functions:

- `deposit()`: Lock ETH for 24 hours
- `withdraw()`: Withdraw locked ETH after the time lock period
- `getBalance()`: Check current locked balance
- `getLockTime()`: Check when funds can be withdrawn

## 🌐 Live Demo

[Add your live demo link here]
