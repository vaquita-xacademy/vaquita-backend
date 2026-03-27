export default {
    RegisterSuccessExample: {
        summary: "Registro exitoso",
        value: {
            data: {
                user: {
                    id: 1,
                    name: "Jose Perez",
                    email: "example@example.com",
                    role: "donor",
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
    LoginSuccessExample: {
        summary: "Login exitoso",
        value: {
            data: {
                user: {
                    id: 1,
                    name: "Juan Perez",
                    email: "juan@example.com",
                    created_at: "2025-12-17T17:00:00Z",
                    updated_at: "2025-12-17T17:00:00Z",
                }
            }
        },
    },
    InvalidCredentialsExample: {
        summary: "Credenciales invalidas",
        value: {
            message: "Credenciales invalidas",
        },
    },
}