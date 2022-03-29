// pubsub pattern
class Channel {

    static #subscribers = [];

    static subscribe (event, callback) {
        let subscriber = {event, callback}

        Channel.#subscribers.push(subscriber);
    }

    static publish (event, data) {
        
        for(let subscriber of Channel.#subscribers) {
            if(subscriber.event == event)
                subscriber.callback(data);
        }

    }
}