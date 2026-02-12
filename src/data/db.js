export const users = [
    {
        "id": 1,
        "firstName": "John",
        "lastName":'Doe',
        "email": "johndoe@gmail.com",
        "password": "password"
}, 
{
    "id": 2,
    "firstName": "Joshua",
    "lastName": "Ilelaboye",
    "email": "joshua1@gmail.com",
    "password": "joshua1"
}
]
export const movies = [
  {
    id: 1,
    title: "Behind The Scene",
    year: 2025,
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
  {
    id: 2,
    title: "SpiderMan",
    year: 2026,
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
   {
    id: 3,
    title: "Anikulapo",
    year: 2025,
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
   {
    id: 4,
    title: "365 days",
    year: 2025,
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
   {
    id: 5,
    title: "BEN 10",
    year: 2025,
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
];

export const watchlists = [
  {
    id: 1,
    userId: 1,
    movieId: 1,
    status: "watched",
    rating: 5,
    notes: "Amazing movie",
    addedAt: new Date()
  }
];