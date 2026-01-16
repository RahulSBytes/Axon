const { conversation } = {
  conversation: {
    conversation_id: "conv_abc123",
    user_id: "user_xyz789",
    title: "Planning a trip to Japan",
    created_at: "2024-05-20T10:15:00Z",
    updated_at: "2024-05-20T10:30:45Z",
    messages: [
      {
        message_id: "msg_001",
        role: "user",
        content: "What are the best places to visit in Tokyo?",
        model: "claude-3-sonnet-20240229",
        tokens: 12,
        created_at: "2024-05-20T10:15:05Z",
      },
      {
        message_id: "msg_002",
        role: "assistant",
        content:
          "Tokyo has many amazing places! Some top recommendations:\n\n1. **Shibuya Crossing** – The world's busiest pedestrian crossing.\n2. **Senso-ji Temple** – A historic Buddhist temple in Asakusa.\n3. **Shinjuku Gyoen** – A beautiful park perfect for cherry blossoms.\n4. **Akihabara** – For anime, electronics, and gaming.\n5. **Tsukiji Outer Market** – Great for fresh sushi and seafood.\n\nWould you like recommendations for specific interests (e.g., food, history, nightlife)?",
        tokens: 89,
        created_at: "2024-05-20T10:16:30Z",
        metadata: {
          feedback: "thumbs_up",
          latency_ms: 1200,
        },
      },
      {
        message_id: "msg_003",
        role: "user",
        content: "What about food? I love ramen and sushi.",
        tokens: 10,
        created_at: "2024-05-20T10:17:10Z",
      },
      {
        message_id: "msg_004",
        role: "assistant",
        content:
          "For **ramen**, you must try:\n- **Ichiran** (famous tonkotsu ramen chain)\n- **Afuri** (yuzu-shio ramen in Harajuku)\n- **Nakiryu** (Michelin-starred ramen in Otsuka)\n\nFor **sushi**, consider:\n- **Sushi Dai** (Tsukiji Market, long lines but worth it)\n- **Sukiyabashi Jiro** (3-Michelin-star, reservation needed)\n- **Uogashi Nihon-Ichi** (affordable standing sushi bar)\n\nWould you like help with reservations or a food itinerary?",
        tokens: 110,
        created_at: "2024-05-20T10:18:45Z",
      },
      {
        message_id: "msg_005",
        role: "user",
        content: "What about food? I love ramen and sushi.",
        tokens: 10,
        created_at: "2024-05-20T10:17:10Z",
      },
      {
        message_id: "msg_006",
        role: "assistant",
        content:
          "For **ramen**, you must try:\n- **Ichiran** (famous tonkotsu ramen chain)\n- **Afuri** (yuzu-shio ramen in Harajuku)\n- **Nakiryu** (Michelin-starred ramen in Otsuka)\n\nFor **sushi**, consider:\n- **Sushi Dai** (Tsukiji Market, long lines but worth it)\n- **Sukiyabashi Jiro** (3-Michelin-star, reservation needed)\n- **Uogashi Nihon-Ichi** (affordable standing sushi bar)\n\nWould you like help with reservations or a food itinerary?",
        tokens: 110,
        created_at: "2024-05-20T10:18:45Z",
      },
    ],
  },
};


const history = [
  { title: "Learning JavaScript Basics for Beginners", created_at: "2025-01-01" },
  { title: "Understanding MERN Stack Project Structure", created_at: "2025-01-02" },
  { title: "How React Components Work Internally", created_at: "2025-01-03" },
  { title: "Building REST APIs Using Express", created_at: "2025-01-04" },
  { title: "MongoDB Schema Design Best Practices", created_at: "2025-01-05" },
  { title: "Implementing Authentication Using Passport JS", created_at: "2025-01-06" },
  { title: "Tailwind CSS Utility Classes Explained", created_at: "2025-01-07" },
  { title: "Deploying MERN Applications on Cloud", created_at: "2025-01-08" },
  { title: "Handling Forms and Validation in React", created_at: "2025-01-09" },
  { title: "Optimizing Performance in Node Applications", created_at: "2025-01-10" },
  { title: "Implementing Authentication Using Passport JS", created_at: "2025-01-06" },
  { title: "Tailwind CSS Utility Classes Explained", created_at: "2025-01-07" },
  { title: "Deploying MERN Applications on Cloud", created_at: "2025-01-08" },
  { title: "Handling Forms and Validation in React", created_at: "2025-01-09" },
  { title: "Optimizing Performance in Node Applications", created_at: "2025-01-10" }
];


const Favorite = [
  {
    "message_id": "msg_001",
    "role": "user",
    "content": "What are the best ramen spots in Tokyo?",
    "tokens": 10,
    "created_at": "2024-05-20T10:15:05Z"
  },
  {
    "message_id": "msg_002",
    "role": "assistant",
    "parent_message_id": "msg_001",
    "is_favorite": true,
    "content": "For **ramen**, try Ichiran, Afuri, and Nakiryu. For **sushi**, Sushi Dai and Sukiyabashi Jiro are must-visits.",
    "tokens": 25,
    "created_at": "2024-05-20T10:16:30Z"
  },
  {
    "message_id": "msg_003",
    "role": "user",
    "content": "How can I travel efficiently around Tokyo?",
    "tokens": 12,
    "created_at": "2024-05-20T10:17:45Z"
  },
  {
    "message_id": "msg_004",
    "role": "assistant",
    "parent_message_id": "msg_003",
    "is_favorite": false,
    "content": "The subway and JR trains are the fastest. Consider getting a **Suica** or **Pasmo** card for convenience.",
    "tokens": 20,
    "created_at": "2024-05-20T10:18:45Z"
  },
  {
    "message_id": "msg_005",
    "role": "user",
    "content": "Any suggestions for day trips from Tokyo?",
    "tokens": 11,
    "created_at": "2024-05-20T10:19:50Z"
  },
  {
    "message_id": "msg_006",
    "role": "assistant",
    "parent_message_id": "msg_005",
    "is_favorite": true,
    "content": "Yes! **Nikko**, **Hakone**, and **Kamakura** are popular day-trip destinations accessible by train.",
    "tokens": 18,
    "created_at": "2024-05-20T10:21:05Z"
  },
  {
    "message_id": "msg_007",
    "role": "user",
    "content": "What's the typical cost for meals in Tokyo?",
    "tokens": 12,
    "created_at": "2024-05-20T10:22:10Z"
  },
  {
    "message_id": "msg_008",
    "role": "assistant",
    "parent_message_id": "msg_007",
    "is_favorite": false,
    "content": "Casual meals: 800–1500 JPY. Restaurants: 3000 JPY or more. Convenience store meals are cheaper options.",
    "tokens": 22,
    "created_at": "2024-05-20T10:23:20Z"
  },
  {
    "message_id": "msg_009",
    "role": "user",
    "content": "Can you recommend some traditional Japanese desserts?",
    "tokens": 13,
    "created_at": "2024-05-20T10:24:30Z"
  },
  {
    "message_id": "msg_010",
    "role": "assistant",
    "parent_message_id": "msg_009",
    "is_favorite": true,
    "content": "Try **mochi**, **dorayaki**, and **taiyaki**. Matcha-flavored sweets like **matcha ice cream** are also popular.",
    "tokens": 20,
    "created_at": "2024-05-20T10:25:45Z"
  }
]



export { conversation, history,Favorite };
