/**
 * Get good answer ratio (0 to 1)
 *
 * @param {Array} answers
 *
 * @return {Number}
 */
export function getSuccessRatio(answers, on = 1) {
  if (!answers) { return 0; }

  return (answers.filter(answer => answer).length / answers.length) * on;
}

/**
 * Get longest streak size
 *
 * @param {Array} answers
 *
 * @return {Number}
 */
export function getLongestStreak(answers) {
  if (!answers) { return 0; }

  const streaks = [0];

  answers.forEach(value => value ? streaks[0]++ : streaks.unshift(0));

  return Math.max(...streaks);
}

/**
 * Get progress (0 to 1)
 *
 * @param {Number} index
 * @param {Array} answers
 *
 * @return {Number}
 */
export function getProgress(index, answers) {
  if (index < 0) { return 0; }

  return index / partition.length;
}
