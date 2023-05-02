export default class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    //Criando o método para ser emitido
    on(event, listener) {


        if (!this.listeners.has(event)) {
            this.listeners.set(event, [])
        }

        this.listeners.get(event).push(listener);
    }

    //Método para emitir o evento
    emit(event, payload) {

        if (!this.listeners.has(event)) {
            return;
        }

        this.listeners.get(event).forEach((listener) => {
            listener(payload);
        });
    }

    removeListener(event, listenerToRemove) {
        const listeners = this.listeners.get(event);

        if (!listeners) {
            return;
        }

        const filteredListeners = listeners.filter(
            (listener) => listener !== listenerToRemove
        );

        this.listeners.set(event, filteredListeners)
    }
}

const toastEventManager = new EventManager();

