import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      let formattedMessage = `${timestamp} [${level}] {"msg": "${message}"`;

      if (Object.keys(metadata).length) {
        formattedMessage += `, "args": ${JSON.stringify(metadata)}`;
      }

      formattedMessage += "}";

      return formattedMessage;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
