# Docker configuration for MindMate

## Building Docker Images

### Frontend Only
```bash
docker build -t mindmate-frontend .
docker run -p 3000:3000 mindmate-frontend
```

### Backend Only
```bash
cd server
docker build -t mindmate-backend .
docker run -p 5000:5000 -e MONGODB_URI=mongodb://... mindmate-backend
```

## Using Docker Compose (Recommended)

### Setup
1. Create `.env.docker` file with your credentials:
```env
MONGODB_URI=mongodb://admin:admin@mongodb:27017/mindmate?authSource=admin
JWT_SECRET=your-secret-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

2. Start all services:
```bash
docker-compose --env-file .env.docker up --build
```

3. Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Stopping Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend   # Backend logs
docker-compose logs -f frontend  # Frontend logs
docker-compose logs -f mongodb   # Database logs
```

### Cleanup
```bash
docker-compose down -v           # Remove containers and volumes
docker system prune -a           # Remove unused images
```

## Production Deployment

### Build Images for Production
```bash
# Frontend
docker build -t your-registry/mindmate-frontend:1.0.0 .
docker push your-registry/mindmate-frontend:1.0.0

# Backend
cd server
docker build -t your-registry/mindmate-backend:1.0.0 .
docker push your-registry/mindmate-backend:1.0.0
```

### Deploy with Docker Compose
```bash
docker-compose -f docker-compose.yml up -d
```

### Kubernetes (Optional)
See `k8s/` folder for Kubernetes manifests.

## Environment Variables for Docker

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- `VITE_SUPABASE_PROJECT_ID` - Supabase project ID

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 5000)
- `VITE_API_URL` - Frontend API URL
- `VITE_SUPABASE_*` - Supabase keys for AI chat

### MongoDB
- `MONGO_INITDB_ROOT_USERNAME` - Admin username
- `MONGO_INITDB_ROOT_PASSWORD` - Admin password
- `MONGO_INITDB_DATABASE` - Initial database name

## Health Checks

Add health checks to docker-compose.yml:

```yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s

mongodb:
  healthcheck:
    test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 40s
```

## Troubleshooting

### Port already in use
```bash
# Find what's using the port
lsof -i :3000          # Frontend
lsof -i :5000          # Backend
lsof -i :27017         # MongoDB

# Kill process
kill -9 <PID>
```

### MongoDB connection failed
```bash
# Check MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Frontend can't reach backend
- Check `VITE_API_URL` is correct
- Ensure backend service is running: `docker-compose ps`
- Check network: `docker-compose network ls`

### Out of memory/disk space
```bash
# Clean up Docker
docker system prune -a --volumes
docker builder prune
```
