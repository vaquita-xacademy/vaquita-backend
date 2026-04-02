const orgExample = {
    id: 1,
    owner_id: 4,
    name: "Fundación Verde",
    description: "Organización dedicada a proyectos ecológicos en la región.",
    logo_url: "https://example.com/logos/fundacion-verde.png",
    created_at: "2026-04-02T00:00:00.000Z",
    updated_at: "2026-04-02T00:00:00.000Z",
};

const orgWithVerification = {
    ...orgExample,
    verification: {
        id: 1,
        status: "approved",
        entity_type: "legal",
        legal_name: "Fundación Verde ONG",
        tax_id: "30-99887766-5",
    },
};

const orgWithNullVerification = {
    ...orgExample,
    id: 2,
    name: "Comedor Esperanza",
    verification: null,
};

const verificationExample = {
    id: 1,
    organization_id: 1,
    legal_name: "Fundación Verde ONG",
    tax_id: "30-99887766-5",
    document_url: "https://example.com/documentos/estatuto-fundacion.pdf",
    entity_type: "legal",
    status: "pending",
    created_at: "2026-04-02T00:00:00.000Z",
    updated_at: "2026-04-02T00:00:00.000Z",
};

export default {
    CreateOrganizationSuccessExample: {
        summary: "Organización creada exitosamente",
        value: { data: { organization: orgExample } },
    },

    GetOrganizationSuccessExample: {
        summary: "Detalle de organización",
        value: { data: { organization: orgWithVerification } },
    },

    ListMyOrganizationsSuccessExample: {
        summary: "Mis organizaciones",
        value: {
            data: {
                organizations: [orgWithVerification, orgWithNullVerification],
            },
        },
    },

    ListAllOrganizationsSuccessExample: {
        summary: "Todas las organizaciones (admin)",
        value: {
            data: {
                organizations: [orgWithVerification, orgWithNullVerification],
            },
        },
    },

    UpdateOrganizationSuccessExample: {
        summary: "Organización actualizada",
        value: { data: { organization: { ...orgExample, name: "Fundación Verde Actualizada" } } },
    },

    CreateOrgVerificationSuccessExample: {
        summary: "Verificación de organización enviada",
        value: { data: { verification: verificationExample } },
    },

    GetOrgVerificationSuccessExample: {
        summary: "Verificación de organización",
        value: { data: { verification: verificationExample } },
    },

    UpdateOrgVerificationStatusSuccessExample: {
        summary: "Estado de verificación actualizado",
        value: { data: { verification: { ...verificationExample, status: "approved" } } },
    },
}
