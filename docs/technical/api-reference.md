# API Reference

This document describes the REST API endpoints available in the Tailspin Toys backend.

## Base URL

- **Development**: `http://localhost:5100`
- **Production**: TBD

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Response Format

All API responses follow a consistent JSON format:

**Success Response**:
```json
{
  "data": [...] // or {...}
}
```

**Error Response**:
```json
{
  "error": "Error message description"
}
```

## Status Codes

- `200 OK` - Request successful
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Endpoints

### Games

#### GET /api/games

Retrieve a list of all games.

**Response**:
```json
[
  {
    "id": 1,
    "title": "DevOps: The Board Game",
    "description": "Navigate through the complex world of software deployment...",
    "publisher": {
      "id": 1,
      "name": "Agile Games Inc."
    },
    "category": {
      "id": 1,
      "name": "Strategy"
    },
    "starRating": 4.5
  }
]
```

**Example**:
```bash
curl -X GET http://localhost:5100/api/games
```

#### GET /api/games/{id}

Retrieve details for a specific game.

**Parameters**:
- `id` (integer, path) - Game ID

**Response**:
```json
{
  "id": 1,
  "title": "DevOps: The Board Game",
  "description": "Navigate through the complex world of software deployment, continuous integration, and team collaboration. Build pipelines, manage infrastructure, and lead cross-functional teams to deliver high-quality software.",
  "publisher": {
    "id": 1,
    "name": "Agile Games Inc."
  },
  "category": {
    "id": 1,
    "name": "Strategy"
  },
  "starRating": 4.5
}
```

**Error Response** (404):
```json
{
  "error": "Game not found"
}
```

**Example**:
```bash
curl -X GET http://localhost:5100/api/games/1
```

## Data Models

### Game Model

```typescript
interface Game {
  id: number;                    // Unique identifier
  title: string;                 // Game title (2-100 characters)
  description: string;           // Game description (10+ characters)
  publisher: Publisher | null;   // Associated publisher
  category: Category | null;     // Game category
  starRating: number | null;     // Rating (0-5, or null if not rated)
}
```

### Publisher Model

```typescript
interface Publisher {
  id: number;      // Unique identifier
  name: string;    // Publisher name
}
```

### Category Model

```typescript
interface Category {
  id: number;      // Unique identifier
  name: string;    // Category name
}
```

## Database Schema

### Tables

#### games
- `id` (INTEGER, PRIMARY KEY)
- `title` (VARCHAR(100), NOT NULL)
- `description` (TEXT, NOT NULL)
- `star_rating` (FLOAT, NULLABLE)
- `category_id` (INTEGER, FOREIGN KEY → categories.id)
- `publisher_id` (INTEGER, FOREIGN KEY → publishers.id)

#### publishers
- `id` (INTEGER, PRIMARY KEY)
- `name` (VARCHAR(100), NOT NULL)

#### categories
- `id` (INTEGER, PRIMARY KEY)
- `name` (VARCHAR(100), NOT NULL)

### Relationships

- **Game → Publisher**: Many-to-One (many games can have the same publisher)
- **Game → Category**: Many-to-One (many games can be in the same category)

## API Usage Examples

### JavaScript (Frontend)

```javascript
// Fetch all games
async function fetchGames() {
  try {
    const response = await fetch('/api/games');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();
    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}

// Fetch specific game
async function fetchGame(id) {
  try {
    const response = await fetch(`/api/games/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Game not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const game = await response.json();
    return game;
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
}
```

### Python (Backend Testing)

```python
import requests

# Fetch all games
response = requests.get('http://localhost:5100/api/games')
if response.status_code == 200:
    games = response.json()
    print(f"Found {len(games)} games")
else:
    print(f"Error: {response.status_code}")

# Fetch specific game
game_id = 1
response = requests.get(f'http://localhost:5100/api/games/{game_id}')
if response.status_code == 200:
    game = response.json()
    print(f"Game: {game['title']}")
elif response.status_code == 404:
    print("Game not found")
else:
    print(f"Error: {response.status_code}")
```

### cURL Examples

```bash
# Get all games
curl -X GET \
  http://localhost:5100/api/games \
  -H "Accept: application/json"

# Get specific game
curl -X GET \
  http://localhost:5100/api/games/1 \
  -H "Accept: application/json"

# Test error handling
curl -X GET \
  http://localhost:5100/api/games/99999 \
  -H "Accept: application/json"
```

## Error Handling

### Client-Side Error Handling

```javascript
async function safeApiCall(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Handle different HTTP status codes
      switch (response.status) {
        case 404:
          throw new Error('Resource not found');
        case 500:
          throw new Error('Server error, please try again later');
        default:
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw new Error('Network error, please check your connection');
    }
    throw error; // Re-throw other errors
  }
}
```

## Performance Considerations

### Caching
- **Client-side**: Implement caching for game lists
- **Server-side**: Consider Redis caching for frequently accessed games

### Rate Limiting
- Currently no rate limiting implemented
- Consider adding rate limiting for production

### Pagination
- Currently returns all games in a single request
- Consider implementing pagination for large datasets:
  ```
  GET /api/games?page=1&limit=20
  ```

## Future API Enhancements

Planned endpoints:
- `POST /api/games` - Create new game (admin)
- `PUT /api/games/{id}` - Update game (admin)
- `DELETE /api/games/{id}` - Delete game (admin)
- `GET /api/categories` - List categories
- `GET /api/publishers` - List publishers
- `POST /api/games/{id}/rating` - Submit rating
- `GET /api/games/search?q={query}` - Search games

## Testing the API

### Unit Tests
Backend API is tested using Python's `unittest` framework:

```bash
# Run all API tests
./scripts/run-server-tests.sh

# Run specific test file
cd server
python -m pytest tests/test_games.py -v
```

### Integration Testing
Use tools like:
- **Postman** - Manual API testing
- **Thunder Client** (VS Code extension)
- **curl** - Command line testing
- **Playwright** - E2E testing (includes API calls)

### Test Data
Sample games are included in the development database for testing purposes.

## Security Notes

### Current Security Status
- No authentication/authorization
- No input validation beyond SQLAlchemy constraints
- No CORS configuration
- No HTTPS enforcement

### Production Recommendations
1. Implement authentication (JWT tokens)
2. Add input validation and sanitization
3. Configure CORS properly
4. Enable HTTPS
5. Add rate limiting
6. Implement SQL injection protection
7. Add request logging and monitoring