/**
 * owner => 駒の所有者
 *          0 : 先手
 *          1 : 後手
 *
 * ID 駒番号: 駒名
 * fu (0 | 20) : 歩
 * ky (1 | 21) : 香
 * ke (2 | 22) : 桂
 * gi (3 | 23) : 銀
 * ki (4 | 24) : 金
 * ka (5 | 25) : 角
 * hi (6 | 26) : 飛
 * gy (7 | 27) : 玉
 * to (10 | 30) : と
 * ny (11 | 31) : 成香
 * nk (12 | 32) : 成桂
 * ng (13 | 33) : 成銀
 * um (15 | 35) : 馬
 * ry (16 | 36) : 龍
 * empty: undefined
 *
 * example: fu0
 *          先手が所有する歩
 */
export default function pieceId(
  n: number,
  isReversed: boolean,
): string | undefined {
  let owner = n >= 20 ? 1 : 0;
  if (isReversed) {
    owner = 1 - owner;
  }

  if (n === 0 || n === 20) {
    return `fu${owner}`;
  } else if (n === 1 || n === 21) {
    return `ky${owner}`;
  } else if (n === 2 || n === 22) {
    return `ke${owner}`;
  } else if (n === 3 || n === 23) {
    return `gi${owner}`;
  } else if (n === 4 || n === 24) {
    return `ki${owner}`;
  } else if (n === 5 || n === 25) {
    return `ka${owner}`;
  } else if (n === 6 || n === 26) {
    return `hi${owner}`;
  } else if (n === 7 || n === 27) {
    return `gy${owner}`;
  } else if (n === 10 || n === 30) {
    return `to${owner}`;
  } else if (n === 11 || n === 31) {
    return `ny${owner}`;
  } else if (n === 12 || n === 32) {
    return `nk${owner}`;
  } else if (n === 13 || n === 33) {
    return `ng${owner}`;
  } else if (n === 15 || n === 35) {
    return `um${owner}`;
  } else if (n === 16 || n === 36) {
    return `ry${owner}`;
  } else {
    return undefined;
  }
}
