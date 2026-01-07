# DENTIRA INTERVIEW PREPARATION - PART 5
## REST APIs (Express.js & Nest.js)

--------------------------------

## A) Hinglish Theory

### Zero se Start Karte Hain

**REST API kya hai?**
- REST = Representational State Transfer
- Web services ka architectural style
- HTTP methods use karta hai (GET, POST, PUT, DELETE)
- Stateless communication
- Resource-based URLs

**REST Principles:**
- **Stateless:** Har request independent
- **Client-Server:** Separation of concerns
- **Cacheable:** Responses cache ho sakte hain
- **Uniform Interface:** Consistent API design
- **Layered System:** Multiple layers (proxies, gateways)

**REST vs Other APIs:**
- **REST:** HTTP methods, JSON, stateless
- **GraphQL:** Single endpoint, flexible queries
- **gRPC:** Binary protocol, high performance
- **SOAP:** XML-based, more complex

### Express.js Fundamentals

**Express.js kya hai?**
- Node.js web framework
- Minimal and flexible
- Middleware support
- Routing system
- Fast and lightweight

**Basic Express Server:**
```typescript
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Nest.js Fundamentals

**Nest.js kya hai?**
- Node.js framework (TypeScript-first)
- Built on Express (or Fastify)
- Modular architecture
- Dependency injection
- Decorators-based
- Enterprise-ready

**Why Nest.js?**
- **TypeScript:** Built-in support
- **Modularity:** Clear structure
- **DI:** Dependency injection
- **Testing:** Easy to test
- **Scalability:** Enterprise patterns

---

## B) Express.js Deep Dive

### Project Structure

```
src/
  controllers/
    user.controller.ts
  services/
    user.service.ts
  models/
    user.model.ts
  routes/
    user.routes.ts
    index.ts
  middleware/
    auth.middleware.ts
    error.middleware.ts
    validation.middleware.ts
  utils/
    logger.ts
    errors.ts
  config/
    database.ts
  app.ts
  server.ts
```

### Controllers

```typescript
// controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAll();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await this.userService.create(userData);
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await this.userService.update(id, userData);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
```

### Services

```typescript
// services/user.service.ts
import { User } from '../models/user.model';
import { AppError } from '../utils/errors';

export class UserService {
  async findAll(): Promise<User[]> {
    return await User.find();
  }

  async findById(id: string): Promise<User | null> {
    return await User.findById(id);
  }

  async create(userData: CreateUserDto): Promise<User> {
    // Validation
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    // Create
    const user = await User.create(userData);
    return user;
  }

  async update(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
  }
}
```

### Routes

```typescript
// routes/user.routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Public routes
router.post('/users', 
  validate(createUserSchema),
  userController.createUser.bind(userController)
);

// Protected routes
router.get('/users', 
  authenticate,
  userController.getUsers.bind(userController)
);

router.get('/users/:id', 
  authenticate,
  userController.getUserById.bind(userController)
);

router.put('/users/:id', 
  authenticate,
  validate(updateUserSchema),
  userController.updateUser.bind(userController)
);

router.delete('/users/:id', 
  authenticate,
  userController.deleteUser.bind(userController)
);

export default router;
```

### Middleware

```typescript
// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

```typescript
// middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // Unknown error
  console.error(err);
  res.status(500).json({
    error: 'Internal server error'
  });
};
```

### Error Handling

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}
```

---

## C) Nest.js Deep Dive

### Project Structure

```
src/
  users/
    users.controller.ts
    users.service.ts
    users.module.ts
    dto/
      create-user.dto.ts
      update-user.dto.ts
    entities/
      user.entity.ts
  auth/
    auth.controller.ts
    auth.service.ts
    auth.module.ts
    strategies/
      jwt.strategy.ts
  common/
    filters/
      http-exception.filter.ts
    guards/
      jwt-auth.guard.ts
    interceptors/
      logging.interceptor.ts
  app.module.ts
  main.ts
```

### Module

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

### Controller

```typescript
// users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
```

### Service

```typescript
// users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ 
      email: createUserDto.email 
    });
    
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
```

### DTOs (Data Transfer Objects)

```typescript
// users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}
```

### Guards

```typescript
// common/guards/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

---

## D) REST API Best Practices

### 1. URL Design

**Good:**
```
GET    /api/users
GET    /api/users/123
POST   /api/users
PUT    /api/users/123
DELETE /api/users/123
```

**Bad:**
```
GET    /api/getUsers
POST   /api/createUser
GET    /api/user?id=123
```

### 2. HTTP Methods

- **GET:** Retrieve data (idempotent, safe)
- **POST:** Create resource (not idempotent)
- **PUT:** Update/replace resource (idempotent)
- **PATCH:** Partial update (idempotent)
- **DELETE:** Delete resource (idempotent)

### 3. Status Codes

```typescript
// Success
200 OK           // GET, PUT, PATCH success
201 Created      // POST success
204 No Content   // DELETE success

// Client Error
400 Bad Request      // Validation error
401 Unauthorized     // Not authenticated
403 Forbidden        // Not authorized
404 Not Found        // Resource not found
409 Conflict         // Resource conflict

// Server Error
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

### 4. Response Format

```typescript
// Success
{
  "data": {
    "id": "123",
    "name": "John",
    "email": "john@example.com"
  }
}

// Error
{
  "error": {
    "message": "User not found",
    "code": "USER_NOT_FOUND",
    "statusCode": 404
  }
}

// List
{
  "data": [
    { "id": "1", "name": "John" },
    { "id": "2", "name": "Jane" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

### 5. Versioning

```typescript
// URL Versioning
/api/v1/users
/api/v2/users

// Header Versioning
Accept: application/vnd.api+json;version=1

// Query Parameter
/api/users?version=1
```

---

## E) Interview Questions - Part 5

**Q1: "Express.js vs Nest.js - When to use which?"**

✅ **Answer:**
"Express.js is best for:
- Simple APIs
- Quick prototyping
- Small to medium projects
- When you need flexibility
- Learning Node.js

Nest.js is best for:
- Large, enterprise applications
- TypeScript-first projects
- Team collaboration (clear structure)
- When you need DI and modularity
- Complex microservices

I use Express for quick projects and Nest.js for production applications where scalability and maintainability are critical."

**Q2: "How do you structure a REST API?"**

✅ **Answer:**
"I follow a layered architecture:

**1. Controllers:**
- Handle HTTP requests/responses
- Input validation
- Call services

**2. Services:**
- Business logic
- Database operations
- External API calls

**3. Models/Entities:**
- Data structure
- Database schema

**4. Middleware:**
- Authentication
- Error handling
- Logging
- Validation

**5. Routes:**
- URL definitions
- Middleware application
- Route handlers

This separation makes code testable, maintainable, and scalable."

**Q3: "How do you handle errors in REST APIs?"**

✅ **Answer:**
"I use a centralized error handling approach:

**1. Custom Error Classes:**
```typescript
class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}
```

**2. Error Middleware:**
- Catch all errors
- Format consistent error responses
- Log errors
- Return appropriate status codes

**3. Try-Catch in Controllers:**
- Catch service errors
- Pass to error middleware

**4. Validation Errors:**
- Use libraries like Joi or class-validator
- Return 400 with validation details

This ensures consistent error responses and proper error handling throughout the application."

---

## F) Key Takeaways

### Must Know:
1. ✅ REST principles and HTTP methods
2. ✅ Express.js structure and middleware
3. ✅ Nest.js modules, controllers, services
4. ✅ Error handling patterns
5. ✅ API versioning and best practices
6. ✅ Authentication and authorization

### Next Steps:
- Read dentira6.md for HTTP Fundamentals
- Practice building REST APIs
- Understand middleware patterns

---

**End of Part 5 - Continue to dentira6.md**

