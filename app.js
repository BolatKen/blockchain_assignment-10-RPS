let userScore = 0;
let computerScore = 0;

const contractAddress = "0x007f3404F5A533cf64C939287DfcA5a8c4296170";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum RockPaperScissors.Move",
				"name": "playerMove",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum RockPaperScissors.Move",
				"name": "computerMove",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum RockPaperScissors.Result",
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
		"name": "GameResult",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "enum RockPaperScissors.Move",
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
		"stateMutability": "payable",
		"type": "receive"
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
	}
];
let provider, signer, contract;


// Исправлено: убрано дублирование document и лишние пробелы в селекторах
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
 
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("connectBtn").addEventListener("click", async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Wallet connected:", await signer.getAddress());
        alert("Wallet connected!");
    });
});



 
function convertToWord(letter) {
    if(letter === 'r') return "Rock";
    if(letter === 'p') return "Paper";
    return "Scissors";
}

function moveToNumber(move) {
    switch(move) {
        case 'r': return 1;
        case 'p': return 2;
        case 's': return 3;
        default: throw new Error("Invalid move in JS");
    }
}
 
function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore; // Исправлена опечатка spanspan
    computerScore_span.innerHTML = computerScore;  
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You win!`;
}
 
function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;  
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord}. You lost...`;
}
 
function draw(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. It's a draw.`;
}
 
// Исправлено: аргумент UserChoice заменен на userChoice (camelCase)
async function game(userChoice) {
    if(!contract) return alert("Connect wallet first!");
    document.getElementById("result").innerText = "Loading...";
    try {
        let tx = await contract.play(moveToNumber(userChoice), { value: ethers.utils.parseEther("0.0001") });
        let receipt = await tx.wait(); // ждём майнинга
        // Получаем событие GameResult из receipt
        const event = receipt.events.find(e => e.event === "GameResult");
        const playerMove = event.args[1];
        const computerMove = event.args[2];

        // Делаем playerMove и computerMove читаемыми
        const movesMap = {0: "None", 1: "Rock", 2: "Paper", 3: "Scissors"};
        const playerMoveStr = movesMap[playerMove];
        const computerMoveStr = movesMap[computerMove];

        const result = event.args[3];
        // result: 0 - Draw, 1 - PlayerWins, 2 - ComputerWins
        let resultStr = "";
        if(result == 0) resultStr = "Draw";
        else if(result == 1) resultStr = "You Win!";
        else if(result == 2) resultStr = "Computer Wins!";
        const amountWon = ethers.utils.formatEther(event.args[4]);
        document.getElementById("result").innerText =
            `You: ${playerMoveStr }, Computer: ${computerMoveStr}, Result: ${resultStr}, Won: ${amountWon} tBNB`;
        if(result == 1){ // PlayerWins
            userScore++;
            userScore_span.innerText = userScore;
        } else if(result == 2){ // ComputerWins
            computerScore++;
            computerScore_span.innerText = computerScore;
        }
    } catch (err) {
        console.error(err);
    }
}

 
function main() {
    rock_div.addEventListener('click', function() {
        game('r');
    });
 
    paper_div.addEventListener('click', function() {
        game('p');
    });
 
    scissors_div.addEventListener('click', function() {
        game('s');
    });
}
 
main();
