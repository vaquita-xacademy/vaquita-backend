export default {
    RegisterUserRequestSchema: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Nombre completo del usuario",
                example: "Juan Perez",
            },
            email: {
                type: "string",
                format: "email",
                description: "Email del usuario",
                example: "example@example.com",
            },
            password: {
                type: "string",
                minLength: 8,
                maxLength: 60,
                description: "Contraseña del usuario",
                example: "Vaquita1_",
            },
            password_confirmation: {
                type: "string",
                minLength: 8,
                maxLength: 60,
                description: "Confirmación de contraseña",
                example: "Vaquita1_",
            },
            role: {
                type: "string",
                enum: ["donor", "admin", "owner"],
                description: "Rol del usuario",
                example: "donor",
            },
        },
        required: [
            "full_name",
            "email",
            "password",
            "password_confirmation",
            "role"
        ],
    },
}