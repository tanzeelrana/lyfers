import axios from "axios";

interface ApiError {
  message: string;
  navigateTo?: string; 
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        return { message: data.message || "Access Denied.", navigateTo: "login" };
      case 403:
        return { message: data.message || "Access Denied.", navigateTo: "access-denied" };
        case 404:
          return { message: data.message || "Not Found." };
        case 400:
        // Handle 400 status and map error messages if available
        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors
            .map((err: any) => err.msg) 
            .join(", ");
          return { message: data.message ||  "Bad request. Please check your input." };
        }
        return { message:"Bad request. Please check your input."}; 
      case 500:
        return { message: data.message || "Server error. Please try again later."};
      default:
        return { message: data.message || "An unknown error occurred."}
    }
  }
  return { message: "Failed to fetch data. Please try again." };
};