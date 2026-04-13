import { Donation, Project, User } from "../../../db/models";

export class DonationResource {

    // Vista para el donor: ve sus propias donaciones con info del proyecto
    static toMine(donation: Donation) {
        const project = donation.project as Project | undefined;
        return {
            id: donation.id,
            project: project ? { id: project.id, title: project.title, slug: project.slug } : { id: donation.project_id },
            amount: Number(donation.amount),
            message: donation.message ?? null,
            created_at: donation.created_at,
        };
    }

    // Vista para el owner/admin: ve donantes y montos de su proyecto
    static toProjectView(donation: Donation) {
        const donor = donation.donor as User | undefined;
        return {
            id: donation.id,
            donor: donor ? { id: donor.id, name: donor.name } : { id: donation.donor_id },
            amount: Number(donation.amount),
            message: donation.message ?? null,
            created_at: donation.created_at,
        };
    }
}
