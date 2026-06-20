export function getRandomEvent(
    events
) {

    const index =
        Math.floor(
            Math.random() *
            events.length
        );

    return events[index];

}