# Backend Architecture

Cấu trúc backend đã được tổ chức theo mô hình MVC (Model-View-Controller) để tách biệt hoàn toàn logic API khỏi UI components.

## Cấu trúc thư mục

```
backend/
├── controllers/         # Controllers - Xử lý business logic
│   ├── authController.ts      # Xử lý authentication
│   ├── sessionController.ts   # Xử lý practice sessions
│   └── userController.ts      # Quản lý users
├── services/           # Services - Tương tác với database
│   ├── authService.ts         # Auth service
│   ├── sessionService.ts      # Session service
│   └── userService.ts         # User service
├── models/             # Models - Định nghĩa types/interfaces
│   ├── authModel.ts          # Auth types
│   ├── sessionModel.ts       # Session types
│   └── userModel.ts          # User types
├── api/               # API layer - Expose public APIs
│   ├── authApi.ts           # Auth API
│   ├── sessionApi.ts        # Session API
│   └── userApi.ts           # User API
└── index.ts           # Main exports
```

## Nguyên tắc thiết kế

### 1. Separation of Concerns

- **Controllers**: Xử lý business logic, validation
- **Services**: Tương tác trực tiếp với database/external APIs
- **Models**: Định nghĩa data structures và types
- **API Layer**: Expose public interface cho components

### 2. Dependency Injection

- Controllers depend on Services
- Services handle data persistence
- API layer wraps Controllers

### 3. Error Handling

- Tất cả functions return consistent response format: `{ success: boolean, data?: any, error?: string }`
- Services handle database errors
- Controllers handle business logic errors

## Cách sử dụng

### Import backend APIs trong components:

```typescript
import { authApi, sessionApi, userApi } from '@/backend';

// Authentication
const result = await authApi.signIn({ username, password });

// Session management
const session = await sessionApi.createSession(userId, config);

// User management
const users = await userApi.getUsers();
```

## Migration từ cấu trúc cũ

### Trước:

```typescript
// Component trộn lẫn API calls
const { data, error } = await supabase
  .from('practice_sessions')
  .insert({ ... });
```

### Sau:

```typescript
// Component sử dụng backend API
const result = await sessionApi.createSession(userId, config);
```

## Lợi ích

1. **Tách biệt rõ ràng**: UI logic và data access logic hoàn toàn tách biệt
2. **Dễ maintain**: Thay đổi database schema chỉ cần update Services
3. **Dễ test**: Có thể mock APIs để test UI components
4. **Reusable**: APIs có thể được sử dụng bởi nhiều components
5. **Type Safety**: TypeScript types được define rõ ràng ở Models
6. **Scalable**: Dễ dàng thêm features mới theo cùng pattern

## Best Practices

1. **Không gọi Supabase trực tiếp từ components**
2. **Luôn sử dụng backend APIs**
3. **Define types trong Models trước khi implement**
4. **Handle errors consistently**
5. **Keep Services focused on single responsibility**
