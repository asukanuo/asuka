declare module 'process' {
    global {
        namespace NodeJS {
            export interface ProcessEnv {
                BASE_ENV: 'development' | 'test' | 'pre' | 'production'
                NODE_ENV: 'development' | 'production'
            }
        }
    }
}
declare module '*.svg' {
    const ref: string;
    export default ref;
}
declare module '*.bmp' {
    const ref: string;
    export default ref;
}
declare module '*.gif' {
    const ref: string;
    export default ref;
}
declare module '*.jpg' {
    const ref: string;
    export default ref;
}
declare module '*.jpeg' {
    const ref: string;
    export default ref;
}
declare module '*.png' {
    const ref: string;
    export default ref;
}