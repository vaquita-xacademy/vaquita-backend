import { PaginationConnection } from "sequelize-cursor-pagination";

export function toPaginate<T>(result: PaginationConnection<T>) {
    const items = result.edges.map(edge => edge.node);
    const cursors = {
        has_next: result.pageInfo.hasNextPage,
        has_previous: result.pageInfo.hasPreviousPage,
    };

    return {
        items: items,
        total_count: result.totalCount,
        paginate_info: {
            has_next: cursors.has_next,
            has_previous: cursors.has_previous,
            next_cursor: cursors.has_next ? result.pageInfo.endCursor : null,
            prev_cursor: cursors.has_previous ? result.pageInfo.startCursor : null,
        },
    };
}