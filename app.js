let userScore = 0;
let computerScore = 0;

// АДРЕС КОНТРАКТА - ЗАМЕНИТЬ ПОСЛЕ ДЕПЛОЯ
const contractAddress = "0x23F57D3deD1Dd2ABEA5b85F91A487c16BAE21761";

// ABI КОНТРАКТА - СКОПИРОВАТЬ ИЗ REMIX ПОСЛЕ КОМПИЛЯЦИИ
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "playerMove",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "computerMove",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "result",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountWon",
				"type": "uint256"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BET_AMOUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fundContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameHistory",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "enum RockPaperScissors.Move",
				"name": "playerMove",
				"type": "uint8"
			},
			{
				"internalType": "enum RockPaperScissors.Move",
				"name": "computerMove",
				"type": "uint8"
			},
			{
				"internalType": "enum RockPaperScissors.Result",
				"name": "result",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountWon",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gameId",
				"type": "uint256"
			}
		],
		"name": "getGameDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "playerMove",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "computerMove",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "result",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountWon",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getPlayerGames",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getPlayerStats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalGames",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wins",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "draws",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "losses",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "getRecentGames",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player",
						"type": "address"
					},
					{
						"internalType": "enum RockPaperScissors.Move",
						"name": "playerMove",
						"type": "uint8"
					},
					{
						"internalType": "enum RockPaperScissors.Move",
						"name": "computerMove",
						"type": "uint8"
					},
					{
						"internalType": "enum RockPaperScissors.Result",
						"name": "result",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountWon",
						"type": "uint256"
					}
				],
				"internalType": "struct RockPaperScissors.GameRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalGames",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "playerMove",
				"type": "uint8"
			}
		],
		"name": "play",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "playerHistory",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "playerWins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

let provider, signer, contract;

// Элементы DOM
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

// Подключение кошелька
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("connectBtn").addEventListener("click", async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                contract = new ethers.Contract(contractAddress, contractABI, signer);
                console.log("Wallet connected:", await signer.getAddress());
                alert("Wallet connected!");
            } catch (error) {
                console.error("Connection error:", error);
                alert("Failed to connect wallet");
            }
        } else {
            alert("Please install MetaMask!");
        }
    });
});

// Вспомогательные функции
function convertToWord(letter) {
    if(letter === 'r') return "Rock";
    if(letter === 'p') return "Paper";
    return "Scissors";
}

function moveToNumber(move) {
    switch(move) {
        case 'r': return 1; // Rock
        case 'p': return 2; // Paper
        case 's': return 3; // Scissors
        default: throw new Error("Invalid move");
    }
}

// Основная функция игры
async function game(userChoice) {
    if(!contract) return alert("Connect wallet first!");
    
    document.getElementById("action-msg").innerText = "Processing transaction...";
    
    try {
        // Вызываем контракт
        const tx = await contract.play(
            moveToNumber(userChoice), 
            { 
                value: ethers.utils.parseEther("0.0001"),
                gasLimit: 300000 // Явно указываем лимит газа
            }
        );
        
        console.log("Transaction sent:", tx.hash);
        document.getElementById("action-msg").innerText = "Waiting for confirmation...";
        
        // Ждем подтверждения
        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt);
        
        // Ищем событие GamePlayed
        const event = receipt.events?.find(e => e.event === "GamePlayed");
        
        if (!event) {
            throw new Error("Game event not found in transaction");
        }
        
        // Получаем данные из события
        const playerMove = Number(event.args.playerMove);
        const computerMove = Number(event.args.computerMove);
        const result = Number(event.args.result); // 0=Draw, 1=Win, 2=Loss
        const amountWon = event.args.amountWon;
        
        console.log("Event data:", { playerMove, computerMove, result, amountWon: amountWon.toString() });
        
        // Преобразуем в читаемый формат
        const movesMap = {1: "Rock", 2: "Paper", 3: "Scissors"};
        const resultsMap = {0: "Draw", 1: "You Win!", 2: "Computer Wins!"};
        
        const playerMoveStr = movesMap[playerMove] || "Unknown";
        const computerMoveStr = movesMap[computerMove] || "Unknown";
        const resultStr = resultsMap[result] || `Unknown (${result})`;
        
        const wonAmount = ethers.utils.formatEther(amountWon);
        
        // Обновляем интерфейс
        document.getElementById("action-msg").innerText = `You: ${playerMoveStr}, Computer: ${computerMoveStr}, Result: ${resultStr}`;
        document.getElementById("result").innerHTML = `Won: <strong>${wonAmount} BNB</strong>`;
        
        // Обновляем счет
        if(result === 1) {
            userScore++;
            userScore_span.innerText = userScore;
        } else if(result === 2) {
            computerScore++;
            computerScore_span.innerText = computerScore;
        }
        
        // Автоматически обновляем историю
        setTimeout(showGameHistory, 1000);
        setTimeout(showRecentGames, 1000);
        
    } catch (err) {
        console.error("Game error:", err);
        document.getElementById("action-msg").innerText = `Error: ${err.message.substring(0, 50)}...`;
        document.getElementById("result").innerText = "Transaction failed";
    }
}

// Функция для отображения истории игр
async function showGameHistory() {
    if(!contract) return alert("Connect wallet first!");
    
    try {
        const address = await signer.getAddress();
        const gameIds = await contract.getPlayerGames(address);
        
        let html = "<h3>Your Game History:</h3>";
        
        for (let i = 0; i < Math.min(gameIds.length, 5); i++) {
            const gameId = gameIds[i];
            const game = await contract.getGameDetails(gameId);
            
            const movesMap = {1: "Rock", 2: "Paper", 3: "Scissors"};
            const resultsMap = {0: "Draw", 1: "Win", 2: "Loss"};
            
            const date = new Date(Number(game.timestamp) * 1000);
            const timeString = date.toLocaleTimeString();
            
            html += `
                <div class="game-record" style="margin: 5px 0; padding: 8px; background: #f0f0f0; border-radius: 4px;">
                    Game #${gameId}: ${movesMap[game.playerMove] || game.playerMove} vs ${movesMap[game.computerMove] || game.computerMove}
                    - <strong>${resultsMap[game.result] || game.result}</strong>
                    <br><small>${timeString} | Won: ${ethers.utils.formatEther(game.amountWon)} BNB</small>
                </div>
            `;
        }
        
        let historyDiv = document.getElementById("gameHistory");
        if (!historyDiv) {
            historyDiv = document.createElement("div");
            historyDiv.id = "gameHistory";
            historyDiv.style.cssText = "margin-top: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 8px;";
            document.body.appendChild(historyDiv);
        }
        
        historyDiv.innerHTML = html;
        
    } catch (error) {
        console.error("Error loading history:", error);
    }
}

// Функция для отображения последних игр
async function showRecentGames() {
    if(!contract) return alert("Connect wallet first!");
    
    try {
        const recentGames = await contract.getRecentGames(3);
        
        let html = "<h3>Recent Games:</h3>";
        
        for (let i = 0; i < recentGames.length; i++) {
            const game = recentGames[i];
            
            const movesMap = {1: "Rock", 2: "Paper", 3: "Scissors"};
            const resultsMap = {0: "Draw", 1: "Win", 2: "Loss"};
            
            const playerShort = game.player.substring(0, 6) + "..." + game.player.substring(38);
            
            html += `
                <div class="recent-game" style="margin: 5px 0; padding: 8px; background: #e0e0e0; border-radius: 4px;">
                    ${playerShort}: ${movesMap[game.playerMove] || game.playerMove} vs ${movesMap[game.computerMove] || game.computerMove}
                    - <strong>${resultsMap[game.result] || game.result}</strong>
                </div>
            `;
        }
        
        let recentDiv = document.getElementById("recentGames");
        if (!recentDiv) {
            recentDiv = document.createElement("div");
            recentDiv.id = "recentGames";
            recentDiv.style.cssText = "margin-top: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 8px;";
            document.body.appendChild(recentDiv);
        }
        
        recentDiv.innerHTML = html;
        
    } catch (error) {
        console.error("Error loading recent games:", error);
    }
}

//Styling
function showLoading(message = "Processing Transaction", submessage = "Waiting for blockchain confirmation...") {
    document.getElementById('loadingText').textContent = message;
    document.getElementById('loadingSubtext').textContent = submessage;
    document.getElementById('loadingModal').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingModal').style.display = 'none';
}

function updateWalletInfo(address, balance) {
    const walletInfo = document.getElementById('walletInfo');
    const walletAddress = document.getElementById('walletAddress');
    const walletBalance = document.getElementById('walletBalance');
    
    walletInfo.style.display = 'flex';
    walletAddress.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    walletBalance.textContent = `${parseFloat(balance).toFixed(4)} BNB`;
}

async function updateContractStats() {
    if (!contract) return;
    
    try {
        // Update contract balance
        const contractBalance = await contract.getContractBalance();
        document.getElementById('contractBalance').textContent = 
            `${ethers.utils.formatEther(contractBalance).slice(0, 6)} BNB`;
        
        // Update total games
        const totalGames = await contract.getTotalGames();
        document.getElementById('totalGames').textContent = totalGames.toString();
        
        // Update player stats if connected
        const address = await signer?.getAddress();
        if (address) {
            const stats = await contract.getPlayerStats(address);
            document.getElementById('playerWins').textContent = stats[1].toString();
            updatePlayerStats(stats);
        }
    } catch (error) {
        console.error("Error updating stats:", error);
    }
}

function updatePlayerStats(stats) {
    const [total, wins, draws, losses] = stats;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
    
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statWins').textContent = wins;
    document.getElementById('statDraws').textContent = draws;
    document.getElementById('statLosses').textContent = losses;
    document.getElementById('statWinRate').textContent = `${winRate}%`;
}

function showTab(tabName) {
    // Hide all tabs
    document.getElementById('personalTab').style.display = 'none';
    document.getElementById('recentTab').style.display = 'none';
    document.getElementById('statsTab').style.display = 'none';
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab and activate button
    document.getElementById(tabName + 'Tab').style.display = 'block';
    event.currentTarget.classList.add('active');
    
    // Refresh data for the selected tab
    if (tabName === 'personal') showGameHistory();
    else if (tabName === 'recent') showRecentGames();
    else if (tabName === 'stats') updatePlayerStatsFromContract();
}

async function updatePlayerStatsFromContract() {
    if (!contract || !signer) return;
    
    try {
        const address = await signer.getAddress();
        const stats = await contract.getPlayerStats(address);
        updatePlayerStats(stats);
    } catch (error) {
        console.error("Error updating player stats:", error);
    }
}

async function fundContract() {
    if (!contract) return alert("Connect wallet first!");
    
    try {
        const tx = await contract.fundContract({
            value: ethers.utils.parseEther("0.001")
        });
        showLoading("Funding Contract", "Adding 0.001 BNB to contract...");
        await tx.wait();
        hideLoading();
        alert("Contract funded successfully!");
        updateContractStats();
    } catch (error) {
        hideLoading();
        console.error("Funding error:", error);
        alert("Failed to fund contract");
    }
}

async function refreshAll() {
    if (!contract) return;
    
    showLoading("Refreshing Data", "Loading latest game data...");
    await Promise.all([
        updateContractStats(),
        showGameHistory(),
        showRecentGames(),
        updatePlayerStatsFromContract()
    ]);
    hideLoading();
}

// Update wallet connection handler
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("connectBtn").addEventListener("click", async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                contract = new ethers.Contract(contractAddress, contractABI, signer);
                
                const address = await signer.getAddress();
                const balance = await provider.getBalance(address);
                
                updateWalletInfo(address, ethers.utils.formatEther(balance));
                document.getElementById("connectBtn").innerHTML = '<i class="fas fa-check"></i> Connected';
                document.getElementById("connectBtn").style.background = "linear-gradient(90deg, #00b09b, #96c93d)";
                
                await updateContractStats();
                await showGameHistory();
                
                // Update contract address display
                document.getElementById('contractAddressShort').textContent = 
                    `${contractAddress.substring(0, 6)}...${contractAddress.substring(contractAddress.length - 4)}`;
                
            } catch (error) {
                console.error("Connection error:", error);
                alert("Failed to connect wallet");
            }
        } else {
            alert("Please install MetaMask!");
        }
    });
});

// Update game function to use loading modal
async function game(userChoice) {
    if(!contract) return alert("Connect wallet first!");
    
    const choiceCard = document.getElementById(userChoice);
    choiceCard.classList.add('pulse');
    
    showLoading("Playing Game", "Confirming your move on the blockchain...");
    
    try {
        const tx = await contract.play(
            moveToNumber(userChoice), 
            { 
                value: ethers.utils.parseEther("0.0001"),
                gasLimit: 300000
            }
        );
        
        document.getElementById('txHash').textContent = `TX: ${tx.hash.substring(0, 20)}...`;
        
        const receipt = await tx.wait();
        
        const event = receipt.events?.find(e => e.event === "GamePlayed");
        
        if (!event) {
            throw new Error("Game event not found");
        }
        
        const playerMove = Number(event.args.playerMove);
        const computerMove = Number(event.args.computerMove);
        const result = Number(event.args.result);
        const amountWon = event.args.amountWon;
        
        // Update UI with results
        const movesMap = {1: "Rock", 2: "Paper", 3: "Scissors"};
        const resultsMap = {0: "It's a Draw!", 1: "You Win! 🎉", 2: "Computer Wins! 💻"};
        const resultColors = {0: "#ffd700", 1: "#00ff9d", 2: "#ff4757"};
        
        const resultStr = resultsMap[result];
        const wonAmount = ethers.utils.formatEther(amountWon);
        
        document.getElementById("action-msg").innerHTML = 
            `<span style="color: ${resultColors[result]}">${resultStr}</span>`;
        document.getElementById("result").innerHTML = 
            `You played <strong>${movesMap[playerMove]}</strong> vs Computer's <strong>${movesMap[computerMove]}</strong><br>
             <span style="color: #00ff9d">Won: ${wonAmount} BNB</span>`;
        
        // Update scores with animation
        if(result === 1) {
            userScore++;
            userScore_span.innerText = userScore;
            userScore_span.parentElement.classList.add('win-animation');
            setTimeout(() => userScore_span.parentElement.classList.remove('win-animation'), 500);
        } else if(result === 2) {
            computerScore++;
            computerScore_span.innerText = computerScore;
            computerScore_span.parentElement.classList.add('lose-animation');
            setTimeout(() => computerScore_span.parentElement.classList.remove('lose-animation'), 500);
        }
        
        hideLoading();
        
        // Refresh all data
        setTimeout(async () => {
            await refreshAll();
            choiceCard.classList.remove('pulse');
        }, 1000);
        
    } catch (err) {
        hideLoading();
        choiceCard.classList.remove('pulse');
        console.error("Game error:", err);
        
        if (err.message.includes("user rejected")) {
            document.getElementById("action-msg").innerText = "Transaction cancelled";
        } else {
            document.getElementById("action-msg").innerText = `Error: ${err.message.substring(0, 50)}...`;
        }
    }
}

// Подключаем обработчики кликов
function main() {
    rock_div.addEventListener('click', () => game('r'));
    paper_div.addEventListener('click', () => game('p'));
    scissors_div.addEventListener('click', () => game('s'));
}

main();