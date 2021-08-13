import { Observer } from "./Observer";

export class Observable {

    ObserverCollection = []

    addObserver(observer) {
        this.ObserverCollection.push(observer)
    }

    deleteObserver(observerToDelete: Observer): void {
        const indexOfObserverToDelete = this.ObserverCollection.indexOf(observerToDelete) 
        this.ObserverCollection.splice(indexOfObserverToDelete, 1)
    }

    registerObservable(source, typeEvent) {
        source.addEventListener(typeEvent, event => {
            this.ObserverCollection.forEach(element => {
                element(event.target.value)
            });
        })
    }
}