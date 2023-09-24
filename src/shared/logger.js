const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const path = require('path')
const DailyRotateFile = require( 'winston-daily-rotate-file')

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp)
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}\n`
})

const infoLogger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'Task Management' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs',
                'winston',
                'successes',
                `%DATE%-success.log`
            ),
            datePattern: 'DD-MM-YYYY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d',
        }),
    ],
})

const errorLogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'Task Management' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs',
                'winston',
                'errors',
                `%DATE%-error.log`
            ),
            datePattern: 'DD-MM-YYYY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d',
        }),
    ],
})

module.exports = { infoLogger, errorLogger };