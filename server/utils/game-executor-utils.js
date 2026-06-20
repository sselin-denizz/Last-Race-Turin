import {
    getRandomEvent
} from './event-utils.js';

const INITIAL_COINS = 20;

export function executeRoute(
    route,
    events
) {

    let coins =
        INITIAL_COINS;

    const journey = [];

    for (
        let i = 0;
        i < route.length - 1;
        i++
    ) {

        const event =
            getRandomEvent(events);

        coins +=
            event.effect;

        journey.push({

            from:
                route[i],

            to:
                route[i + 1],

            event:
                event.description,

            effect:
                event.effect,

            coins

        });

    }

    return {

        finalScore:
            Math.max(
                0,
                coins
            ),

        journey

    };

}