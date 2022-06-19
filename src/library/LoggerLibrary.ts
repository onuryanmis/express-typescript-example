import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}-[${level.toUpperCase()}] ${message}`;
});

const LoggerLibrary = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/info.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    LoggerLibrary.add(new transports.Console({
        format: combine(
            timestamp(),
            logFormat
        ),
    }));
}

export default LoggerLibrary;