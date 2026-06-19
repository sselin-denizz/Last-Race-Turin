export function segmentExists(
    stationA,
    stationB,
    segments
) {

    return segments.some(segment =>

        (
            segment.stationA === stationA &&
            segment.stationB === stationB
        )

        ||

        (
            segment.stationA === stationB &&
            segment.stationB === stationA
        )

    );

}

export function hasRepeatedSegment(
    route
) {

    const usedSegments =
        new Set();

    for (
        let i = 0;
        i < route.length - 1;
        i++
    ) {

        const a = route[i];
        const b = route[i + 1];

        const key =
            [a, b]
                .sort((x, y) => x - y)
                .join('-');

        if (
            usedSegments.has(key)
        ) {
            return true;
        }

        usedSegments.add(key);

    }

    return false;
}

function getSegmentLine(
    stationA,
    stationB,
    segments
) {

    const segment =
        segments.find(segment =>

            (
                segment.stationA === stationA &&
                segment.stationB === stationB
            )

            ||

            (
                segment.stationA === stationB &&
                segment.stationB === stationA
            )

        );

    return segment
        ? segment.lineId
        : null;

}

function validLineChanges(
    route,
    segments,
    stationLines
) {

    for (
        let i = 0;
        i < route.length - 2;
        i++
    ) {

        const currentStation =
            route[i + 1];

        const line1 =
            getSegmentLine(
                route[i],
                route[i + 1],
                segments
            );

        const line2 =
            getSegmentLine(
                route[i + 1],
                route[i + 2],
                segments
            );

        if (
            line1 !== line2
        ) {

            const linesAtStation =
                stationLines.filter(
                    stationLine =>
                        stationLine.stationId === currentStation
                );

            if (
                linesAtStation.length < 2
            ) {
                return false;
            }

        }

    }

    return true;
}

export function validateRoute(
    route,
    startStation,
    destinationStation,
    segments,
    stationLines
) {

    if (
        route.length === 0
    ) {
        return false;
    }

    if (
        route[0] !== startStation
    ) {
        return false;
    }

    if (
        route[
            route.length - 1
        ] !== destinationStation
    ) {
        return false;
    }

    for (
        let i = 0;
        i < route.length - 1;
        i++
    ) {

        const current =
            route[i];

        const next =
            route[i + 1];

        if (
            !segmentExists(
                current,
                next,
                segments
            )
        ) {
            return false;
        }

    }

    if (
        hasRepeatedSegment(route)
    ) {
        return false;
    }

    if (
    hasRepeatedSegment(route)
    ) {
        return false;
    }

    return true;
}