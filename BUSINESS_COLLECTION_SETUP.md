# 🏢 Businesses Collection Setup

## Required Attributes for "businesses" Collection

Add these attributes in **exact order** in your Appwrite console:

### ✅ **String Attributes:**

1. **businessId**

   - Type: String
   - Size: 255
   - Required: ✅
   - Array: ❌

2. **sellerId**

   - Type: String
   - Size: 255
   - Required: ✅
   - Array: ❌

3. **title**

   - Type: String
   - Size: 255
   - Required: ✅
   - Array: ❌

4. **description**

   - Type: String
   - Size: 10000
   - Required: ✅
   - Array: ❌

5. **industry**

   - Type: String
   - Size: 100
   - Required: ✅
   - Array: ❌

6. **businessModel**

   - Type: String
   - Size: 100
   - Required: ❌
   - Array: ❌

7. **stage**

   - Type: String
   - Size: 50
   - Required: ❌
   - Array: ❌

8. **location**

   - Type: String
   - Size: 255
   - Required: ❌
   - Array: ❌

9. **assets**

   - Type: String
   - Size: 1000
   - Required: ❌
   - Array: ❌

10. **reason**

- Type: String
- Size: 1000
- Required: ❌
- Array: ❌

### ✅ **Number Attributes:**

11. **employees**

- Type: Integer
- Required: ❌
- Min: 0
- Max: 999999

12. **revenue**

- Type: Float
- Required: ❌
- Min: 0

13. **askingPrice**

- Type: Float
- Required: ❌
- Min: 0

14. **views**

- Type: Integer
- Required: ❌
- Default: 0

### ✅ **Boolean Attributes:**

15. **isActive**

- Type: Boolean
- Required: ❌
- Default: true

16. **isVerified**

- Type: Boolean
- Required: ❌
- Default: false

17. **isFeatured**

- Type: Boolean
- Required: ❌
- Default: false

### ✅ **Array Attributes:**

18. **tags**

- Type: String
- Size: 50
- Required: ❌
- Array: ✅

19. **images**

- Type: String
- Size: 255
- Required: ❌
- Array: ✅

20. **documents**

- Type: String
- Size: 255
- Required: ❌
- Array: ✅

## 🔐 **Permissions Setup**

Set these permissions for the businesses collection:

### **Read Permissions:**

- ✅ **Any** (anyone can view business listings)

### **Create Permissions:**

- ✅ **Users** (any authenticated user can create)

### **Update Permissions:**

- ✅ **Users** (only document owner can update)

### **Delete Permissions:**

- ✅ **Users** (only document owner can delete)

## 📋 **Quick Copy-Paste Checklist**

Copy this list and check off each attribute as you add it:

```
□ businessId (String, 255, Required)
□ sellerId (String, 255, Required)
□ title (String, 255, Required)
□ description (String, 10000, Required)
□ industry (String, 100, Required)
□ businessModel (String, 100, Optional)
□ stage (String, 50, Optional)
□ location (String, 255, Optional)
□ assets (String, 1000, Optional)
□ reason (String, 1000, Optional)
□ employees (Integer, Optional, Default: 0)
□ revenue (Float, Optional)
□ askingPrice (Float, Optional)
□ views (Integer, Optional, Default: 0)
□ isActive (Boolean, Optional, Default: true)
□ isVerified (Boolean, Optional, Default: false)
□ isFeatured (Boolean, Optional, Default: false)
□ tags (String Array, 50, Optional)
□ images (String Array, 255, Optional)
□ documents (String Array, 255, Optional)
□ Permissions set (Read: Any, Create/Update/Delete: Users)
```

## 🎯 **After Setup**

Once you've created the collection:

1. **Test the flow:**

   - Sign up as a seller
   - Go to "My Businesses"
   - Create your first business listing
   - Verify it appears in your list

2. **If you get errors:**
   - Check browser console (F12)
   - Verify collection name is exactly "businesses"
   - Verify all required attributes are added
   - Check permissions are set correctly

## 🚀 **You're Ready!**

After completing this setup, your seller business listing feature will work perfectly!
