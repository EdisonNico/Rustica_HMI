import promotions from '@/assets/promotions-board.png'
import shows1 from '@/assets/shows-board-1.png'
import shows2 from '@/assets/shows-board-2.png'
import shows3 from '@/assets/shows-board-3.png'

/** Hojas de afiches: cada tarjeta recorta su afiche con background-position. */
export const PROMOTIONS_BOARD = { src: promotions.src, size: '326% 247.9%' }
export const SHOW_BOARDS = { 1: shows1.src, 2: shows2.src, 3: shows3.src } as const
