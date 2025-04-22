// Interface representing the user object used in the Auth context
export interface User {
  id?: string; // Optional if not always present initially
  name?: string; // Optional
  email: string;
  avatar?: string;
  features?: string[]; // Array of feature flags/permissions
}
