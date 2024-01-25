# ebook-price

### Run for development

```docker build -t ebook-price --target development .```

```docker-compose up -d```

```docker exec ebook-price-app-1 npx prisma generate```

```docker exec ebook-price-app-1 npx prisma db push```


### Run as build

```docker build -t ebook-price --target production .```

```docker-compose up -d```

```docker exec ebook-price-app-1 npx prisma generate```

```docker exec ebook-price-app-1 npx prisma db push```


### To check data in database:
```docker exec ebook-price-app-1 npx prisma studio```

### Endpoint example
```POST http://localhost:3000/ebook-price```
```
[{
    "name": "Agatha Christie",
    "title": "Murder on the Orient Express"
}]
```
