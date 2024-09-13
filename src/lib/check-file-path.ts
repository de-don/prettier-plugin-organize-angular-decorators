import {minimatch} from 'minimatch';

export function checkFilePath(filePath: string, patterns: string[]): boolean {
  if (!patterns.length) {
    return true;
  }

  return patterns.some(pattern => minimatch(filePath, pattern));
}
