import examples from "../examples";

export default {
    PaginateSchema: {
        type: "object",
        properties: {
            items: {
                type: "array",
                description: "Listado de objetos",
                example: []
            },
            total_count: {
                type: "integer",
                description: "Cantidad total de registros",
                example: 5
            },
            paginate_info: {
                type: "object",
                properties: {
                    has_next: {
                        type: "boolean",
                        description: "Verifica si hay mas registros adelante",
                        example: "false",
                    },
                    has_previous: {
                        type: "boolean",
                        description: "Verifica si hay mas registros atrás",
                        example: "false",
                    },
                    next_cursor: {
                        oneOf: [
                            { type: "string" },
                            { type: "null" }
                        ],
                        description: "Cursor para avanzar",
                        example: null,
                    },
                    prev_cursor: {
                        oneOf: [
                            { type: "string" },
                            { type: "null" }
                        ],
                        description: "Cursor para retroceder",
                        example: null,
                    },
                },

            },
        },
    },
}