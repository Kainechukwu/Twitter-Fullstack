// const {format, createLogger, transports} = require("winston");
// const {combine, timestamp, errors} = format;

// function buildDevLogger(){
    
// // const logFormat = printf(({ level, message, timestamp, stack }) => {
// //     return `${timestamp}  ${level}: ${stack ||  message}`;
// //   });

// const logger = createLogger({
//     level: 'debug',
//     format:  combine(
//         format.colorize(),
//          timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
//          errors({stack: true}),
//          logFormat),
//          defaultMeta: {service: "user-service"},
//      transports: [
//         new transports.Console()
     
//     ],
//   });
// }
  
//   module.exports = buildDevLogger;