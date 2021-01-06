export interface UserType {
    name: string | undefined;
    email: string | undefined;
    photo?: string | undefined;
    isAuthenticated: boolean;
    github_account?: boolean | false;
}
