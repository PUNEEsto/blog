
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl) // Set Appwrite API endpoint
            .setProject(conf.appwriteProjectId); // Set project ID

        this.account = new Account(this.client);
    }

    // 🔹 Create a new user account
    async createAccount({ email, password, name }) {
        try {
            console.log("Creating account for:", email);
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            console.log("Account created successfully:", userAccount);
            return userAccount; // Let the frontend handle login
        } catch (error) {
            console.error("Account creation failed:", error.message);
            throw new Error(error.message || "Failed to create account");
        }
    }

    // 🔹 Login a user
    async login({ email, password }) {
        try {
            console.log("Logging in user:", email);
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful:", session);
            return session;
        } catch (error) {
            console.error("Login failed:", error.message);
            throw new Error(error.message || "Failed to log in");
        }
    }

    // 🔹 Get currently logged-in user
    async getPresentUser() {
        try {
            console.log("Fetching current user...");
            const user = await this.account.get();
            console.log("User fetched:", user);
            return user;
        } catch (error) {
            console.warn("No active session found.");
            return null; // No user session
        }
    }

    // 🔹 Logout user
    async logout() {
        try {
            console.log("Logging out user...");
            await this.account.deleteSession("current");
            console.log("Logout successful");
            return true;
        } catch (error) {
            console.error("Logout failed:", error.message);
            return false;
        }
    }
}

// ✅ Export an instance of the AuthService
const authService = new AuthService();
export default authService;


