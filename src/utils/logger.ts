const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

// 현재 환경에서 설정된 로그 수준
const currentLogLevel: LogLevel =
  (process.env.VUE_APP_LOG_LEVEL as LogLevel) || "info";

// 로그를 출력하는 함수
const log = (level: LogLevel, ...args: unknown[]) => {
  const currentLevelIndex = LOG_LEVELS.indexOf(currentLogLevel);
  const messageLevelIndex = LOG_LEVELS.indexOf(level);

  if (messageLevelIndex >= currentLevelIndex) {
    console[level](...args);
  }
};

// 로그 수준별 메서드
export const Logger = {
  debug: (...args: unknown[]) => log("debug", ...args),
  info: (...args: unknown[]) => log("info", ...args),
  warn: (...args: unknown[]) => log("warn", ...args),
  error: (...args: unknown[]) => log("error", ...args),
};
