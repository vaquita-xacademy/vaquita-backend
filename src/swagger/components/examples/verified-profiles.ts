const verifiedProfileExample = {
    id: 1,
    user_id: 4,
    legal_name: "Maria Lopez",
    tax_id: "20-12345678-9",
    document_url: "https://example.com/documentos/dni-maria.pdf",
    entity_type: "individual",
    status: "pending",
    created_at: "2026-04-02T00:00:00.000Z",
    updated_at: "2026-04-02T00:00:00.000Z",
};

export default {
    CreateVerifiedProfileSuccessExample: {
        summary: "Perfil de verificación enviado exitosamente",
        value: {
            data: { verified_profile: verifiedProfileExample },
        },
    },

    GetVerifiedProfileSuccessExample: {
        summary: "Perfil de verificación propio",
        value: {
            data: { verified_profile: verifiedProfileExample },
        },
    },

    ListVerifiedProfilesSuccessExample: {
        summary: "Lista de perfiles de verificación (admin)",
        value: {
            data: {
                verified_profiles: [
                    verifiedProfileExample,
                    {
                        ...verifiedProfileExample,
                        id: 2,
                        user_id: 5,
                        legal_name: "Carlos Ruiz",
                        tax_id: "23-98765432-1",
                        status: "approved",
                    },
                ],
            },
        },
    },

    UpdateVerifiedProfileStatusSuccessExample: {
        summary: "Estado actualizado exitosamente",
        value: {
            data: {
                verified_profile: { ...verifiedProfileExample, status: "approved" },
            },
        },
    },
}
