function createAnalytics() : object {
    let counter = 0;
    let isDestroyed: boolean = false;

    const listener = (): number => counter++;

    document.addEventListener('click', listener);

    return {
        destroy() {
            document.removeEventListener('click', listener);
            isDestroyed = true;
        },
        getClick() {
            if(isDestroyed) {
                return 'Analytics is Destroyed!!!';
            }
            return counter;
        }
    }
}

window['analytics'] = createAnalytics();