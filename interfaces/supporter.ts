// Interface for supporter data returned by the API
export interface SupporterData {
    id: string; // Assuming UUID is stringified
    name: string;
    avatar_url?: string | null;
    contribution_date: string; // Assuming datetime is stringified
}
