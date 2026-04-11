# Settings Components Data Structure Guide

## Backend Data Structure

The settings components are designed to work with the following backend data structure:

```javascript
{
  id: "b68f0e1a-fd37-47b9-ba69-f249531155fa",
  email: "musarafudesire36@gmail.com",
  role: "user",
  active: true,
  signup_stage: "completed",
  user_created_at: "2026-04-09T18:13:51.649Z",
  user_updated_at: "2026-04-09T18:15:45.390Z",
  contact_email: "musarafudesire36@gmail.com",
  phone: "+91-8942530948",
  others: {},
  street: "234, Mazoe",
  city: "Chandigarh",
  state: "Punjab",
  pin_code: "140307",
  company_name: "MusaTech",
  industry_type: "Banking",
  registration_number: "1239234-CN",
  company_description: "The mind"
}
```

## Component Data Mapping

### 1. Settings.jsx (Main Component)

- **Purpose**: Main container for all settings sections
- **Data Flow**: Fetches user data via `getUserInfo(user.id)` and distributes to child components
- **Key Fields Used**: All fields from backend
- **Fallback Values**: Uses optional chaining (`?.`) and `|| "N/A"` pattern
- **Save Functionality**: Calls respective API functions to save changes:
  - `updateUser()` - Updates user email/password
  - `upateCompanyInfo()` - Updates company information
  - `updateUserContact()` - Updates contact information (email, phone, others)
  - `updateUserAddress()` - Updates address information (street, city, state, pin_code)

### 2. CompanyInformation.jsx

- **Purpose**: Display and edit company-related information
- **Mapped Fields**:
  - `company_name` → Company Name field
  - `registration_number` → Registration Number field
  - `city` → City field
  - `state` → State field
  - `industry_type` → Industry Type field
  - `company_description` → Available but not currently displayed
- **Update Mechanism**: Uses `onCompanyUpdate` callback to update parent state

### 3. ContactInformation.jsx

- **Purpose**: Display and edit contact information
- **Mapped Fields**:
  - `email` → Contact Email field (primary contact email)
  - `phone` → Phone number field
  - `others` → Dynamic contact fields stored as object: `{label_name: value}`
  - `website` → Website field (available but not in current backend structure)
  - `linkedIn` → LinkedIn field (available but not in current backend structure)
- **Note**: Uses `email` field from backend data
- **Dynamic Contacts**: The `others` object is converted to array for display and back to object for saving

### 4. MainTop.jsx

- **Purpose**: Handle OTP verification and account actions
- **Data Usage**: Uses `logged_user_data` prop for password verification
- **Key Functions**:
  - `handleSendOTP()`: Sends OTP to new email address
  - `handleVerifyPassword()`: Verifies current password from backend data
  - `handleVerifyOTP()`: Verifies OTP for email change

### 5. AccountActions.jsx

- **Purpose**: UI for email OTP and password verification
- **Data Source**: Uses context as fallback when direct data not passed
- **Key Fields**:
  - `password`: Used for password verification
  - `email`: Used as reference for current email

## Data Update Flow

1. User modifies field in CompanyInformation or ContactInformation
2. `onChange` event triggers `onCompanyUpdate` callback
3. Parent component (Settings.jsx) updates `userInformation` state
4. Updated state flows back down to child components
5. User clicks "Save Changes" button
6. Authentication modal appears asking for password
7. On successful password verification:
   - `updateUser()` is called with email and password
   - `upateCompanyInfo()` is called with company details
   - `updateUserContact()` is called with contact details
   - `updateUserAddress()` is called with address details
8. Success message is shown and modal closes

## Fallback Values Strategy

All data display points use the pattern: `data?.field || "N/A"`

This ensures:

- No undefined/null values displayed to users
- Graceful degradation if backend data is incomplete
- Consistent user experience

## Important Notes

1. **Email Distinction**:
   - `email`: User authentication email (from auth context)
   - `contact_email`: Company contact email (for public display)

2. **Dynamic Fields**:
   - `others`: Object for storing additional contact methods
   - Format: `{ whatsapp: "+91-8942530948", skype: "username" }`
   - Can be extended with custom fields via AddOtherContactInfo component

3. **Available but Unused Fields**:
   - `company_description`: Company description
   - `pin_code`: Postal code
   - `street`: Street address
   - These can be added to UI as needed

4. **Password Verification**:
   - Required before saving changes (security measure)
   - Uses backend password field for verification

## API Functions

All API functions are located in `end-point-function/setting.js`:

- `getUserInfo(id)` - Fetches user information from backend
- `updateUser(id, email, password)` - Updates user email/password
- `upateCompanyInfo(user_id, company_name, registration_number, description, industry_type)` - Updates company info
- `updateUserContact(user_id, email, phone, others)` - Updates contact information
- `updateUserAddress(user_id, street, city, state, pin_code)` - Updates address information

## Future Enhancements

To add more fields from the backend:

1. Add new field to appropriate component (CompanyInformation or ContactInformation)
2. Use same update pattern: `onChange={onCompanyUpdate}`
3. Set proper fallback: `value={data?.field || "N/A"}`
4. Update this documentation

## Testing Checklist

- [x] All fields display correctly with backend data
- [x] Fallback values show when data is missing
- [x] Updates flow correctly to parent state
- [x] Password verification works
- [x] OTP verification works
- [x] Dynamic contact fields work
- [x] No console errors
- [x] Save functionality calls correct API functions
- [x] All changes are saved to backend successfully
