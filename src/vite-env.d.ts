/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPWRITE_URL: string
    readonly VITE_APPWRITE_PROJECT_ID: string
    readonly VITE_APPWRITE_DATABASE_ID: string
    readonly VITE_APPWRITE_USERS_COLLECTION_ID: string
    readonly VITE_APPWRITE_BUSINESSES_COLLECTION_ID: string
    readonly VITE_APPWRITE_CONVERSATIONS_COLLECTION_ID: string
    readonly VITE_APPWRITE_MESSAGES_COLLECTION_ID: string
    readonly VITE_APPWRITE_DEALS_COLLECTION_ID: string
    readonly VITE_APPWRITE_FAVORITES_COLLECTION_ID: string
    readonly VITE_APPWRITE_REVIEWS_COLLECTION_ID: string
    readonly VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID: string
    readonly VITE_APPWRITE_BUSINESS_ANALYTICS_COLLECTION_ID: string
    readonly VITE_APPWRITE_BUSINESS_IMAGES_BUCKET_ID: string
    readonly VITE_APPWRITE_BUSINESS_DOCUMENTS_BUCKET_ID: string
    readonly VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID: string
    readonly VITE_APPWRITE_CHAT_ATTACHMENTS_BUCKET_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
