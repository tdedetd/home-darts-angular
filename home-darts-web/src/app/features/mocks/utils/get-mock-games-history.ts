import { HttpRequest } from '@angular/common/http';
import gameHistoryItem from '../constants/mocks/game-history-item.json';

const totalGames = 120;

export function getMockGamesHistory(request: HttpRequest<unknown>): object {
  const params = request.params;
  const page = Number.isNaN(Number(params.get('page') ?? undefined)) ? 0 : Number(params.get('page'));
  const size = Number.isNaN(Number(params.get('size') ?? undefined)) ? 10 : Number(params.get('size'));
  const offset = page * size;

  return offset > totalGames ? [] : Array(Math.min(size, totalGames - offset)).fill(null).map((_, index) => {
    const id = totalGames - offset - index;
    return {
      ...gameHistoryItem,
      id,
      isCompleted: id !== totalGames,
    };
  });
}
