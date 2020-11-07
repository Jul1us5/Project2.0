async function start() {
    return await Promise.resolve('Async is working!')
}

start().then(console.log)
