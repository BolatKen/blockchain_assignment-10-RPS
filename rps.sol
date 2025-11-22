// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract RockPaperScissors {

    uint256 public constant BET_AMOUNT = 0.0001 ether;

    enum Move { None, Rock, Paper, Scissors }
    enum Result { Draw, PlayerWins, ComputerWins }

    event GameResult(address player, Move playerMove, Move computerMove, Result result, uint256 amountWon);

    // Игрок делает ход и отправляет ставку
    function play(Move playerMove) external payable {
        require(msg.value == BET_AMOUNT, "Send exactly 0.0001 tBNB");
        require(playerMove != Move.None, "Invalid move");

        // Генерируем ход компьютера
        Move computerMove = randomMove();

        // Определяем результат
        Result result = determineWinner(playerMove, computerMove);

        uint256 payout = 0;
        if(result == Result.PlayerWins) {
            payout = BET_AMOUNT * 2;
            require(address(this).balance >= payout, "Insufficient contract balance");
            payable(msg.sender).transfer(payout);
        } else if(result == Result.Draw) {
            payout = BET_AMOUNT;
            payable(msg.sender).transfer(payout);
        }
        // Если выигрывает компьютер — ставка остается в контракте

        emit GameResult(msg.sender, playerMove, computerMove, result, payout);
    }

    // Генерация случайного числа (совместимо с BSC)
    function randomMove() private view returns(Move) {
        uint256 rand = uint256(
            keccak256(abi.encodePacked(
                blockhash(block.number - 1),
                block.timestamp,
                block.difficulty,
                msg.sender
            ))
        ) % 3 + 1;
        return Move(rand);
    }

    function determineWinner(Move player, Move computer) private pure returns(Result) {
        if(player == computer) return Result.Draw;

        if(
            (player == Move.Rock && computer == Move.Scissors) ||
            (player == Move.Paper && computer == Move.Rock) ||
            (player == Move.Scissors && computer == Move.Paper)
        ) {
            return Result.PlayerWins;
        } else {
            return Result.ComputerWins;
        }
    }

    // Проверка баланса контракта
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    // Для депозита в контракт
    receive() external payable {}
}