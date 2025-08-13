# Appwrite Setup Guide for DealEase

This guide will help you connect your DealEase app with Appwrite for backend services including authentication, database, and file storage.

## Prerequisites

✅ Appwrite SDK is already installed in your project (version 18.2.0)
✅ Environment variables types are configured
✅ Appwrite services and hooks are created

## Step 1: Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or your self-hosted Appwrite instance
2. Create a new project called "DealEase"
3. Copy your Project ID from the project settings

## Step 2: Configure Environment Variables

Create or update your `.env` file in the project root with your Appwrite configuration:

```bash
# Appwrite Configuration
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here

# Collections IDs (you'll create these in Step 4)
VITE_APPWRITE_USERS_COLLECTION_ID=users
VITE_APPWRITE_BUYERS_COLLECTION_ID=buyers
VITE_APPWRITE_SELLERS_COLLECTION_ID=sellers
VITE_APPWRITE_DEALS_COLLECTION_ID=deals
VITE_APPWRITE_MESSAGES_COLLECTION_ID=messages
VITE_APPWRITE_MATCHES_COLLECTION_ID=matches

# Storage Bucket IDs (you'll create these in Step 5)
VITE_APPWRITE_DOCUMENTS_BUCKET_ID=documents
VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID=profile-pictures
```

## Step 3: Set Up Authentication

1. In your Appwrite console, go to **Auth**
2. Enable **Email/Password** authentication
3. Configure your app's domain in the **Platforms** section:
   - Add a **Web App** platform
   - Set the hostname to `localhost` for development
   - For production, add your actual domain

## Step 4: Create Database Collections

1. Go to **Databases** in your Appwrite console
2. Create a new database (note the Database ID for your .env file)
3. Create the following collections with these attributes:

### Users Collection

- **Collection ID**: `users`
- **Attributes**:
  - `userId` (string, required) - User's auth ID
  - `role` (string, required) - "buyer" or "seller"
  - `firstName` (string, required)
  - `lastName` (string, required)
  - `company` (string, optional)
  - `profilePicture` (string, optional) - File ID
  - `phone` (string, optional)
  - `location` (string, optional)

### Buyers Collection

- **Collection ID**: `buyers`
- **Attributes**:
  - `userId` (string, required) - Reference to Users
  - `industryFocus` (string, array) - Industries of interest
  - `budgetRange` (string, required) - Budget range
  - `experienceLevel` (string, required)
  - `preferredLocation` (string, array)
  - `questionnaire` (string, optional) - JSON string

### Sellers Collection

- **Collection ID**: `sellers`
- **Attributes**:
  - `userId` (string, required) - Reference to Users
  - `businessName` (string, required)
  - `industry` (string, required)
  - `revenue` (string, required)
  - `profitMargin` (string, required)
  - `askingPrice` (string, required)
  - `businessAge` (string, required)
  - `location` (string, required)
  - `description` (string, required)
  - `questionnaire` (string, optional) - JSON string

### Deals Collection

- **Collection ID**: `deals`
- **Attributes**:
  - `buyerId` (string, required)
  - `sellerId` (string, required)
  - `businessName` (string, required)
  - `stage` (string, required) - Current deal stage
  - `askingPrice` (string, required)
  - `status` (string, required) - "active", "closed", "cancelled"
  - `stages` (string, required) - JSON string of stage data
  - `documents` (string, array) - File IDs

### Messages Collection

- **Collection ID**: `messages`
- **Attributes**:
  - `conversationId` (string, required)
  - `senderId` (string, required)
  - `recipientId` (string, required)
  - `content` (string, required)
  - `messageType` (string, required) - "text", "file", "system"
  - `attachments` (string, array) - File IDs
  - `isRead` (boolean, required)

### Matches Collection

- **Collection ID**: `matches`
- **Attributes**:
  - `buyerId` (string, required)
  - `sellerId` (string, required)
  - `score` (integer, required) - Match score percentage
  - `status` (string, required) - "pending", "accepted", "rejected"
  - `criteria` (string, required) - JSON string of match criteria

## Step 5: Create Storage Buckets

1. Go to **Storage** in your Appwrite console
2. Create the following buckets:

### Documents Bucket

- **Bucket ID**: `documents`
- **File Security**: Enabled
- **Max File Size**: 50MB
- **Allowed Extensions**: pdf, doc, docx, xls, xlsx, txt
- **Permissions**:
  - Read: `role:buyer`, `role:seller`
  - Write: `role:buyer`, `role:seller`

### Profile Pictures Bucket

- **Bucket ID**: `profile-pictures`
- **File Security**: Enabled
- **Max File Size**: 5MB
- **Allowed Extensions**: jpg, jpeg, png, webp
- **Permissions**:
  - Read: `role:buyer`, `role:seller`
  - Write: `role:buyer`, `role:seller`

## Step 6: Set Up Permissions

For each collection, configure permissions:

1. **Read Access**: `role:buyer`, `role:seller`
2. **Write Access**: `role:buyer`, `role:seller`
3. **Update Access**: `role:buyer`, `role:seller` (for their own documents)
4. **Delete Access**: `role:buyer`, `role:seller` (for their own documents)

## Step 7: Update Your App

### Using the Auth Hook

```tsx
import { useAuth } from "../hooks/useAppwrite";

const YourComponent = () => {
  const { user, login, logout, signup, isAuthenticated, loading } = useAuth();

  const handleLogin = async () => {
    const result = await login("user@example.com", "password");
    if (result.success) {
      // Redirect to dashboard
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### Using Database Hooks

```tsx
import { useBuyers, useDeals } from "../hooks/useAppwrite";

const YourComponent = () => {
  const { getBuyers, createBuyer } = useBuyers();
  const { getDeals, createDeal } = useDeals();

  const loadBuyers = async () => {
    const result = await getBuyers();
    if (result.success) {
      console.log(result.data.documents);
    }
  };

  return <div>Your component content</div>;
};
```

### Using Storage

```tsx
import { useStorage } from "../hooks/useAppwrite";

const FileUpload = () => {
  const { uploadDocument, uploadProfilePicture, getFileUrl } = useStorage();

  const handleFileUpload = async (file: File) => {
    const result = await uploadDocument(file);
    if (result.success) {
      const fileUrl = getFileUrl("documents", result.data.$id);
    }
  };

  return (
    <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
  );
};
```

## Step 8: Testing

1. Start your development server: `npm run dev`
2. Test authentication with the example login component at `/src/components/auth/AppwriteLogin.tsx`
3. Check the browser console for any errors
4. Verify data is being saved in your Appwrite dashboard

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure you've added your domain to the Platforms section in Appwrite
2. **Permission Denied**: Check that your collections have the correct read/write permissions
3. **Environment Variables**: Ensure all VITE\_ prefixed variables are set correctly
4. **Collection Not Found**: Verify collection IDs match between your .env and Appwrite console

### Debug Steps

1. Check browser console for detailed error messages
2. Verify your Project ID is correct
3. Test API calls directly in the Appwrite console
4. Check network tab for failed requests

## Next Steps

1. Replace your existing auth system with Appwrite auth
2. Migrate existing data to Appwrite collections
3. Implement real-time subscriptions for messages
4. Add file upload functionality to your forms
5. Set up user roles and permissions
6. Configure email templates for password reset

## Security Best Practices

1. Never expose your API keys in client-side code
2. Use Appwrite's built-in security rules
3. Validate data on both client and server sides
4. Implement proper user role management
5. Regular backup your Appwrite data
6. Monitor authentication logs

For more detailed information, visit the [Appwrite Documentation](https://appwrite.io/docs).
