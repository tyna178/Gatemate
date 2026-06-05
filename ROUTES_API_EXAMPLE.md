# Contoh Routes API untuk React Frontend

## Setup Routes di Laravel

Tambahkan ke `routes/api.php`:

```php
<?php

use App\Http\Controllers\Api\{
    EventController,
    CategoryController,
    TicketController,
    AuthController,
    UserController,
};
use Illuminate\Support\Facades\Route;

/**
 * Public Routes
 */
Route::get('/health', fn() => response()->json(['status' => 'ok']));

/**
 * Event Routes
 */
Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);           // All events
    Route::get('/trending', [EventController::class, 'trending']); // Trending events
    Route::get('/search', [EventController::class, 'search']);     // Search events
    Route::get('/category/{category}', [EventController::class, 'byCategory']);
    Route::get('/{id}', [EventController::class, 'show']);        // Single event
});

/**
 * Category Routes
 */
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{slug}', [CategoryController::class, 'show']);
});

/**
 * Auth Routes
 */
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

/**
 * Protected Routes (Require Authentication)
 */
Route::middleware('auth:sanctum')->group(function () {
    /**
     * User Routes
     */
    Route::prefix('users')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::put('/profile', [UserController::class, 'updateProfile']);
        Route::get('/wallet', [UserController::class, 'wallet']);
        Route::post('/wallet/topup', [UserController::class, 'topupWallet']);
    });

    /**
     * Ticket Routes
     */
    Route::prefix('tickets')->group(function () {
        Route::get('/my-tickets', [TicketController::class, 'myTickets']);
        Route::post('/verify', [TicketController::class, 'verify']);
        Route::get('/{id}', [TicketController::class, 'show']);
    });

    /**
     * Event Purchase Routes
     */
    Route::post('/events/{id}/tickets/purchase', [TicketController::class, 'purchase']);

    /**
     * Organizer Routes (Admin)
     */
    Route::middleware('role:organizer')->prefix('organizer')->group(function () {
        Route::post('/events', [EventController::class, 'store']);        // Create event
        Route::put('/events/{id}', [EventController::class, 'update']);   // Update event
        Route::delete('/events/{id}', [EventController::class, 'delete']); // Delete event
        Route::get('/events/{id}/stats', [EventController::class, 'stats']); // Event stats
        Route::get('/events/{id}/attendees', [EventController::class, 'attendees']);
    });
});
```

## Contoh Controllers

### EventController.php

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Resources\EventResource;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->has('q')) {
            $search = $request->q;
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        $events = $query->paginate($request->get('per_page', 15));

        return EventResource::collection($events);
    }

    public function trending(Request $request)
    {
        $limit = $request->get('limit', 10);
        $events = Event::where('trending', true)
                       ->limit($limit)
                       ->get();

        return EventResource::collection($events);
    }

    public function search(Request $request)
    {
        $search = $request->get('q', '');
        
        if (strlen($search) < 2) {
            return response()->json([
                'data' => [],
                'message' => 'Minimal 2 karakter untuk pencarian'
            ]);
        }

        $events = Event::where('title', 'like', "%{$search}%")
                       ->orWhere('description', 'like', "%{$search}%")
                       ->limit(20)
                       ->get();

        return EventResource::collection($events);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return new EventResource($event);
    }

    public function byCategory($category)
    {
        $events = Event::where('category', $category)->paginate(15);
        return EventResource::collection($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:5120',
        ]);

        $validated['organizer_id'] = auth()->id();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Event::create($validated);

        return new EventResource($event);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $this->authorize('update', $event);

        $validated = $request->validate([
            'title' => 'string',
            'description' => 'string',
            'category' => 'string',
            'date' => 'date',
            'location' => 'string',
            'price' => 'numeric|min:0',
            'image' => 'nullable|image|max:5120',
        ]);

        $event->update($validated);

        return new EventResource($event);
    }

    public function delete($id)
    {
        $event = Event::findOrFail($id);

        $this->authorize('delete', $event);

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }
}
```

## Response Format Standard

Semua API response mengikuti format:

### Success Response (200)
```json
{
    "data": {
        "id": 1,
        "title": "Event Title",
        "description": "Event description",
        "category": "konser",
        "date": "2024-10-15",
        "location": "Jakarta",
        "price": 450000,
        "image": "events/image.jpg",
        "trending": true,
        "created_at": "2024-06-05T10:00:00.000000Z"
    },
    "message": null
}
```

### Error Response (400/401/500)
```json
{
    "message": "Error description",
    "errors": {
        "field_name": ["Error message"]
    }
}
```

## Testing API dengan Postman

### 1. Login untuk mendapatkan token
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password"
}

Response:
{
    "token": "abc123...",
    "user": { ... }
}
```

### 2. Gunakan token di header
```
Authorization: Bearer abc123...
```

### 3. Fetch Trending Events
```
GET /api/events/trending?limit=10
```

### 4. Search Events
```
GET /api/events/search?q=festival
```

### 5. Purchase Ticket
```
POST /api/events/1/tickets/purchase
Authorization: Bearer token
Content-Type: application/json

{
    "quantity": 2,
    "payment_method": "card"
}
```

## Environment Variables (.env)

```env
API_URL=http://localhost:8000/api
VITE_API_URL=/api
```

## Implementasi di React

Semua service sudah tersedia di `resources/js/services/api.js`

```jsx
import { eventService } from '../../services/api';

// Fetch events
const response = await eventService.getAllEvents({ 
    category: 'konser',
    search: 'festival'
});

// Get trending
const trending = await eventService.getTrendingEvents(10);

// Search
const results = await eventService.searchEvents('jazz');

// Purchase ticket
const purchase = await ticketService.purchase(eventId, {
    quantity: 2,
    payment_method: 'card'
});
```
