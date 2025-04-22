// Interface for donation stats data returned by the API
export interface DonationStats {
    students_benefited?: number | null;
    monthly_donors?: number | null;
    transparency_description?: string | null;
}
