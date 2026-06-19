// Helper function to build a graph from the segments with BFS 
export function buildGraph(segments) {

    const graph = {};

    for (const segment of segments) {

        const a = segment.stationA;
        const b = segment.stationB;

        if (!graph[a])
            graph[a] = [];

        if (!graph[b])
            graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);
    }

    return graph;
}

export function shortestDistance(
    graph,
    start,
    destination
) {

    const queue = [
        {
            station: start,
            distance: 0
        }
    ];

    const visited = new Set([start]);

    while (queue.length > 0) {

        const current =
            queue.shift();

        if (
            current.station === destination
        ) {
            return current.distance;
        }

        const neighbours =
            graph[current.station] || [];

        for (const next of neighbours) {

            if (!visited.has(next)) {

                visited.add(next);

                queue.push({
                    station: next,
                    distance:
                        current.distance + 1
                });

            }
        }
    }

    return -1;
}

