// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract RockPaperScissors {
    uint256 public constant BET_AMOUNT = 0.0001 ether; // 0.0001 BNB
    
    enum Move { None, Rock, Paper, Scissors }
    enum Result { Draw, PlayerWins, ComputerWins }
    
    struct GameRecord {
        address player;
        Move playerMove;
        Move computerMove;
        Result result;
        uint256 timestamp;
        uint256 amountWon;
    }
    
    GameRecord[] public gameHistory;
    mapping(address => uint256[]) public playerHistory;
    mapping(address => uint256) public playerWins;
    
    // СОБЫТИЕ ИЗМЕНЕНО: убрали indexed для не-address полей
    event GamePlayed(
        address indexed player,
        uint256 gameId,
        uint8 playerMove,    // Изменили с Move на uint8
        uint8 computerMove,  // Изменили с Move на uint8
        uint8 result,        // Изменили с Result на uint8
        uint256 amountWon
    );
    
    address public owner;
    uint256 private nonce;
    
    constructor() {
        owner = msg.sender;
    }
    
    function play(uint8 playerMove) external payable {
        require(msg.value == BET_AMOUNT, "Send exactly 0.0001 BNB");
        require(playerMove >= 1 && playerMove <= 3, "Invalid move (1-3)");
        
        // Ход компьютера: 1=Rock, 2=Paper, 3=Scissors
        uint8 computerMove = getComputerMove();
        
        // Определяем результат (0=Draw, 1=PlayerWins, 2=ComputerWins)
        uint8 result = determineWinner(playerMove, computerMove);
        
        uint256 gameId = gameHistory.length;
        uint256 payout = 0;
        
        // Логика выплат
        if (result == 1) { // PlayerWins
            payout = BET_AMOUNT * 2;
            (bool success, ) = payable(msg.sender).call{value: payout}("");
            require(success, "Transfer failed");
            playerWins[msg.sender]++;
        } else if (result == 0) { // Draw
            payout = BET_AMOUNT;
            (bool success, ) = payable(msg.sender).call{value: payout}("");
            require(success, "Transfer failed");
        }
        // При поражении (result == 2) payout остается 0
        
        GameRecord memory record = GameRecord({
            player: msg.sender,
            playerMove: Move(playerMove),
            computerMove: Move(computerMove),
            result: Result(result),
            timestamp: block.timestamp,
            amountWon: payout
        });
        
        gameHistory.push(record);
        playerHistory[msg.sender].push(gameId);
        nonce++;
        
        emit GamePlayed(msg.sender, gameId, playerMove, computerMove, result, payout);
    }
    
    function getComputerMove() private view returns (uint8) {
        // Генерация случайного числа 1-3
        uint256 rand = uint256(
            keccak256(abi.encodePacked(
                block.timestamp,
                block.prevrandao,
                msg.sender,
                nonce
            ))
        ) % 3;
        return uint8(rand + 1); // 1, 2 или 3
    }
    
    function determineWinner(uint8 player, uint8 computer) private pure returns (uint8) {
        if (player == computer) return 0; // Draw
        
        if (
            (player == 1 && computer == 3) || // Rock beats Scissors
            (player == 2 && computer == 1) || // Paper beats Rock
            (player == 3 && computer == 2)    // Scissors beats Paper
        ) {
            return 1; // PlayerWins
        }
        
        return 2; // ComputerWins
    }
    
    // === ФУНКЦИИ ДЛЯ ФРОНТЕНДА ===
    
    function getTotalGames() public view returns (uint256) {
        return gameHistory.length;
    }
    
    function getPlayerGames(address player) public view returns (uint256[] memory) {
        return playerHistory[player];
    }
    
    function getGameDetails(uint256 gameId) public view returns (
        address player,
        uint8 playerMove,
        uint8 computerMove,
        uint8 result,
        uint256 timestamp,
        uint256 amountWon
    ) {
        require(gameId < gameHistory.length, "Invalid game ID");
        GameRecord memory game = gameHistory[gameId];
        return (
            game.player,
            uint8(game.playerMove),
            uint8(game.computerMove),
            uint8(game.result),
            game.timestamp,
            game.amountWon
        );
    }
    
    function getRecentGames(uint256 count) public view returns (GameRecord[] memory) {
        if(count > gameHistory.length) {
            count = gameHistory.length;
        }
        
        GameRecord[] memory recent = new GameRecord[](count);
        for(uint256 i = 0; i < count; i++) {
            recent[i] = gameHistory[gameHistory.length - 1 - i];
        }
        return recent;
    }
    
    function getPlayerStats(address player) public view returns (
        uint256 totalGames,
        uint256 wins,
        uint256 draws,
        uint256 losses
    ) {
        uint256[] memory games = playerHistory[player];
        uint256 winCount = playerWins[player];
        uint256 drawCount = 0;
        
        for(uint256 i = 0; i < games.length; i++) {
            GameRecord memory game = gameHistory[games[i]];
            if(game.result == Result.Draw) drawCount++;
        }
        
        losses = games.length - winCount - drawCount;
        return (games.length, winCount, drawCount, losses);
    }
    
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function fundContract() public payable {
        require(msg.value > 0, "Must send BNB");
    }
    
    receive() external payable {}
}