import { Chess } from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()
export const gameSubject = new BehaviorSubject()

export function initGame() {
    const savedGame = localStorage.getItem('savedGame');
    if(savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}

export function handleMove(from, to) {
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion);
    getResultOfGame()
    if (promotions.some(item => `${item.from}:${item.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color };
        updateGame(pendingPromotion)
    }
    const { pendingPromotion } = gameSubject.getValue();
    if (!pendingPromotion) {
        Move(from, to, pendingPromotion, { sloppy: true })
    }
}

export function Move(from, to,promotion) {
    let tempMove = {from,to}
    if(promotion) {
        tempMove.promotion = promotion
    }

    const legalMove = chess.move(tempMove, { sloppy: true });
    if (legalMove) {
        updateGame()
    }
}
export function resetGame() {
    chess.reset()
    updateGame()
}
function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over();

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getResultOfGame() : null
    }
    localStorage.setItem('savedGame', chess.fen())
    gameSubject.next(newGame)
}
function getResultOfGame() {
    if(chess.in_draw()) {
        if(chess.in_stalemate()) {
            return 'Stalemate'
        } else if(chess.in_threefold_repetition()) {
            return 'Repetition'
        } if(chess.insufficient_material()) {
            return 'Insufficient Material'
        }

        return 'Draw'
    } if(chess.in_checkmate()){
        const winner = chess.turn() === 'w' ? 'Black' : 'White'
        return `Winner - ${winner}`
    }
}